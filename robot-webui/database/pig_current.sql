create table pig_current
(
    id_pig                 varchar(50)  not null
        primary key,
    id_robot               varchar(20)  not null,
    collection_datetime    datetime     not null,
    collection_img_rgb     varchar(200) null,
    collection_img_thermal varchar(200) null,
    collection_temperature float        null,
    collection_img_rgbd    varchar(200) null
);
