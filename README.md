# Joey's Luxury — Full Storefront Starter

A premium Nigerian men's footwear e-commerce foundation built with Next.js App Router, TypeScript, Tailwind CSS and Supabase.

## Included
- Responsive luxury storefront and category browsing
- Original placeholder SVG product artwork and 24-product Supabase seed catalogue
- Product detail pages, size selection and local persistent cart
- Checkout form with guest checkout and payment choices
- Supabase email/password authentication
- Protected admin dashboard and SQL row-level security policies
- Paystack server-side initialization and callback verification hook
- Contact details, SEO metadata, sitemap-ready Next.js structure

## 1. Run locally
Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## 2. Configure Supabase
1. Create a project at https://supabase.com.
2. Copy the project URL, anon key and server-only service role key into `.env.local`. The service role key is required by the server order/contact routes and must never be exposed to the browser.
3. Open Supabase SQL Editor and run `supabase/migrations/0001_initial_schema.sql`.
4. Run `supabase/seed.sql`.
5. In Authentication > Providers, enable Email. Configure email templates and redirect URLs.
6. Create a user account using `josephelisha112233@gmail.com`.
7. Promote that user to admin in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where lower(email) = 'josephelisha112233@gmail.com');
```

The admin page checks both this exact email and the database role. Do not expose the Supabase service-role key in browser code.

## 3. Configure Paystack
1. Create a Paystack business account and obtain test API keys.
2. Add the public and secret test keys to `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to your local URL while testing.
4. Test successful, failed and abandoned transactions before switching to live keys.

Paystack is optional. Pay on delivery and bank transfer order capture can be used without it. Bank transfer details are intentionally not invented; configure and communicate verified business account details yourself.

## 4. Important production work before launch
- Replace placeholder product images with your own licensed product photography.
- Confirm product prices, actual inventory and EU size availability.
- Review delivery fees, delivery zones, returns policy and bank details.
- Add order notification emails/SMS and a proper guest order lookup.
- Add rate limiting and bot protection to public order/contact endpoints.
- Add a Paystack webhook endpoint with signature validation and reconcile payments server-side (the current callback verifies the transaction server-side).
- For production, derive item prices and stock exclusively from Supabase in the order API; do not trust browser-submitted prices.
- Consider a transactional database function for creating an order and its line items atomically.
- Add privacy policy, terms, refund and shipping policies suitable for your business.
- Run `npm run typecheck` and `npm run build`.

## 5. Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your final domain.
5. Add the production domain to Supabase Auth URL configuration.
6. Deploy and test sign-in, checkout, Paystack callback and admin access.

## Brand contact
Joey's Luxury · Jos, Plateau State, Nigeria  
08034784901 · josephelisha112233@gmail.com  
Prices displayed in Nigerian naira (₦).

## Scope note
This is a runnable commerce foundation, not a fully audited production commerce platform. Supabase and Paystack require your credentials and configuration. The catalogue shown in the UI includes four local demo products; the database seed contains 24 catalogue records. Connect product reads and image storage to Supabase before launch.
