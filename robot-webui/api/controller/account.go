package controller

import (
	"api/config"
	"api/dboutput"
	"api/server"
	"api/util"
	"context"
	"database/sql"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

var acountserver server.AccountServerFunc

// RegisterHandler 注册用户
func RegisterHandler(c *gin.Context) {
	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "json数据格式有误"})
		return
	}

	valueIdAccount := data["id_account"]
	valuePwdAccount := data["pwd_account"]
	config.MyLogger.Debugf("valueIdAccount: %v", valueIdAccount)
	config.MyLogger.Debugf("valuePwdAccount: %v", valuePwdAccount)

	userinfo := acountserver.GetUserByID(valueIdAccount)

	if userinfo.IDAccount == "" {
		if valuePwdAccount == "" {
			config.MyLogger.Errorf("传入密码为空")
		}
		pwdaccountstr := string(server.EnCoder(valuePwdAccount))
		if pwdaccountstr == "" {
			config.MyLogger.Errorf("生成加密密码失败")
		}
		config.MyLogger.Debugf("pwdaccountstr: %v", pwdaccountstr)
		if acountserver.RegisterUser(dboutput.AccountInfo{
			IDAccount:             valueIdAccount,
			PwdAccount:            pwdaccountstr,
			TypeAccount:           "1",
			AvailableSatusAccount: sql.NullInt16{Int16: 1, Valid: true},
			DeptAccount:           sql.NullString{String: "浙江农林大学", Valid: true},
			PositionAccount:       sql.NullString{String: "浙江农林大学", Valid: true},
			EmailAccount:          sql.NullString{String: "", Valid: true},
			LoginipAccount:        sql.NullString{String: "", Valid: true},
			LogindateAccount:      sql.NullTime{},
			CreatebyAccount:       sql.NullString{},
			CreatetimeAccount:     sql.NullTime{time.Now(), true},
			RemarkAccount:         sql.NullString{"注册地址" + c.RemoteIP(), true},
		}) {
			c.JSON(http.StatusOK, gin.H{
				"code":    http.StatusOK,
				"message": "注册成功",
			})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "用户已存在",
		})
	}
}

// LoginHandler 处理登录请求，登陆成功返回token
func LoginHandler(c *gin.Context) {
	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		config.MyLogger.Errorf("传入请json数据格式错误")
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "请检查json数据格式",
		})
		return
	}

	valueIdAccount := data["id_account"]
	valuePwdAccount := data["pwd_account"]

	if valueIdAccount == "" || valuePwdAccount == "" {
		config.MyLogger.Errorf("传入账户或密码为空")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "账户或密码为空",
		})
		return
	}

	// 验证用户
	userinfo := acountserver.GetUserByID(valueIdAccount)

	// 确有此人
	if userinfo.IDAccount != "" {
		if server.DeCoder(userinfo.PwdAccount, valuePwdAccount) {
			// 生成 JWT
			token, err := util.GenerateJWT(valueIdAccount)
			if err != nil {
				config.MyLogger.Errorf("服务无法生成token %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "服务无法生成token"})
				return
			}

			// 更新登陆日期
			err = server.MysqlDB.AccountLoginDateUpdate(context.Background(), valueIdAccount)
			if err != nil {
				config.MyLogger.Errorf("更新登陆时间 %v", err)
			}

			// 返回数据给请求方，to-do 处理userinfo信息，隐藏隐私数据
			c.JSON(http.StatusOK, gin.H{
				"token":   token,
				"data":    userinfo,
				"message": "success",
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "error",
				"message": "密码错误",
			})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "用户不存在",
		})
	}

}

// AccountRobot @Summary 根据id查找名下的机器人，返回[]id_robot
func AccountRobot(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := server.MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		config.MyLogger.Errorf("AccountRobot error: %s", err)
		c.JSON(http.StatusBadRequest, c.Error(err))
	} else {
		config.MyLogger.Debugf("id_account: %v", valueIdAccount)
		c.JSON(http.StatusOK, result)
	}
}
