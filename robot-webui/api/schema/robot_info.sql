create table robot_info
(
    id_robot              varchar(20)  not null comment '机器人标识'
        primary key,
    id_account            varchar(50)  not null comment '机器人归属账号',
    owner_robot           varchar(20)  null comment '机器人归属',
    product_robot         varchar(20)  null comment '生产方',
    ship_robot            datetime     null comment '订购日期',
    born_robot            datetime     null comment '交付日期',
    equip_cpu_robot       varchar(20)  null comment '机器人配置cpu',
    equip_gpu_robot       varchar(20)  null comment '机器人配置gpu',
    equip_ram_robot       varchar(10)  null comment '机器人配置ram',
    equip_equipment_robot varchar(100) null comment '机器人外部配置',
    price_robot           float        null comment '机器人定价',
    remark_robot          varchar(400) null comment '备注信息',
    constraint robot_info_account_info_id_account_fk
        foreign key (id_account) references account_info (id_account)
)
    charset = utf8mb3;

