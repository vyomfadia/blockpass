create table if not exists tickets (
    buyer_address text not null,
    token_id text not null,

    primary key (buyer_address, token_id)
);
