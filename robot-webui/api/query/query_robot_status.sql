# -- name: RobotCurrentInsert :execresult
# INSERT INTO robot_current(id_robot, collection_datetime, connection_success_info, connection_code, connection_msg,
#                           version_navisboard, version_navisbrain, version_navisbridge, version_platform_type,
#                           version_platform_software, version_platform_hardware, version_lidar_type,
#                           version_lidar_software, version_lidar_hardware, version_inertia_type,
#                           version_inertia_software, version_inertia_hardware, version_vision_type,
#                           version_vision_software, version_vision_hardware, version_compute_type,
#                           version_compute_software, version_compute_hardware, status_navigating, status_navigatingmap,
#                           status_navigatingtask, status_2dmapping, status_2dmap, status_3dmapping, status_3dmap,
#                           status_recording, status_recordmap, status_velocity_linear, status_velocity_angular,
#                           status_base, status_faultcode, status_controlmode, status_battery_cur, status_battery_temp,
#                           status_battery_health, status_battery_power, status_battery_vol, status_battery_chargehour,
#                           status_battery_ischarging, status_battery_chargetime, status_battery_last_chargehour,
#                           status_sensor_isopen, status_disk_space) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
#                                                                           ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
#                                                                           ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
#                                                                           ?, ?, ?);

-- name: RobotCurrentSearchByNew :one
SELECT *
FROM robot_status
WHERE id_robot = ? order by collection_datetime desc limit 1;

-- name: RobotCurrentSearchAll :many
SELECT *
FROM  robot_status
WHERE id_robot IN (?);
