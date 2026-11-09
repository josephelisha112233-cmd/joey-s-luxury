insert into public.categories(name, slug, description) values
('Formal Shoes','formal-shoes','Polished footwear for formal occasions.'),
('Casual Sneakers','casual-sneakers','Everyday sneakers with refined styling.'),
('Loafers','loafers','Easy sophistication for every day.')
on conflict (slug) do nothing;

insert into public.brands(name, slug) values ('Joey''s Selection','joeys-selection')
on conflict (slug) do nothing;

insert into public.products(sku, slug, name, description, category_id, brand_id, price, compare_at_price, is_active, is_featured)
select v.sku, v.slug, v.name, v.description, c.id, b.id, v.price, v.compare_at_price, true, v.featured
from (values
('JL-001','regent-leather-loafer','The Regent Leather Loafer','A classic leather loafer for a confident, polished finish.', 'Formal Shoes',89500::numeric,110000::numeric,true),
('JL-002','monaco-minimal-sneaker','The Monaco Minimal Sneaker','Clean lines and versatile everyday styling.', 'Casual Sneakers',78500::numeric,null,true),
('JL-003','oxford-heritage','The Oxford Heritage','A timeless formal silhouette for special occasions.', 'Formal Shoes',112000::numeric,null,true),
('JL-004','verona-suede-driver','The Verona Suede Driver','A relaxed driver with understated character.', 'Loafers',96500::numeric,120000::numeric,true),
('JL-005','kensington-cap-toe','The Kensington Cap Toe','A considered dress shoe with a classic profile.', 'Formal Shoes',108000::numeric,null,false),
('JL-006','milano-court-sneaker','The Milano Court Sneaker','A clean court-inspired sneaker for daily wear.', 'Casual Sneakers',82500::numeric,null,false),
('JL-007','savile-tassel-loafer','The Savile Tassel Loafer','A refined tassel detail and timeless proportions.', 'Loafers',99000::numeric,null,false),
('JL-008','heritage-derby','The Heritage Derby','Versatile formal footwear with a confident finish.', 'Formal Shoes',105000::numeric,null,false),
('JL-009','porto-low-top','The Porto Low-Top','A minimalist low-top for easy everyday outfits.', 'Casual Sneakers',75500::numeric,null,false),
('JL-010','monarch-penny-loafer','The Monarch Penny Loafer','An enduring wardrobe staple with modern ease.', 'Loafers',92500::numeric,null,false),
('JL-011','ellington-brogue','The Ellington Brogue','Traditional detailing for a distinguished look.', 'Formal Shoes',118000::numeric,null,false),
('JL-012','avenue-knit-sneaker','The Avenue Knit Sneaker','A light, contemporary style for relaxed days.', 'Casual Sneakers',81500::numeric,null,false),
('JL-013','cannes-driving-loafer','The Cannes Driving Loafer','Comfort-led style with a smart-casual attitude.', 'Loafers',94500::numeric,null,false),
('JL-014','prescott-wholecut','The Prescott Wholecut','A sleek formal design with a streamlined upper.', 'Formal Shoes',125000::numeric,null,false),
('JL-015','district-retro-sneaker','The District Retro Sneaker','A vintage-inspired profile for modern wardrobes.', 'Casual Sneakers',86500::numeric,null,false),
('JL-016','hampton-bit-loafer','The Hampton Bit Loafer','A smart finishing touch for tailored looks.', 'Loafers',102000::numeric,null,false),
('JL-017','kensai-double-monk','The Kensai Double Monk','A distinctive buckle fastening and elegant shape.', 'Formal Shoes',119000::numeric,null,false),
('JL-018','courtline-leather','The Courtline Leather Sneaker','An elevated leather sneaker with clean styling.', 'Casual Sneakers',89000::numeric,null,false),
('JL-019','riviera-suede-loafer','The Riviera Suede Loafer','Soft texture and effortless weekend refinement.', 'Loafers',97500::numeric,null,false),
('JL-020','westminster-lace-up','The Westminster Lace-Up','A versatile lace-up designed for smart dressing.', 'Formal Shoes',109000::numeric,null,false),
('JL-021','urban-essential','The Urban Essential Sneaker','A dependable everyday pair with a pared-back look.', 'Casual Sneakers',73500::numeric,null,false),
('JL-022','monte-carlo-loafer','The Monte Carlo Loafer','An easy slip-on with a refined silhouette.', 'Loafers',93500::numeric,null,false),
('JL-023','regency-wingtip','The Regency Wingtip','Classic wingtip inspiration for dress occasions.', 'Formal Shoes',121000::numeric,null,false),
('JL-024','atelier-canvas-sneaker','The Atelier Canvas Sneaker','A relaxed canvas style for off-duty days.', 'Casual Sneakers',68500::numeric,null,false)
) as v(sku,slug,name,description,category,price,compare_at_price,featured)
join public.categories c on c.name = v.category
cross join public.brands b
where b.slug = 'joeys-selection'
on conflict (slug) do nothing;

insert into public.product_variants(product_id, size, sku, stock_quantity)
select p.id, s.size, p.sku || '-' || s.size, 5
from public.products p
cross join (values ('39'),('40'),('41'),('42'),('43'),('44'),('45'),('46')) as s(size)
where p.sku like 'JL-%'
on conflict (product_id, size) do nothing;
