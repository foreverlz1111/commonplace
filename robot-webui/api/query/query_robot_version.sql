-- name: RobotVersionSearchByNew :one
SELECT *
FROM robot_version
WHERE id_robot = ? order by collection_datetime desc limit 1;