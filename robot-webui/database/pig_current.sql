create table pig_current
(
    id                     int auto_increment
        primary key,
    id_pig                 varchar(50)  not null comment '机器人识别到的生猪标识',
    id_robot               varchar(20)  not null comment '机器人标识，ROBOT_INFO的id_robot外键',
    collection_datetime    datetime     not null comment '写一个NOW()作为数据的记录时间',
    collection_img_rgb     varchar(200) null comment '文件路径 拍摄的生猪的可见光图像',
    collection_img_thermal varchar(200) null comment '文件路径 拍摄的生猪的热红外图像',
    collection_temperature float        null comment '生猪的面部温度，取最高值',
    collection_img_rgbd    varchar(200) null comment '文件路径 拍摄的生猪的深度图像',
    collection_img_camera  varchar(200) null comment '文件路径或数据 拍摄的相机实时画面',
    constraint pig_current_robot_info_id_robot_fk
        foreign key (id_robot) references robot_info (id_robot)
)
    charset = utf8mb3;

