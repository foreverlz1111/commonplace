package main

import (
	"api/config"
	_ "api/docs"
	"bytes"
	"database/sql"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"github.com/swaggo/http-swagger"
	"io"
	"log"
	"net/http"
)

// @Summary 处理登录请求
func loginHandler(w http.ResponseWriter, r *http.Request) {
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

	err = r.ParseForm() // 之后可用 r.FromValue()
	if err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
	}

	valueIdAccount := r.FormValue("id_account")
	valuePwdAccount := r.FormValue("pwd_account")
	if valueIdAccount == "" {
		log.Println("Key not found: /'id_account/'")
		http.Error(w, "Key not found: /'id_account/'", http.StatusBadRequest)
	} else if valuePwdAccount == "" {
		log.Println("Key not found: /'pwd_account/'")
		http.Error(w, "Key not found: /'pwd_account/'", http.StatusBadRequest)
	}

	if valueIdAccount == "SYS505" && valuePwdAccount == "SYS505" {
		response := map[string]string{
			"success": "true",
		}
		// 返回 JSON 响应
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
	}
}

func main() {
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/doc/", httpSwagger.WrapHandler)

	//ctx := context.Background()
	_, err := sql.Open("mysql", config.DBconfig_user+config.DBconfig_password+config.DBconfig_url+config.DBconfig_dbname+"?parseTime=true")
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("DB connected")
	}

	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
