package controller

import (
	"api/common"
	"api/model"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"net/http"
)

// @Summary 查找旗下全部机器人的对应猪脸信息
func PigFaceAll(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Error("Key not found: 'id_account'")
	}
	result, err := MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Error(err)
	} else {
		common.MyLogger.Debugf("controller.MysqlDB.RobotIDSearchByAccount: %v", result)
	}
	sqlxquery, args, err := sqlx.In("SELECT * FROM pig_current WHERE id_robot IN (?) ORDER BY `collection_datetime` DESC;", result)
	if err != nil {
		common.MyLogger.Errorf("sqlx query: %v", err)
	}
	sqlxquery = SqlxDB.Rebind(sqlxquery)
	var pigcurrent []model.PigCurrentStruct
	err = SqlxDB.SelectContext(context.Background(), &pigcurrent, sqlxquery, args...)
	if err != nil {
		common.MyLogger.Errorf("SelectContext: %v", err)
	} else {
		common.MyLogger.Debugf("SelectContext: %v", pigcurrent)
		c.JSON(http.StatusOK, pigcurrent)
	}
}

// 大屏展示-最新的一条猪脸信息
func PigFaceOne(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		common.MyLogger.Error("Key not found: 'id_robot'")
	}
	sqlxquery, args, err := sqlx.In("SELECT * FROM pig_current WHERE id_robot = (?) ORDER BY `collection_datetime` DESC LIMIT 1;", valueIdRobot)
	if err != nil {
		common.MyLogger.Error("sqlx query:", err)
	}
	sqlxquery = SqlxDB.Rebind(sqlxquery)
	var pigcurrent []model.PigCurrentStruct
	err = SqlxDB.SelectContext(context.Background(), &pigcurrent, sqlxquery, args...)
	if err != nil {
		common.MyLogger.Error("SelectContext", err)
	} else {
		common.MyLogger.Debugf("pigcurrent length: %d", len(pigcurrent))
		c.JSON(http.StatusOK, pigcurrent)
	}
}
