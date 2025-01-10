package server

import (
	"api/common"
	"api/dboutput"
	"context"
	"golang.org/x/crypto/bcrypt"
)

type AccountServerFunc struct {
	AccountServer
}

func (Accountf *AccountServerFunc) GetUserTable(idaccount, pwdaccount string) dboutput.AccountInfo {
	result, err := MysqlDB.AccountSearch(context.Background(), dboutput.AccountSearchParams{
		IDAccount:  idaccount,
		PwdAccount: pwdaccount,
	})
	if err == nil && result.IDAccount != "" {
		return result
	}
	return dboutput.AccountInfo{}
}

func (Accountf *AccountServerFunc) GetUserByID(idaccount string) dboutput.AccountInfo {
	result, err := MysqlDB.AccountSearchByID(context.Background(), idaccount)
	if err == nil && result.IDAccount != "" {
		common.MyLogger.Debugf("找到用户信息 %v", result)
		return result
	}
	return dboutput.AccountInfo{}
}

func (Accountf *AccountServerFunc) RegisterUser(args dboutput.AccountInfo) bool {
	result, err := MysqlDB.AccountInsert(context.Background(), dboutput.AccountInsertParams{
		IDAccount:             args.IDAccount,
		PwdAccount:            args.PwdAccount,
		TypeAccount:           args.TypeAccount,
		AvailableSatusAccount: args.AvailableSatusAccount,
		DeptAccount:           args.DeptAccount,
		PositionAccount:       args.PositionAccount,
		EmailAccount:          args.EmailAccount,
		LoginipAccount:        args.LoginipAccount,
		LogindateAccount:      args.LogindateAccount,
		CreatebyAccount:       args.CreatebyAccount,
		CreatetimeAccount:     args.CreatetimeAccount,
		RemarkAccount:         args.RemarkAccount,
	})
	if err != nil {
		common.MyLogger.Debugf("注册失败：%v", err)
		return false
	}
	rowsaffect, err := result.RowsAffected()
	if err != nil {
		common.MyLogger.Debugf("获取不到 RowsAffected()  %v", err)
	}
	common.MyLogger.Debugf("注册成功，插入信息行数: %v", rowsaffect)
	return true
}

// 返回[]byte类型的加密
func EnCoder(password string) []byte {
	// old usage, unsafe
	//h := hmac.New(sha256.New, []byte(password))
	//sha := hex.EncodeToString(h.Sum(nil))
	//return sha

	// 使用密码作为密钥创建 HMAC 哈希计算器, 适合于生成签名或验证消息完整性
	//h := hmac.New(sha256.New, []byte("505")) // 替换为固定的密钥，而不是密码本身
	//h.Write([]byte(password))                // 写入需要计算 HMAC 的数据
	//sha := hex.EncodeToString(h.Sum(nil))    // 获取哈希值并转换为十六进制字符串
	//return sha

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		common.MyLogger.Debugf("hashedPassword", hashedPassword)
		return nil
	}
	return hashedPassword

}

func DeCoder(hashpassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashpassword), []byte(password))
	if err != nil {
		common.MyLogger.Debugf("hashed Password 生成失败，密码错误: ", err)
		return false
	} else {
		return true
	}
}
