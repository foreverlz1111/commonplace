-- common:插入一个用户数据
-- name: AccountInsert :execresult
INSERT INTO account_info(id_account, pwd_account, type_account, available_satus_account, dept_account, position_account,
                         email_account, loginip_account, logindate_account, createby_account, createtime_account,
                         remark_account)
    VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: AccountSearch :one
SELECT *
FROM account_info
WHERE id_account = ?
  AND pwd_account = ?;

-- name: AccountSearchByID :one
SELECT *
FROM account_info
WHERE id_account = ?;

-- name: AccountLoginDateUpdate :exec
update account_info
set logindate_account = NOW()
where id_account = ?;

