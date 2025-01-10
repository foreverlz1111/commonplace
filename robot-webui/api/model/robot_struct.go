package model

import (
	"database/sql"
	"time"
)

type RobotSensorStruct struct {
	ID                    int             `db:"id"`
	IDRobot               string          `db:"id_robot"`               // 机器人标识
	CollectionDatetime    time.Time       `db:"collection_datetime"`    // 数据的记录时间
	CollectionSF6         sql.NullFloat64 `db:"collection_sf6"`         // 六氟化硫数据
	CollectionHumidity    sql.NullFloat64 `db:"collection_humidity"`    // 湿度数据
	CollectionTemperature sql.NullFloat64 `db:"collection_temperature"` // 温度数据
	CollectionNoise       sql.NullFloat64 `db:"collection_noise"`       // 噪音数据
	CollectionNH          sql.NullFloat64 `db:"collection_nh"`          // 氨气数据
	CollectionSO2         sql.NullFloat64 `db:"collection_so2"`         // 二氧化硫数据
	CollectionIMU         sql.NullString  `db:"collection_imu"`         // 文件路径，IMU数据
	CollectionLidar3D     sql.NullString  `db:"collection_lidar_3d"`    // 文件路径，激光雷达传感器3D点云数据
	CollectionLidar2D     sql.NullString  `db:"collection_lidar_2d"`    // 文件路径，激光雷达传感器2D点云数据
	CollectionRGB         sql.NullString  `db:"collection_rgb"`         // 文件路径，相机RGB图像数据
	CollectionThermal     sql.NullString  `db:"collection_thermal"`     // 文件路径，相机热红外图像数据
	CollectionDepth       sql.NullString  `db:"collection_depth"`       // 文件路径，相机depth图像数据
}
type RobotStatusStruct struct {
	ID                          int             `db:"id"`                             // 自动递增的主键
	IDRobot                     string          `db:"id_robot"`                       // 机器人标识，ROBOT_INFO的id_robot外键
	CollectionDatetime          time.Time       `db:"collection_datetime"`            // 数据记录时间 (NOW())
	ConnectionSuccessInfo       sql.NullBool    `db:"connection_success_info"`        // 连接成功(1)或失败(0)
	ConnectionCode              sql.NullString  `db:"connection_code"`                // 连接代码
	ConnectionMsg               sql.NullString  `db:"connection_msg"`                 // 连接消息
	StatusNavigating            sql.NullString  `db:"status_navigating"`              // 导航状态
	StatusNavigatingmap         sql.NullString  `db:"status_navigatingmap"`           // 导航的地图信息
	StatusNavigatingtask        sql.NullString  `db:"status_navigatingtask"`          // 导航的任务信息
	Status2DMApping             sql.NullString  `db:"status_2dmapping"`               // 2D建图状态
	Status2DMap                 sql.NullString  `db:"status_2dmap"`                   // 2D建图的地图信息
	Status3DMApping             sql.NullString  `db:"status_3dmapping"`               // 3D建图状态
	Status3DMap                 sql.NullString  `db:"status_3dmap"`                   // 3D建图的地图信息
	StatusRecording             sql.NullString  `db:"status_recording"`               // 录制状态
	StatusRecordMap             sql.NullString  `db:"status_recordmap"`               // 录制的地图信息
	StatusVelocityLinear        sql.NullFloat64 `db:"status_velocity_linear"`         // 线速度
	StatusVelocityAngular       sql.NullFloat64 `db:"status_velocity_angular"`        // 角速度
	StatusBase                  sql.NullString  `db:"status_base"`                    // 底盘状态
	StatusFaultCode             sql.NullString  `db:"status_faultcode"`               // 底盘错误代码
	StatusControlMode           sql.NullString  `db:"status_controlmode"`             // 底盘控制模式
	StatusBatteryCur            sql.NullFloat64 `db:"status_battery_cur"`             // 电池电流
	StatusBatteryTemp           sql.NullFloat64 `db:"status_battery_temp"`            // 电池温度
	StatusBatteryHealth         sql.NullInt64   `db:"status_battery_health"`          // 电池健康
	StatusBatteryPower          sql.NullInt64   `db:"status_battery_power"`           // 电池电量
	StatusBatteryVol            sql.NullFloat64 `db:"status_battery_vol"`             // 电池电压
	StatusBatteryChargeHour     sql.NullFloat64 `db:"status_battery_chargehour"`      // 电池累计充电小时数
	StatusBatteryIsCharging     sql.NullBool    `db:"status_battery_ischarging"`      // 电池是否正在充电
	StatusBatteryChargeTime     sql.NullInt64   `db:"status_battery_chargetime"`      // 电池充电次数
	StatusBatteryLastChargeHour sql.NullFloat64 `db:"status_battery_last_chargehour"` // 最近一次充电小时数
	StatusSensorIsOpen          sql.NullBool    `db:"status_sensor_isopen"`           // 设备传感器状态
	StatusDiskSpace             sql.NullString  `db:"status_disk_space"`              // 机器人底盘的磁盘空间
}

type RobotVersion struct {
}
