-- Joey's Luxury initial schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'admin');
create type public.order_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  slug text not null unique,
  name text not null,
  description text,
  category_id uuid references public.categories(id),
  brand_id uuid references public.brands(id),
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  sku text unique,
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  unique(product_id, size)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.wishlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, product_id)
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  check (user_id is not null or session_id is not null)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  order_number text not null unique,
  customer_name text not null,
  email text not null,
  phone text not null,
  delivery_address text not null,
  city text not null,
  state text not null,
  notes text,
  payment_method text not null,
  payment_reference text,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  total numeric(12,2) not null check (total >= 0),
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity int not null check (quantity > 0),
  size text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0)
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and lower(coalesce(auth.jwt() ->> 'email', '')) = 'josephelisha112233@gmail.com'
  );
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlists enable row level security;
alter table public.carts enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "profiles read own or admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'customer');
create policy "public read categories" on public.categories for select using (true);
create policy "public read brands" on public.brands for select using (true);
create policy "public read active products" on public.products for select using (is_active or public.is_admin());
create policy "admin manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "public read product images" on public.product_images for select using (true);
create policy "admin manage images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());
create policy "public read variants" on public.product_variants for select using (true);
create policy "admin manage variants" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());
create policy "public read approved reviews" on public.reviews for select using (is_approved or user_id = auth.uid() or public.is_admin());
create policy "customer create own review" on public.reviews for insert with check (user_id = auth.uid());
create policy "admin manage reviews" on public.reviews for all using (public.is_admin()) with check (public.is_admin());
create policy "users manage own wishlist" on public.wishlists for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users manage own carts" on public.carts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "customer read own orders" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "guest create order" on public.orders for insert with check (user_id is null or user_id = auth.uid());
create policy "admin update orders" on public.orders for update using (public.is_admin()) with check (public.is_admin());
create policy "customer read own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin()))
);
create policy "create order items for own or guest order" on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or o.user_id is null))
);
create policy "admin manage order items" on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "public submit contact messages" on public.contact_messages for insert with check (true);
create policy "admin read contact messages" on public.contact_messages for select using (public.is_admin());
create policy "public subscribe newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "admin read newsletter" on public.newsletter_subscribers for select using (public.is_admin());

-- Create a private-to-admin product-images bucket. Public read is needed for storefront images.
insert into storage.buckets(id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;
create policy "public view product images bucket" on storage.objects for select using (bucket_id = 'product-images');
create policy "admin upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
create policy "admin update product images" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
create policy "admin delete product images" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());
