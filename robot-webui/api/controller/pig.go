package controller

import (
	"api/common"
	"api/server"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary 查找旗下全部机器人的对应猪脸信息
func PigFaceAll(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Error("Key not found: 'id_account'")
	}

	result, err := server.MysqlDB.PigfaceAllByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Error("server.MysqlDB.PigfaceAllByAccount", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   err,
			"message": "查找猪脸数据失败",
		})
		return
	}
	c.JSON(http.StatusOK, result)

}

// 大屏展示-最新的一条猪脸信息
func PigFaceOne(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		common.MyLogger.Error("Key not found: 'id_robot'")
	}

	result, err := server.MysqlDB.PigfaceOneByRobot(context.Background(), valueIdRobot)
	if err != nil {
		common.MyLogger.Error("server.MysqlDB.PigfaceOneByRobot", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   err,
			"message": "查找猪脸数据失败",
		})
		return
	}
	common.MyLogger.Debugf("server.MysqlDB.PigfaceOneByRobot result: %v", result)
	c.JSON(http.StatusOK, result)

	//sqlxquery, args, err := sqlx.In("SELECT * FROM pig_current WHERE id_robot = (?) ORDER BY `collection_datetime` DESC LIMIT 1;", valueIdRobot)
	//if err != nil {
	//	common.MyLogger.Error("sqlx query:", err)
	//}
	//sqlxquery = server.SqlxDB.Rebind(sqlxquery)
	//var pigcurrent []model.PigPaceStruct
	//err = server.SqlxDB.SelectContext(context.Background(), &pigcurrent, sqlxquery, args...)
	//if err != nil {
	//	common.MyLogger.Error("SelectContext", err)
	//} else {
	//	common.MyLogger.Debugf("pigcurrent length: %d", len(pigcurrent))
	//	c.JSON(http.StatusOK, pigcurrent)
	//}
}
