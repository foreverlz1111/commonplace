package main

import (
	"api/config"
	"api/dboutput"
	_ "api/docs"
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"github.com/swaggo/http-swagger"
	"io"
	"log"
	"net/http"
	//"github.com/go-playground/validator/v10" // 检查传回的密码格式
)

// @Summary 处理登录请求
func loginHandler(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	// 读取页面put + 鉴别 + 查找 + 返回
	if r.Method != http.MethodPut {
		http.Error(w, "Only PUT method is allowed", http.StatusMethodNotAllowed)
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	log.Println("/loginHandler: " + string(body))
	r.Body = io.NopCloser(bytes.NewBuffer(body))

	//err = r.ParseForm() // 之后可用 r.FromValue()
	//if err != nil {
	//	http.Error(w, "Failed to parse form", http.StatusBadRequest)
	//}
	//
	//valueIdAccount := r.FormValue("id_account")
	//valuePwdAccount := r.FormValue("pwd_account")
	var webJson map[string]string
	err = json.Unmarshal(body, &webJson)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}
	valueIdAccount, _ := webJson["id_account"]
	valuePwdAccount, _ := webJson["pwd_account"]
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
		http.Error(w, "Key not found: 'id_account'", http.StatusBadRequest)
		return
	} else if valuePwdAccount == "" {
		log.Println("Key not found: 'pwd_account'")
		http.Error(w, "Key not found: 'pwd_account'", http.StatusBadRequest)
		return
	}

	result, err := query.AccountSearch(ctx, dboutput.AccountSearchParams{
		IDAccount:  valueIdAccount,
		PwdAccount: valuePwdAccount,
	})

	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(result) // 测试用
		if result.IDAccount != "" && result.PwdAccount != "" {
			// 简单的respond用于测试，不应该返回1个以上的json
			//response := map[string]string{
			//	"success": "true",
			//}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			//json.NewEncoder(w).Encode(response)
		} else {
			w.Header().Set("Content-Type", "application/json")
			http.Error(w, "Account not found", http.StatusNoContent)
		}
	}
}
func accountRobot(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotIDSearchByAccount(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_account", valueIdAccount, " Search robot")
		json.NewEncoder(w).Encode(result)
	}
}
func robotCurrent(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	//body, err := io.ReadAll(r.Body)
	//if err != nil {
	//	http.Error(w, "Failed to read request body", http.StatusBadRequest)
	//	return
	//}
	//var webJson map[string]string
	//err = json.Unmarshal(body, &webJson)
	//if err != nil {
	//	http.Error(w, "Invalid JSON format", http.StatusBadRequest)
	//	return
	//}
	//valueIdRobot, _ := webJson["id_robot"]

	urlquery := r.URL.Query()
	valueIdRobot := urlquery.Get("id_robot")
	if valueIdRobot == "" {
		log.Println("Key not found: 'id_robot'")
	}
	result, err := query.RobotCurrentSearch(ctx, valueIdRobot)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_robot", valueIdRobot, " Search")
		json.NewEncoder(w).Encode(result)
	}
}
func robotInfo(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdRobot := urlquery.Get("id_robot")
	if valueIdRobot == "" {
		log.Println("Key not found: 'id_robot'")
	}
	result, err := query.RobotInfoSearchByID(ctx, valueIdRobot)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_robot[]", valueIdRobot, " Search")
		json.NewEncoder(w).Encode(result)
	}
}
func myRobot(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotInfoSearchByID2(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_info []", valueIdAccount, " Search")
		json.NewEncoder(w).Encode(result)
	}
}
func main() {
	ctx := context.Background()
	connectedDatabase, err := sql.Open("mysql", config.DBconfig_user+config.DBconfig_password+config.DBconfig_url+config.DBconfig_dbname+"?parseTime=true")
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("DB connected")
	}
	query := dboutput.New(connectedDatabase)
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, ctx, query)
	})
	http.HandleFunc("/accountrobot", func(w http.ResponseWriter, r *http.Request) {
		accountRobot(w, r, ctx, query)
	})
	http.HandleFunc("/robotcurrent", func(w http.ResponseWriter, r *http.Request) {
		robotCurrent(w, r, ctx, query)
	})
	http.HandleFunc("/robotinfo", func(w http.ResponseWriter, r *http.Request) {
		robotInfo(w, r, ctx, query)
	})
	http.HandleFunc("/myrobot", func(w http.ResponseWriter, r *http.Request) {
		myRobot(w, r, ctx, query)
	})
	http.HandleFunc("/doc/", httpSwagger.WrapHandler)
	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
