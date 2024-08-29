-- name: Selectall :many
SELECT *
FROM connect_ddl;

-- name: AddLine :execresult
INSERT INTO connect_ddl(myrow_user, myrow_number) VALUE (?, ?);

-- name: DeleteLine :exec
DELETE FROM connect_ddl WHERE myrow_user = ?;