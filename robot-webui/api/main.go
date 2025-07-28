package main

import (
	"api/config"
	_ "api/docs"
	"api/myoss"
	"api/server"
	_ "github.com/go-sql-driver/mysql"
	//"github.com/go-playground/validator/v10" // 检查传回的密码格式
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitLogger()
	server.InitMysql()
	myoss.Init()
	r := gin.Default()
	InitRouter(r)
	ginErr := r.Run(":3000")
	config.MyLogger.Error(ginErr)

	//http.HandleFunc("/doc/", httpSwagger.WrapHandler)
}
