-- name: RobotSensorInsertByAccount :execresult
INSERT INTO robot_sensor(id_robot, collection_datetime, collection_sf6, collection_humidity, collection_temperature,
                         collection_noise, collection_nh, collection_so2, collection_imu, collection_lidar_3d,
                         collection_lidar_2d, collection_rgb, collection_thermal, collection_depth)
    VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);


-- name: RobotSensorSearchByAccount :many
SELECT *
FROM robot_sensor
WHERE id_robot IN (?);

-- name: RobotSensorSearchByAccountScreen :many
SELECT *
FROM robot_sensor
WHERE id_robot = ?
order by collection_datetime desc limit 6;