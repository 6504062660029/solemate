-- Sample data for SoleMate E-commerce Database

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Athletic', 'athletic', 'Performance shoes for every sport', '/images/categories/athletic.jpg'),
('Casual', 'casual', 'Everyday comfort and style', '/images/categories/casual.jpg'),
('Formal', 'formal', 'Elegant shoes for special occasions', '/images/categories/formal.jpg'),
('Outdoor', 'outdoor', 'Durable shoes for outdoor adventures', '/images/categories/outdoor.jpg'),
('Sandals', 'sandals', 'Comfortable open footwear for warm weather', '/images/categories/sandals.jpg');

-- Insert Brands
INSERT INTO brands (name, slug, logo_url) VALUES
('Nike', 'nike', '/images/brands/nike.png'),
('Adidas', 'adidas', '/images/brands/adidas.png'),
('Cole Haan', 'cole-haan', '/images/brands/cole-haan.png'),
('Converse', 'converse', '/images/brands/converse.png'),
('Vans', 'vans', '/images/brands/vans.png'),
('New Balance', 'new-balance', '/images/brands/new-balance.png'),
('Reebok', 'reebok', '/images/brands/reebok.png');

-- Insert Products
INSERT INTO products (name, slug, sku, brand_id, category_id, description, price, original_price, is_featured, is_new, is_best_seller, is_on_sale, rating, review_count, stock_quantity) VALUES
('Air Max Pulse', 'air-max-pulse', 'NIKE-AM-001', 1, 1, 'The Nike Air Max Pulse draws inspiration from the London music scene, bringing an underground touch to the iconic Air Max line.', 149.99, 169.99, TRUE, TRUE, TRUE, TRUE, 4.8, 124, 50),
('Ultraboost Light', 'ultraboost-light', 'ADI-UB-001', 2, 1, 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.', 189.99, 189.99, TRUE, TRUE, FALSE, FALSE, 4.9, 86, 35),
('Classic Leather Loafer', 'classic-leather-loafer', 'CH-CLL-001', 3, 3, 'Timeless leather loafers that combine comfort with sophisticated style.', 129.99, 159.99, TRUE, FALSE, TRUE, TRUE, 4.7, 52, 20),
('Chuck Taylor All Star', 'chuck-taylor-all-star', 'CON-CT-001', 4, 2, 'The iconic Chuck Taylor All Star is the classic sneaker that started it all.', 59.99, 59.99, TRUE, FALSE, TRUE, FALSE, 4.6, 215, 100),
('Terrex Free Hiker', 'terrex-free-hiker', 'ADI-TFH-001', 2, 4, 'Designed for those who seek adventure and exploration in the great outdoors.', 199.99, 229.99, FALSE, TRUE, FALSE, TRUE, 4.8, 67, 15),
('Old Skool', 'old-skool', 'VANS-OS-001', 5, 2, 'The Vans Old Skool is a classic skate shoe and the first to feature the iconic Vans side stripe.', 69.99, 69.99, FALSE, FALSE, TRUE, FALSE, 4.7, 183, 75),
('Fresh Foam X 1080v12', 'fresh-foam-x-1080v12', 'NB-FF-001', 6, 1, 'Experience premium comfort with the Fresh Foam X 1080v12 running shoe.', 159.99, 159.99, FALSE, TRUE, FALSE, FALSE, 4.8, 94, 30),
('Nano X3', 'nano-x3', 'RBK-NX-001', 7, 1, 'The ultimate training shoe designed for stability and performance during workouts.', 139.99, 139.99, FALSE, FALSE, FALSE, FALSE, 4.6, 78, 25);

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
(1, '/images/products/air-max-pulse-1.jpg', 'Nike Air Max Pulse - Black/White', TRUE, 1),
(1, '/images/products/air-max-pulse-2.jpg', 'Nike Air Max Pulse - Side View', FALSE, 2),
(1, '/images/products/air-max-pulse-3.jpg', 'Nike Air Max Pulse - Back View', FALSE, 3),
(1, '/images/products/air-max-pulse-4.jpg', 'Nike Air Max Pulse - Top View', FALSE, 4),
(2, '/images/products/ultraboost-light-1.jpg', 'Adidas Ultraboost Light - White/Black', TRUE, 1),
(2, '/images/products/ultraboost-light-2.jpg', 'Adidas Ultraboost Light - Side View', FALSE, 2),
(3, '/images/products/leather-loafer-1.jpg', 'Cole Haan Classic Leather Loafer - Brown', TRUE, 1),
(3, '/images/products/leather-loafer-2.jpg', 'Cole Haan Classic Leather Loafer - Side View', FALSE, 2),
(4, '/images/products/chuck-taylor-1.jpg', 'Converse Chuck Taylor All Star - Black', TRUE, 1),
(4, '/images/products/chuck-taylor-2.jpg', 'Converse Chuck Taylor All Star - Side View', FALSE, 2),
(5, '/images/products/terrex-hiker-1.jpg', 'Adidas Terrex Free Hiker - Grey/Black', TRUE, 1),
(6, '/images/products/old-skool-1.jpg', 'Vans Old Skool - Black/White', TRUE, 1),
(7, '/images/products/fresh-foam-1.jpg', 'New Balance Fresh Foam X 1080v12 - Blue/Orange', TRUE, 1),
(8, '/images/products/nano-x3-1.jpg', 'Reebok Nano X3 - Black/White', TRUE, 1);

-- Insert Product Variants
INSERT INTO product_variants (product_id, sku, color, size, stock_quantity) VALUES
(1, 'NIKE-AM-001-BW-7', 'Black/White', '7', 5),
(1, 'NIKE-AM-001-BW-8', 'Black/White', '8', 8),
(1, 'NIKE-AM-001-BW-9', 'Black/White', '9', 10),
(1, 'NIKE-AM-001-BW-10', 'Black/White', '10', 7),
(1, 'NIKE-AM-001-BG-7', 'Blue/Grey', '7', 3),
(1, 'NIKE-AM-001-BG-8', 'Blue/Grey', '8', 6),
(1, 'NIKE-AM-001-BG-9', 'Blue/Grey', '9', 4),
(1, 'NIKE-AM-001-RB-8', 'Red/Black', '8', 5),
(1, 'NIKE-AM-001-RB-9', 'Red/Black', '9', 2),
(2, 'ADI-UB-001-WB-8', 'White/Black', '8', 7),
(2, 'ADI-UB-001-WB-9', 'White/Black', '9', 9),
(2, 'ADI-UB-001-WB-10', 'White/Black', '10', 6),
(3, 'CH-CLL-001-BRN-9', 'Brown', '9', 4),
(3, 'CH-CLL-001-BRN-10', 'Brown', '10', 5),
(3, 'CH-CLL-001-BLK-9', 'Black', '9', 6),
(3, 'CH-CLL-001-BLK-10', 'Black', '10', 5);

-- Insert Sample Users
INSERT INTO users (email, password_hash, first_name, last_name, phone, is_admin) VALUES
('admin@solemate.com', '$2a$12$1234567890123456789012uQSdC1YHBgQHxJ3CMXbDEMpE5ueGOiO', 'Admin', 'User', '555-123-4567', TRUE),
('john.doe@example.com', '$2a$12$1234567890123456789012uQSdC1YHBgQHxJ3CMXbDEMpE5ueGOiO', 'John', 'Doe', '555-987-6543', FALSE),
('jane.smith@example.com', '$2a$12$1234567890123456789012uQSdC1YHBgQHxJ3CMXbDEMpE5ueGOiO', 'Jane', 'Smith', '555-456-7890', FALSE);

-- Insert Sample Addresses
INSERT INTO addresses (user_id, address_type, is_default, first_name, last_name, address_line1, city, state, postal_code, country, phone) VALUES
(2, 'shipping', TRUE, 'John', 'Doe', '123 Main St', 'Anytown', 'CA', '12345', 'USA', '555-987-6543'),
(2, 'billing', TRUE, 'John', 'Doe', '123 Main St', 'Anytown', 'CA', '12345', 'USA', '555-987-6543'),
(3, 'shipping', TRUE, 'Jane', 'Smith', '456 Oak Ave', 'Somewhere', 'NY', '67890', 'USA', '555-456-7890'),
(3, 'billing', TRUE, 'Jane', 'Smith', '456 Oak Ave', 'Somewhere', 'NY', '67890', 'USA', '555-456-7890');

-- Insert Sample Orders
INSERT INTO orders (user_id, order_number, status, subtotal, tax, shipping_cost, total, shipping_address_id, billing_address_id, payment_method, payment_status) VALUES
(2, 'SM-10001', 'delivered', 149.99, 12.00, 0.00, 161.99, 1, 2, 'credit_card', 'paid'),
(3, 'SM-10002', 'processing', 259.98, 20.80, 0.00, 280.78, 3, 4, 'paypal', 'paid');

-- Insert Sample Order Items
INSERT INTO order_items (order_id, product_id, variant_id, quantity, price, total) VALUES
(1, 1, 3, 1, 149.99, 149.99),
(2, 2, 10, 1, 189.99, 189.99),
(2, 4, NULL, 1, 69.99, 69.99);

-- Insert Sample Reviews
INSERT INTO reviews (product_id, user_id, rating, title, content, is_verified_purchase, is_approved) VALUES
(1, 2, 5, 'Amazing comfort!', 'These are the most comfortable shoes I have ever worn. Highly recommended!', TRUE, TRUE),
(1, 3, 4, 'Great shoes but run small', 'I love these shoes but had to exchange for a larger size. Order a half size up.', TRUE, TRUE),
(2, 3, 5, 'Perfect for running', 'These have become my go-to running shoes. Great support and very lightweight.', TRUE, TRUE);

-- Insert Sample Newsletter Subscribers
INSERT INTO newsletter_subscribers (email) VALUES
('john.doe@example.com'),
('jane.smith@example.com'),
('newsletter.fan@example.com');

