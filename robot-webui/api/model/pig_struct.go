package model

import (
	"database/sql"
	"time"
)

type PigCurrentStruct struct {
	ID                    int             `db:"id"`                     // 自动递增的主键
	IDPig                 string          `db:"id_pig"`                 // 生猪标识
	IDRobot               string          `db:"id_robot"`               // 机器人标识，ROBOT_INFO的id_robot外键
	CollectionDatetime    time.Time       `db:"collection_datetime"`    // 数据记录时间 (NOW())
	CollectionImgRGB      sql.NullString  `db:"collection_img_rgb"`     // 生猪的可见光图像文件路径
	CollectionImgThermal  sql.NullString  `db:"collection_img_thermal"` // 生猪的热红外图像文件路径
	CollectionTemperature sql.NullFloat64 `db:"collection_temperature"` // 生猪的面部温度，取最高值
	CollectionImgRGBD     sql.NullString  `db:"collection_img_rgbd"`    // 生猪的深度图像文件路径
	CollectionImgCamera   sql.NullString  `db:"collection_img_camera"`  // 相机
}
