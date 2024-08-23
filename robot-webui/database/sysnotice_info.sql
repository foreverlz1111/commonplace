create table sysnotice_info
(
    id_sysnotice         int auto_increment
        primary key,
    title_sysnotice      varchar(50)  not null,
    content_sysnotice    varchar(500) not null,
    createby_sysnotice   varchar(50)  not null,
    createdate_sysnotice datetime     not null,
    status_sysnotice     tinyint      null,
    updateby_sysnotice   varchar(50)  null,
    updatetime_sysnotice datetime     null,
    remark_sysnotice     varchar(400) null,
    constraint sysnotice_info_account_info_id_account_fk
        foreign key (createby_sysnotice) references account_info (id_account)
);

