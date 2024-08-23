create table robot_info
(
    id_robot              varchar(20)  not null
        primary key,
    id_account            varchar(50)  not null,
    owner_robot           varchar(20)  null,
    product_robot         varchar(20)  null,
    ship_robot            datetime     null,
    born_robot            datetime     null,
    equip_cpu_robot       varchar(20)  null,
    equip_gpu_robot       varchar(20)  null,
    equip_ram_robot       varchar(10)  null,
    equip_equipment_robot varchar(100) null,
    price_robot           float        null,
    remark_robot          varchar(400) null,
    constraint robot_info_account_info_id_account_fk
        foreign key (id_account) references account_info (id_account)
);

