create table orders (
    id serial primary key,
    quantity integer not null,
    status varchar(70) not null,
    user_id bigint references users(id),
    product_id bigint references product(id)
);