-- Useful queries for SoleMate E-commerce Database

-- Get all products with their primary image, brand, and category
SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.original_price, 
    b.name AS brand_name, 
    c.name AS category_name, 
    pi.image_url
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
JOIN 
    categories c ON p.category_id = c.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
ORDER BY 
    p.created_at DESC;

-- Get featured products with images
SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.original_price, 
    b.name AS brand_name, 
    pi.image_url
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE 
    p.is_featured = TRUE
ORDER BY 
    p.created_at DESC;

-- Get product details with all images and variants
SELECT 
    p.id, 
    p.name, 
    p.description, 
    p.price, 
    p.original_price, 
    b.name AS brand_name, 
    c.name AS category_name,
    p.rating,
    p.review_count,
    p.is_new,
    p.is_best_seller
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
JOIN 
    categories c ON p.category_id = c.id
WHERE 
    p.id = 1;  -- Replace with actual product ID

-- Get all images for a specific product
SELECT 
    id, 
    image_url, 
    alt_text, 
    is_primary, 
    display_order
FROM 
    product_images
WHERE 
    product_id = 1  -- Replace with actual product ID
ORDER BY 
    display_order;

-- Get all variants for a specific product
SELECT 
    id, 
    color, 
    size, 
    stock_quantity
FROM 
    product_variants
WHERE 
    product_id = 1  -- Replace with actual product ID
ORDER BY 
    color, size;

-- Get all reviews for a specific product
SELECT 
    r.id, 
    r.rating, 
    r.title, 
    r.content, 
    r.created_at,
    u.first_name,
    u.last_name
FROM 
    reviews r
JOIN 
    users u ON r.user_id = u.id
WHERE 
    r.product_id = 1  -- Replace with actual product ID
    AND r.is_approved = TRUE
ORDER BY 
    r.created_at DESC;

-- Get user's order history
SELECT 
    o.id, 
    o.order_number, 
    o.status, 
    o.total, 
    o.created_at,
    COUNT(oi.id) AS item_count
FROM 
    orders o
JOIN 
    order_items oi ON o.id = oi.order_id
WHERE 
    o.user_id = 2  -- Replace with actual user ID
GROUP BY 
    o.id, o.order_number, o.status, o.total, o.created_at
ORDER BY 
    o.created_at DESC;

-- Get order details with items
SELECT 
    oi.id,
    p.name AS product_name,
    pv.color,
    pv.size,
    oi.quantity,
    oi.price,
    oi.total,
    pi.image_url
FROM 
    order_items oi
JOIN 
    products p ON oi.product_id = p.id
LEFT JOIN 
    product_variants pv ON oi.variant_id = pv.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE 
    oi.order_id = 1;  -- Replace with actual order ID

-- Search products by name, brand, or category
SELECT 
    p.id, 
    p.name, 
    p.price, 
    b.name AS brand_name, 
    c.name AS category_name, 
    pi.image_url
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
JOIN 
    categories c ON p.category_id = c.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE 
    p.name ILIKE '%search_term%'  -- Replace with actual search term
    OR b.name ILIKE '%search_term%'
    OR c.name ILIKE '%search_term%'
ORDER BY 
    p.name;

-- Get products by category
SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.original_price, 
    b.name AS brand_name, 
    pi.image_url
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
JOIN 
    categories c ON p.category_id = c.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE 
    c.slug = 'athletic'  -- Replace with actual category slug
ORDER BY 
    p.created_at DESC;

-- Get products on sale
SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.original_price, 
    b.name AS brand_name, 
    pi.image_url,
    (p.original_price - p.price) AS savings,
    ROUND((p.original_price - p.price) / p.original_price * 100) AS discount_percentage
FROM 
    products p
JOIN 
    brands b ON p.brand_id = b.id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE 
    p.is_on_sale = TRUE
    AND p.original_price > p.price
ORDER BY 
    discount_percentage DESC;

