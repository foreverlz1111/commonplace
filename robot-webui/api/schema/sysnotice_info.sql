create table sysnotice_info
(
    id_sysnotice         int auto_increment comment '系统通知编号'
        primary key,
    title_sysnotice      varchar(50)  not null comment '系统通知标题',
    content_sysnotice    varchar(500) not null comment '系统通知内容',
    createby_sysnotice   varchar(50)  not null comment '系统通知创建者，ACCOUNT_INFO的id_account外键',
    createdate_sysnotice datetime     not null comment '系统通知时间',
    status_sysnotice     tinyint      null comment '通知可用性。1可用，0关闭。默认1',
    updateby_sysnotice   varchar(50)  null comment '系统通知更新者，ACCOUNT_INFO的id_account',
    updatetime_sysnotice datetime     null comment '系统通知更新时间',
    remark_sysnotice     varchar(400) null comment '备注信息',
    constraint sysnotice_info_account_info_id_account_fk
        foreign key (createby_sysnotice) references account_info (id_account)
);

