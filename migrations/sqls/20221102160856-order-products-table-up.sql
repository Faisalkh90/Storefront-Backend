/* Replace with your SQL commands */
create table if not exists order_products(
    id serial primary key,
    quantity integer,
    order_id bigint references "order"(id),
    product_id bigint references product(id)
);