create table robot_sensor
(
    id                     int auto_increment
        primary key,
    id_robot               varchar(20)  not null comment '机器人标识，ROBOT_INFO对应id_robot',
    collection_datetime    datetime     not null comment '写一个NOW()作为数据的记录时间',
    collection_sf6         float        null comment '六氟化硫数据',
    collection_humidity    float        null comment '湿度数据',
    collection_temperature float        null comment '温度数据',
    collection_noise       float        null comment '噪音数据',
    collection_nh          float        null comment '氨气数据',
    collection_so2         float        null comment '二氧化硫数据',
    collection_imu         varchar(200) null comment '文件路径',
    collection_lidar_3d    varchar(200) null comment '文件路径 激光雷达传感器3D点云数据',
    collection_lidar_2d    varchar(200) null comment '文件路径 激光雷达传感器2D点云数据',
    collection_rgb         varchar(200) null comment '文件路径 相机RGB图像 数据',
    collection_thermal     varchar(200) null comment '文件路径 相机热红外图像 数据',
    collection_depth       varchar(200) null comment '文件路径 相机depth图像数据',
    constraint robot_sensor_robot_info_id_robot_fk
        foreign key (id_robot) references robot_info (id_robot)
);

