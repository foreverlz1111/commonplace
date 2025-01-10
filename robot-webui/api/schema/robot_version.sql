create table robot_version
(
    id                        int auto_increment
        primary key,
    id_robot                  varchar(20) not null,
    collection_datetime       datetime    not null,
    version_navisboard        varchar(50) null comment 'NavisBoard版本',
    version_navisbrain        varchar(50) null comment 'NavisBrain版本',
    version_navisbridge       varchar(50) null comment 'NavisBridge版本',
    version_platform_type     varchar(50) null comment '移动平台类型',
    version_platform_software varchar(50) null comment '移动平台版本',
    version_platform_hardware varchar(50) null comment '移动平台硬件',
    version_lidar_type        varchar(50) null comment '激光雷达传感器类型',
    version_lidar_software    varchar(50) null comment '激光雷达传感器版本',
    version_lidar_hardware    varchar(50) null comment '激光雷达传感器硬件',
    version_inertia_type      varchar(50) null comment '惯性传感器型号',
    version_inertia_software  varchar(50) null comment '惯性传感器版本',
    version_inertia_hardware  varchar(50) null comment '惯性传感器硬件',
    version_vision_type       varchar(50) null comment '视觉传感器型号',
    version_vision_software   varchar(50) null comment '视觉传感器版本',
    version_vision_hardware   varchar(50) null comment '视觉传感器硬件',
    version_compute_type      varchar(50) null comment '核心计算单元型号',
    version_compute_software  varchar(50) null comment '核心计算单元版本',
    version_compute_hardware  varchar(50) null comment '核心计算单元硬件'
);

