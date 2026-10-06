-- ========================================================
-- Database Schema: Food & Restaurant Ordering (Universal DDL/DML)
-- Safe: No DROP TABLE, No DO blocks, No standalone SELECTs
-- ========================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    item_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_menu_category 
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    delivery_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(20) DEFAULT 'pending' 
        CHECK (order_status IN ('pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
    total_amount NUMERIC(10, 2) DEFAULT 0.00 CHECK (total_amount >= 0),
    delivery_notes VARCHAR(255),
    CONSTRAINT fk_orders_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    CONSTRAINT fk_orderitems_order 
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_orderitems_item 
        FOREIGN KEY (item_id) REFERENCES menu_items(item_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 6. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ========================================================
-- Seed Data (Pure INSERTs, auto-increment sequences preserved)
-- ========================================================

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Appetizers', 'Small bites and starters to begin your meal'),
('Main Courses', 'Hearty and flavorful entrees'),
('Desserts', 'Sweet treats and baked delicacies'),
('Beverages', 'Refreshing hot and cold drinks')
ON CONFLICT (name) DO NOTHING;

-- Insert Menu Items
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_available) VALUES
(1, 'Truffle Fries', 'Crispy russet fries tossed in black truffle oil and parmesan', 7.50, TRUE, TRUE),
(1, 'Crispy Calamari', 'Tender squid rings served with garlic aioli and lemon wedges', 9.99, FALSE, TRUE),
(2, 'Margherita Pizza', 'San Marzano tomato base, fresh buffalo mozzarella, and basil', 14.50, TRUE, TRUE),
(2, 'Grilled Ribeye Steak', '10oz prime ribeye served with roasted baby potatoes and chimichurri', 28.00, FALSE, TRUE),
(2, 'Creamy Mushroom Risotto', 'Arborio rice cooked with wild forest mushrooms and parmesan broth', 16.50, TRUE, TRUE),
(3, 'Classic Tiramisu', 'Espresso-soaked ladyfingers with mascarpone cream and cocoa powder', 8.00, TRUE, TRUE),
(3, 'Lava Cake', 'Warm molten chocolate cake with vanilla bean gelato', 8.50, TRUE, TRUE),
(4, 'Iced Matcha Latte', 'Ceremonial grade matcha whisked with oat milk', 5.50, TRUE, TRUE),
(4, 'Sparkling Berry Lemonade', 'Freshly squeezed lemons, mint, and blackberry puree', 4.50, TRUE, TRUE);

-- Insert Customers
INSERT INTO customers (first_name, last_name, email, phone, delivery_address) VALUES
('Kasun', 'Perera', 'kasun.perera@example.com', '0771234567', '45 Galle Road, Colombo 03'),
('Dilani', 'Silva', 'dilani.silva@example.com', '0719876543', '12 Kandy Road, Kelaniya'),
('Nuwan', 'Fernando', 'nuwan.f@example.com', '0755551234', '88 Main Street, Negombo')
ON CONFLICT (email) DO NOTHING;

-- Insert Orders
INSERT INTO orders (customer_id, order_status, total_amount, delivery_notes) VALUES
(1, 'delivered', 22.00, 'Leave at security gate'),
(2, 'preparing', 36.50, 'Call before arriving'),
(3, 'out_for_delivery', 13.00, 'Ring the doorbell');

-- Insert Order Items
INSERT INTO order_items (order_id, item_id, quantity, unit_price) VALUES
(1, 1, 1, 7.50),
(1, 3, 1, 14.50),
(2, 4, 1, 28.00),
(2, 7, 1, 8.50),
(3, 8, 1, 5.50),
(3, 1, 1, 7.50);