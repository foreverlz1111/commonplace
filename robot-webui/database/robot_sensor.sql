create table robot_sensor
(
    id_robot               varchar(20)  not null
        primary key,
    collection_datetime    datetime     not null,
    collection_sf6         float        null,
    collection_humidity    float        null,
    collection_temperature float        null,
    collection_noise       float        null,
    collection_nh          float        null,
    collection_co2         float        null,
    collection_imu         varchar(200) null,
    collection_lidar_3d    varchar(200) null,
    collection_lidar_2d    varchar(200) null,
    collection_rgb         varchar(200) null,
    collection_depth       varchar(200) null,
    constraint robot_sensor_robot_info_id_robot_fk
        foreign key (id_robot) references robot_info (id_robot)
);

