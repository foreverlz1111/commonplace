package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/mypost", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
			return
		}
		// defer 放在 err 检查之后
		defer func() {
			if err := r.Body.Close(); err != nil {
				log.Printf("Failed to close body: %s", err)
			}
		}()
		// 读取请求体
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusBadRequest)
			return
		}
		log.Println(string(body))
		r.Body = io.NopCloser(bytes.NewBuffer(body))

		err = r.ParseForm() // 之后可用 r.FromValue()
		if err != nil {
			http.Error(w, "Failed to parse form", http.StatusBadRequest)
			return
		}

		value := r.FormValue("id_account")
		if value == "" {
			log.Println("Missing /'id_account/'")
			return
		}
		// 输出请求体内容
		log.Println(value)
		response := map[string]string{
			"id_account": "id_account",
			"id_pwd":     "id_pwd",
		}
		// 返回 JSON 响应
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	})
	http.HandleFunc("/myget", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
			return
		}
		// 解析 URL 查询参数
		query := r.URL.Query()
		// 获取指定的查询参数 "key"
		value := query.Get("key")
		if value == "" {
			http.Error(w, "Key not found", http.StatusBadRequest)
			return
		}
		// 构造要返回的 JSON 响应
		response := map[string]string{
			"key":   "key",
			"value": value,
		}
		// 设置响应的 Content-Type 为 application/json
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		// 将 JSON 数据写入响应体
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode JSON response", http.StatusInternalServerError)
			return
		}
	})
	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
