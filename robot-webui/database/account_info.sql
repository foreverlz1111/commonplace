create table account_info
(
    id_account              varchar(50)  not null
        primary key,
    pwd_account             varchar(50)  not null,
    type_account            varchar(2)   not null,
    available_satus_account tinyint      not null,
    dept_account            varchar(50)  null,
    position_account        varchar(100) null,
    email_account           varchar(50)  null,
    loginip_account         varchar(100) null,
    logindate_account       datetime     null,
    createby_account        varchar(50)  null,
    createtime_account      datetime     null,
    remark_account          varchar(400) null
);

