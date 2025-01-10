package main

import (
	"api/common"
	_ "api/docs"
	"api/myoss"
	"api/route"
	"api/server"
	_ "github.com/go-sql-driver/mysql"
	//"github.com/go-playground/validator/v10" // 检查传回的密码格式
	"github.com/gin-gonic/gin"
)

func main() {
	common.InitLogger()
	server.InitMysql()
	server.InitSqlx()
	myoss.Init()
	r := gin.Default()
	route.InitRouter(r)
	gin_err := r.Run(":3000")
	common.MyLogger.Error(gin_err)

	//http.HandleFunc("/doc/", httpSwagger.WrapHandler)
}
