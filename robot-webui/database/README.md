### 数据库表

* 表 ROBOT_CURRENT

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_robot | 机器人标识，ROBOT_INFO的id_robot外键|**VARCHAR(20)** <br> not null <br> primary|
|collection_datetime | 数据库里传一个NOW()进去 |**DATETIME** <br> not null|
|connection_success_info | 返回的是“成功”或“失败”的布尔类型。(成功和失败的存入为1和0)|**TINYINT** <br> null|
|connection_code |连接代码|**VARCHAR(5)**<br> null|
|connection_msg | 正常消息：成功。如果connection_success_info是false，这里填连接失败。以下列的内容全部留空直接写入|**VARCHAR(20)** <br> null|
|version_navisboard |NavisBoard版本 |**VARCHAR(50)** <br> null |
|version_navisbrain |NavisBrain版本 |**VARCHAR(50)** <br> null|
|version_navisbridge |NavisBridge版本 |**VARCHAR(50)** <br> null|
|version_platform_type |移动平台类型 |**VARCHAR(50)** <br> null|
|version_platform_software |移动平台版本 |**VARCHAR(50)** <br> null|
|version_platform_hardware |移动平台硬件 |**VARCHAR(50)** <br> null|
|version_lidar_type |激光雷达传感器类型 |**VARCHAR(50)** <br> null|
|version_lidar_software |激光雷达传感器版本 |**VARCHAR(50)** <br> null|
|version_lidar_hardware |激光雷达传感器硬件 |**VARCHAR(50)** <br> null|
|version_inertia_type |惯性传感器型号 |**VARCHAR(50)** <br> null|
|version_inertia_software |惯性传感器版本 |**VARCHAR(50)** <br> null|
|version_inertia_hardware |惯性传感器硬件 |**VARCHAR(50)** <br> null|
|version_vision_type |视觉传感器型号 |**VARCHAR(50)** <br> null|
|version_vision_software |视觉传感器版本 |**VARCHAR(50)** <br> null|
|version_vision_hardware |视觉传感器硬件 |**VARCHAR(50)** <br> null|
|version_compute_type |核心计算单元型号 |**VARCHAR(50)** <br> null|
|version_compute_software |核心计算单元版本 |**VARCHAR(50)** <br> null|
|version_compute_hardware |核心计算单元硬件 |**VARCHAR(50)** <br> null|
|status_navigating |导航状态 |**VARCHAR(10)** <br> null|
|status_navigatingmap |导航的地图信息 |**VARCHAR(100)** <br> null|
|status_navigatingtask |导航的任务信息 |**VARCHAR(100)** <br> null|
|status_2dmapping |2d建图状态 |**VARCHAR(10)** <br> null|
|status_2dmap |2d建图的地图信息 |**VARCHAR(100)** <br> null|
|status_3dmapping |3d建图状态 |**VARCHAR(10)** <br> null|
|status_3dmap |3d建图的地图信息 |**VARCHAR(100)** <br> null|
|status_recording |录制的状态 |**VARCHAR(10)** <br> null|
|status_recordmap |录制的地图信息 |**VARCHAR(100)** <br> null|
|status_velocity_linear |线速度 |**FLOAT** <br> null|
|status_velocity_angular |角速度 |**FLOAT** <br> null|
|status_base |底盘状态 |**VARCHAR(20)** <br> null|
|status_faultcode |底盘错误代码 |**VARCHAR(20)** <br> null|
|status_controlmode |底盘控制模式 |**VARCHAR(20)** <br> null|
|status_battery_cur |电池电流 |**FLOAT** <br> null|
|status_battery_temp |电池温度 |**FLOAT** <br> null|
|status_battery_health |电池健康 |**TINYINT** <br> null|
|status_battery_power |电池电量 |**TINYINT** <br> null|
|status_battery_vol |电池电压 |**FLOAT** <br> null|
|status_battery_chargehour |电池累计充电小时数 |**FLOAT** <br> null|
|status_battery_ischarging |电池是否正在充电 (1充电 0未充电) |**TINYINT** <br> null|
|status_battery_chargetime |电池充电次数 |**INT** <br> null|
|status_battery_last_chargehour |电池最近一次的充电小时数 |**FLOAT** <br> null|
|status_sensor_isopen |设备传感器状态 |**TINYINT** <br> null|
|status_disk_space |机器人底盘的磁盘空间 |**VARCHAR(20)** <br> null|

