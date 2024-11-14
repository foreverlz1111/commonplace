CREATE TABLE `pig_current` (
                               `id` int NOT NULL AUTO_INCREMENT,
                               `id_pig` varchar(50) NOT NULL COMMENT '机器人识别到的生猪标识',
                               `id_robot` varchar(20) NOT NULL COMMENT '机器人标识，ROBOT_INFO的id_robot外键',
                               `collection_datetime` datetime NOT NULL COMMENT '写一个NOW()作为数据的记录时间',
                               `collection_img_rgb` varchar(200) DEFAULT NULL COMMENT '文件路径 拍摄的生猪的可见光图像',
                               `collection_img_thermal` varchar(200) DEFAULT NULL COMMENT '文件路径 拍摄的生猪的热红外图像',
                               `collection_temperature` float DEFAULT NULL COMMENT '生猪的面部温度，取最高值',
                               `collection_img_rgbd` varchar(200) DEFAULT NULL COMMENT '文件路径 拍摄的生猪的深度图像',
                               `collection_img_camera` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文件路径或数据 拍摄的相机实时画面',
                               PRIMARY KEY (`id`),
                               KEY `pig_current_robot_info_id_robot_fk` (`id_robot`),
                               CONSTRAINT `pig_current_robot_info_id_robot_fk` FOREIGN KEY (`id_robot`) REFERENCES `robot_info` (`id_robot`)
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8mb3



