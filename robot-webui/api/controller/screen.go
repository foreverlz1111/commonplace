package controller

import (
	"api/config"
	"api/server"
	"context"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

// @Summary 为了大屏展示列出最近的6条传感器信息
func MyrobotSensorScreen(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		config.MyLogger.Error("Key not found: 'id_robot'")
		return
	}
	result, err := server.MysqlDB.RobotSensorSearchByAccountScreen(context.Background(), valueIdRobot)
	if err != nil {
		log.Println(err)
		config.MyLogger.Errorf("controller.MysqlDB.RobotSensorSearchByAccountScreen: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		config.MyLogger.Debugf("id_robot sensor 6[]: %v", result)
		c.JSON(http.StatusOK, result)
	}
}
