create table robot_current
(
    id_robot                       varchar(20)  not null
        primary key,
    collection_datetime            datetime     not null,
    connection_success_info        tinyint      null,
    connection_code                varchar(5)   null,
    connection_msg                 varchar(20)  null,
    version_navisboard             varchar(50)  null,
    version_navisbrain             varchar(50)  null,
    version_navisbridge            varchar(50)  null,
    version_platform_type          varchar(50)  null,
    version_platform_software      varchar(50)  null,
    version_platform_hardware      varchar(50)  null,
    version_lidar_type             varchar(50)  null,
    version_lidar_software         varchar(50)  null,
    version_lidar_hardware         varchar(50)  null,
    version_inertia_type           varchar(50)  null,
    version_inertia_software       varchar(50)  null,
    version_inertia_hardware       varchar(50)  null,
    version_vision_type            varchar(50)  null,
    version_vision_software        varchar(50)  null,
    version_vision_hardware        varchar(50)  null,
    version_compute_type           varchar(50)  null,
    version_compute_software       varchar(50)  null,
    version_compute_hardware       varchar(50)  null,
    status_navigating              varchar(10)  null,
    status_navigatingmap           varchar(100) null,
    status_navigatingtask          varchar(100) null,
    status_2dmapping               varchar(10)  null,
    status_2dmap                   varchar(100) null,
    status_3dmapping               varchar(10)  null,
    status_3dmap                   varchar(100) null,
    status_recording               varchar(10)  null,
    status_recordmap               varchar(100) null,
    status_velocity_linear         float        null,
    status_velocity_angular        float        null,
    status_base                    varchar(20)  null,
    status_faultcode               varchar(20)  null,
    status_controlmode             varchar(20)  null,
    status_battery_cur             float        null,
    status_battery_temp            float        null,
    status_battery_health          tinyint      null,
    status_battery_power           tinyint      null,
    status_battery_vol             float        null,
    status_battery_chargehour      float        null,
    status_battery_ischarging      tinyint      null,
    status_battery_chargetime      int          null,
    status_battery_last_chargehour float        null,
    status_sensor_isopen           tinyint      null,
    status_disk_space              varchar(20)  null
);
