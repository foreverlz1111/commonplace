package server

import (
	"api/common"
	"api/dboutput"
	"database/sql"
	"github.com/jmoiron/sqlx"
)

var MysqlDB *dboutput.Queries
var SqlxDB *sqlx.DB

func InitSqlx() {
	var dberr error
	SqlxDB, dberr = sqlx.Open("mysql", common.DBconfig_user+common.DBconfig_password+common.DBconfig_url+common.DBconfig_dbname+"?parseTime=true")
	if dberr != nil {
		common.MyLogger.Error(dberr)
	} else {
		common.MyLogger.Info(dberr)
	}
}

func InitMysql() {
	connectedDatabase, err := sql.Open("mysql", common.DBconfig_user+common.DBconfig_password+common.DBconfig_url+common.DBconfig_dbname+"?parseTime=true")
	if err != nil {
		common.MyLogger.Errorf("connect mysql err:%v", err)
	} else {
		common.MyLogger.Infof("connect mysql success")
	}
	MysqlDB = dboutput.New(connectedDatabase)
}
