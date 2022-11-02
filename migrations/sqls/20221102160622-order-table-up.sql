/* Replace with your SQL commands */
create table if not exists "order"(
    id serial primary key,
    status varchar(15),
    user_id bigint references users(id)
);