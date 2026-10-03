CREATE TABLE "public"."ecommerce_order_items" (
    "order_item_id" VARCHAR(12) NOT NULL,
    "order_id" VARCHAR(12),
    "order_date" DATE,
    "customer_id" VARCHAR(12),
    "product_sku" VARCHAR(15),
    "product_name" VARCHAR(60),
    "category" VARCHAR(30),
    "quantity" INTEGER,
    "unit_price" NUMERIC(10,2),
    "discount_pct" INTEGER,
    "net_item_total" NUMERIC(10,2),
    "payment_method" VARCHAR(20),
    "order_status" VARCHAR(15),
    "ship_country" VARCHAR(30),
    "channel" VARCHAR(20),
    PRIMARY KEY ("order_item_id")
);