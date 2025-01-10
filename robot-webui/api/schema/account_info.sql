create table account_info
(
    id_account              varchar(50)       not null comment '登录名。无限制，中英文数字'
        primary key,
    pwd_account             varchar(200)      not null comment '登录密码。英文数字',
    type_account            varchar(2)        not null comment '用户类型，0管理员，1用户，2访客',
    available_satus_account tinyint default 1 null comment '是否可用。1可用，0停用。默认1',
    dept_account            varchar(50)       null comment '来自部门',
    position_account        varchar(100)      null comment '用户的工作地址',
    email_account           varchar(50)       null comment '用户邮箱',
    loginip_account         varchar(100)      null comment '最后登陆IP',
    logindate_account       datetime          null comment '最后登陆时间',
    createby_account        varchar(50)       null comment '创建者',
    createtime_account      datetime          null comment '创建时间',
    remark_account          varchar(400)      null comment '备注信息'
)
    charset = utf8mb3;

