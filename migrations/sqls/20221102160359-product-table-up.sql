/* Replace with your SQL commands */
create table if not exists product (
    id serial primary key,
    name varchar(255) not null,
    price integer not null
);