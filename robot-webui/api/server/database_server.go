package server

import (
	"api/config"
	"api/dboutput"
	"database/sql"
)

var MysqlDB *dboutput.Queries

func InitMysql() {
	connectedDatabase, err := sql.Open("mysql", config.DBconfig_user+config.DBconfig_password+config.DBconfig_url+config.DBconfig_dbname+"?parseTime=true")
	if err != nil {
		config.MyLogger.Errorf("connect mysql err:%v", err)
	} else {
		config.MyLogger.Infof("connect mysql success")
	}
	MysqlDB = dboutput.New(connectedDatabase)
}
