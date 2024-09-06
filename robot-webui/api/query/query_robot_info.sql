-- name: RobotInfoInsert :execresult
INSERT INTO robot_info(id_robot, id_account, owner_robot, product_robot, ship_robot, born_robot, equip_cpu_robot,
                       equip_gpu_robot, equip_ram_robot, equip_equipment_robot, price_robot,
                       remark_robot) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: RobotInfoSearchByAccount :many
SELECT *
From robot_info
WHERE id_account = ?;

-- name: RobotIDSearchByAccount :many
SELECT id_robot
From robot_info
WHERE id_account = ?;

-- name: RobotInfoSearchByID :one
SELECT *
FROM robot_info
WHERE id_robot = ?;

-- name: RobotInfoSearchByID2 :many
SELECT id_robot, owner_robot, born_robot, product_robot, price_robot, equip_equipment_robot
FROM robot_info
WHERE id_account = ?;