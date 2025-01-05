package controller

import (
	"api/common"
	"api/dboutput"
	"context"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

// @Summary 处理登录请求
func LoginHandler(c *gin.Context) {
	// 获取原始的 JSON 数据
	rawData, err := c.GetRawData()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read request body"})
		return
	}

	// 将 JSON 数据解析为 map
	var data map[string]string
	if err := json.Unmarshal(rawData, &data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	valueIdAccount := data["id_account"]
	valuePwdAccount := data["pwd_account"]

	if valueIdAccount == "" || valuePwdAccount == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing account or password"})
		return
	}

	// 验证用户 - to-do: put it to server
	result, err := MysqlDB.AccountSearch(context.Background(), dboutput.AccountSearchParams{
		IDAccount:  valueIdAccount,
		PwdAccount: valuePwdAccount,
	})
	if err != nil || result.IDAccount == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid account or password"})
		return
	}

	// 生成 JWT
	token, err := GenerateJWT(valueIdAccount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// 返回 JWT 给客户端
	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"data":  result,
	})

	// 读取页面put + 鉴别 + 查找 + 返回
	//if r.Method != http.MethodPut {
	//	http.Error(w, "Only PUT method is allowed", http.StatusMethodNotAllowed)
	//}
	//body, err := io.ReadAll(r.Body)
	//if err != nil {
	//	http.Error(w, "Failed to read request body", http.StatusBadRequest)
	//	return
	//}
	//log.Println("/loginHandler: " + string(body))
	//r.Body = io.NopCloser(bytes.NewBuffer(body))

	//err = r.ParseForm() // 之后可用 r.FromValue()
	//if err != nil {
	//	http.Error(w, "Failed to parse form", http.StatusBadRequest)
	//}

	//valueIdAccount := r.FormValue("id_account")
	//valuePwdAccount := r.FormValue("pwd_account")
	//var webJson map[string]string
	//err = json.Unmarshal(body, &webJson)
	//if err != nil {
	//	http.Error(w, "Invalid JSON format", http.StatusBadRequest)
	//	return
	//}
	//valueIdAccount, _ := webJson["id_account"]
	//valuePwdAccount, _ := webJson["pwd_account"]
	//if valueIdAccount == "" {
	//	log.Println("Key not found: 'id_account'")
	//	http.Error(w, "Key not found: 'id_account'", http.StatusBadRequest)
	//	return
	//} else if valuePwdAccount == "" {
	//	log.Println("Key not found: 'pwd_account'")
	//	http.Error(w, "Key not found: 'pwd_account'", http.StatusBadRequest)
	//	return
	//}
	//
	//result, err := query.AccountSearch(ctx, dboutput.AccountSearchParams{
	//	IDAccount:  valueIdAccount,
	//	PwdAccount: valuePwdAccount,
	//})
	//
	//if err != nil {
	//	log.Println(err)
	//	http.Error(w, "Database Server Error", http.StatusInternalServerError)
	//} else {
	//	json.NewEncoder(w).Encode(result) // 测试用
	//	if result.IDAccount != "" && result.PwdAccount != "" {
	//		// 简单的respond用于测试，不应该返回1个以上的json
	//		//response := map[string]string{
	//		//	"success": "true",
	//		//}
	//		w.Header().Set("Content-Type", "application/json")
	//		w.WriteHeader(http.StatusOK)
	//		//json.NewEncoder(w).Encode(response)
	//	} else {
	//		w.Header().Set("Content-Type", "application/json")
	//		http.Error(w, "Account not found", http.StatusNoContent)
	//	}
	//}
}

// AccountRobot @Summary 根据id查找名下的机器人id[]
func AccountRobot(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Errorf("AccountRobot error: %s", err)
		c.JSON(http.StatusBadRequest, c.Error(err))
	} else {
		common.MyLogger.Debugf("id_account: %v", valueIdAccount)
		c.JSON(http.StatusOK, result)
	}
}