* 表 ROBOT_SENSOR

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_robot |机器人标识，ROBOT_INFO的id_robot外键|**VARCHAR(20)** <br> not null <br> primary |
|collection_datetime |写一个NOW()作为数据的记录时间 |**DATETIME** <br> not null |
|collection_sf6 |六氟化硫数据 |**FLOAT** <br> null|
|collection_humidity |湿度数据 |**FLOAT** <br> null|
|collection_temperature |温度数据 |**FLOAT** <br> null|
|collection_noise |噪音数据 |**FLOAT** <br> null|
|collection_nh |氨气数据 |**FLOAT** <br> null|
|collection_co2 |二氧化碳数据 |**FLOAT** <br> null|
|collection_imu |文件路径 	imu信息|**VARCHAR(200)** <br> null|
|collection_lidar_3d |文件路径 激光雷达传感器3D点云数据|**VARCHAR(200)** <br> null|
|collection_lidar_2d |文件路径 激光雷达传感器2D点云数据|**VARCHAR(200)** <br> null|
|collection_rgb |文件路径 相机RGB图像 数据|**VARCHAR(200)** <br> null|
|collection_thermal|文件路径 相机热红外图像 数据|**VARCHAR(200)** <br> null|
|collection_depth |文件路径 相机depth图像数据|**VARCHAR(200)** <br> null|

* 表 PIG_CURRENT

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_pig |机器人识别到的生猪标识 |**VARCHAR(50)** <br> not null| 
|id_robot |机器人标识，ROBOT_INFO的id_robot外键 |**VARCHAR(20)** <br> not null| 
|collection_datetime |写一个NOW()作为数据的记录时间 |**DATETIME** <br> not null|
|collection_img_rgb |文件路径 拍摄的生猪的可见光图像 |**VARCHAR(200)** <br> null | 
|collection_img_thermal |文件路径 拍摄的生猪的热红外图像 |**VARCHAR(200)** <br> null | 
|collection_temperature |生猪的面部温度，取最高值 |**FLOAT** <br> null | 
|collection_img_rgbd |文件路径 拍摄的生猪的深度图像 |**VARCHAR(200)** <br> null | 

* 表 ROBOT_INFO

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_robot |机器人标识 |**VARCHAR(20)** <br> not null <br> primary | 
|id_account |机器人归属账号 ACCOUNT_INFO的id_account外键|**VARCHAR(50)** <br> not null | 
|owner_robot |机器人归属 |**VARCHAR(20)** <br>null | 
|product_robot |生产方 |**VARCHAR(20)** <br> null | 
|ship_robot |订购日期 |**DATETIME** <br> null | 
|born_robot |交付日期 |**DATETIME** <br> null | 
|equip_cpu_robot |机器人配置cpu |**VARCHAR(20)** <br> null  | 
|equip_gpu_robot |机器人配置gpu |**VARCHAR(20)** <br> null  | 
|equip_ram_robot |机器人配置ram |**VARCHAR(10)** <br> null  | 
|equip_equipment_robot |机器人外部配置 |**VARCHAR(100)** <br> null  | 
|price_robot |机器人定价 |**FLOAT** <br> null  | 
|remark_robot |备注信息 |**VARCHAR(400)** <br> null | 

* 表 ACCOUNT_INFO

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_account |登录名。无限制，中英文数字 |**VARCHAR(50)** <br>not null <br> primary | 
|pwd_account |登录密码。英文数字 |**VARCHAR(50)** <br>not null| 
|type_account |用户类型，0管理员，1用户，2访客 |**VARCHAR(2)** <br>not null| 
|available_satus_account |是否可用。1可用，0停用。默认1|**TINYINT** <br>null|
|dept_account |来自部门 |**VARCHAR(50)** <br> null| 
|position_account |用户的工作地址 |**VARCHAR(100)** <br> null| 
|email_account |用户邮箱 |**VARCHAR(50)** <br> null| 
|loginip_account |最后登陆IP |**VARCHAR(100)** <br> null| 
|logindate_account |最后登陆时间 |**DATETIME** <br> null| 
|createby_account |创建者 |**VARCHAR(50)** <br> null| 
|createtime_account |创建时间 |**DATETIME** <br> null| 
|remark_account |备注信息 |**VARCHAR (400)** <br> null| 

* 表 SYSNOTICE_INFO

| 字段 | 备注 | 数据类型 |
| :----- | :----- | :----- |
|id_sysnotice |系统通知编号 |**INT** <br>not null <br> primary <br> 自增| 
|title_sysnotice |系统通知标题 |**VARCHAR(50)** <br>not null | 
|content_sysnotice |系统通知内容 |**VARCHAR(500)** <br>not null | 
|createby_sysnotice |系统通知创建者，ACCOUNT_INFO的id_account外键 |**VARCHAR(50)** <br>not null | 
|createdate_sysnotice |系统通知时间 |**DATETIME** <br>not null | 
|status_sysnotice |通知可用性。1可用，0关闭。默认1|**TINYINT** <br>not null | 
|updateby_sysnotice |系统通知更新者，ACCOUNT_INFO的id_account |**VARCHAR(50)** <br> null | 
|updatetime_sysnotice |系统通知更新时间 |**DATETIME** <br> null | 
|remark_sysnotice |备注信息 |**VARCHAR(400)** <br> null | 
