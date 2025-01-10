-- name: PigfaceInsert :execresult
INSERT INTO pig_current(id, id_pig, id_robot, collection_datetime, collection_img_rgb, collection_img_thermal,
                        collection_temperature, collection_img_rgbd,
                        collection_img_camera) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: PigfaceSearchByAccount :many
SELECT *
FROM pig_current
WHERE id_robot IN (?);

-- name: PigfaceAllByAccount :many
SELECT *
FROM pig_current
WHERE id_robot IN (SELECT id_robot
                   From robot_info
                   WHERE id_account = ?)
ORDER BY `collection_datetime` DESC;

-- name: PigfaceOneByRobot :one
SELECT *
FROM pig_current
WHERE id_robot = (?)
ORDER BY `collection_datetime` DESC
LIMIT 1;