create table robot_status
(
    id                             int auto_increment
        primary key,
    id_robot                       varchar(20)  not null comment '机器人标识，ROBOT_INFO的id_robot外键',
    collection_datetime            datetime     not null comment '数据库里传一个NOW()进去',
    connection_success_info        tinyint      null comment '返回的是“成功”或“失败”的布尔类型。(成功和失败的存入为1和0)',
    connection_code                varchar(5)   null comment '连接代码',
    connection_msg                 varchar(20)  null comment '正常消息：成功。如果connection_success_info是false，这里填连接失败。以下列的内容全部留空直接写入',
    status_navigating              varchar(10)  null comment '导航状态',
    status_navigatingmap           varchar(100) null comment '导航的地图信息',
    status_navigatingtask          varchar(100) null comment '导航的任务信息',
    status_2dmapping               varchar(10)  null comment '2d建图状态',
    status_2dmap                   varchar(100) null comment '2d建图的地图信息',
    status_3dmapping               varchar(10)  null comment '3d建图状态',
    status_3dmap                   varchar(100) null comment '3d建图的地图信息',
    status_recording               varchar(10)  null comment '录制的状态',
    status_recordmap               varchar(100) null comment '录制的地图信息',
    status_velocity_linear         float        null comment '线速度',
    status_velocity_angular        float        null comment '角速度',
    status_base                    varchar(20)  null comment '底盘状态',
    status_faultcode               varchar(20)  null comment '底盘错误代码',
    status_controlmode             varchar(20)  null comment '底盘控制模式',
    status_battery_cur             float        null comment '电池电流',
    status_battery_temp            float        null comment '电池温度',
    status_battery_health          tinyint      null comment '电池健康',
    status_battery_power           tinyint      null comment '电池电量',
    status_battery_vol             float        null comment '电池电压',
    status_battery_chargehour      float        null comment '电池累计充电小时数',
    status_battery_ischarging      tinyint      null comment '电池是否正在充电 (1充电 0未充电)',
    status_battery_chargetime      int          null comment '电池充电次数',
    status_battery_last_chargehour float        null comment '电池最近一次的充电小时数',
    status_sensor_isopen           tinyint      null comment '设备传感器状态',
    status_disk_space              varchar(20)  null comment '机器人底盘的磁盘空间',
    constraint robot_status_robot_info_id_robot_fk
        foreign key (id_robot) references robot_info (id_robot)
)
    charset = utf8mb3;

create index robot_current_robot_info_id_robot_fk
    on robot_status (id_robot);

