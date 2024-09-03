-- name: AccountInsert :execresult
INSERT INTO account_info(id_account, pwd_account, type_account, available_satus_account, dept_account, position_account, email_account, loginip_account, logindate_account, createby_account, createtime_account, remark_account)
    VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);