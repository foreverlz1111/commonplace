package controller

import (
	"api/config"
	"api/dboutput"
	"api/myoss"
	"api/server"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// @Summary 根据机器人id获取一个机器人current,包含状态+版本
func RobotCurrentTable(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		config.MyLogger.Error("Key not found: 'id_robot'")
	}
	robotstatus, err := server.MysqlDB.RobotCurrentSearchByNew(context.Background(), valueIdRobot)
	if err != nil {
		config.MyLogger.Errorf("RobotCurrentSearchByNew error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	} else {
		config.MyLogger.Debugf("robotstatus: %v", robotstatus)
	}
	robotversion, err := server.MysqlDB.RobotVersionSearchByNew(context.Background(), valueIdRobot)
	if err != nil {
		config.MyLogger.Errorf("RobotVersionSearchByNew error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	} else {
		config.MyLogger.Debugf("robotversion: %v", robotversion)
	}

	c.JSON(http.StatusOK, gin.H{
		"robotstatus":  robotstatus,
		"robotversion": robotversion,
	},
	)
}

// @Summary 根据机器人id获取机器人的详情
func RobotInfo(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		config.MyLogger.Errorf("Key not found: 'id_robot':%v", valueIdRobot)
	}
	result, err := server.MysqlDB.RobotInfoSearchByID(context.Background(), valueIdRobot)
	if err != nil {
		config.MyLogger.Errorf("controller.MysqlDB.RobotInfoSearchByID error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		config.MyLogger.Debugf("id_robot[]", valueIdRobot, " Search")
		c.JSON(200, result)
	}
}

// @Summary 根据机器人id获取机器人的详情【特殊请求】
func MyRobot(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		config.MyLogger.Errorf("Key not found: 'id_account'")
	}
	result, err := server.MysqlDB.RobotInfoSearchByID2(context.Background(), valueIdAccount)
	if err != nil {
		config.MyLogger.Errorf("controller.MysqlDB.RobotInfoSearchByID2: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		config.MyLogger.Debugf("id_info: %v", result)
		c.JSON(http.StatusOK, result)
	}
}

// @Summary 根据id查找旗下的全部机器人id,并根据全部机器人id查找机器人传感器信息
func MyRobotSensor(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		config.MyLogger.Error("Key not found: 'id_account'")
	}
	idRobotResults, err := server.MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		config.MyLogger.Errorf("RobotIDSearchByAccount err: %v", err)
	} else {
		config.MyLogger.Debugf("RobotIDSearchByAccount idRobotResults: %v", idRobotResults)
	}
	queryResults, err := server.MysqlDB.RobotSensorSearchByAccount(context.Background(), idRobotResults)

	if err != nil {
		config.MyLogger.Error(config.DbQueryErrorMessage, err)
	}

	config.MyLogger.Debugf("RobotSensor(): %v", queryResults)
	c.JSON(http.StatusOK, queryResults)

}

func MyRobotSensorByDate(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		config.MyLogger.Error("Key not found: 'id_account'")
		return
	}
	begindatevalue := c.Query("begin_date")
	var begindate time.Time
	if begindatevalue == "" {
		config.MyLogger.Error("Key not found: 'begin_date'")
		return
	} else {
		// 将begin_date转换为time.Time
		var err error
		begindate, err = time.Parse("2006-01-02", begindatevalue)
		if err != nil {
			config.MyLogger.Errorf("Error parsing begin_date: %v", err)
		} else {
			config.MyLogger.Debugf("MyRobotSensorByDate() Begin date: %v", begindate)
		}
	}
	enddatevalue := c.Query("end_date")
	var enddate time.Time
	if enddatevalue == "" {
		config.MyLogger.Errorf("Key not found: 'end_date'")
		return
	} else {
		// 将end_date转换为time.Time
		var err error
		enddate, err = time.Parse("2006-01-02", enddatevalue)
		if err != nil {
			config.MyLogger.Errorf("Error parsing end_date: %v", err)
			return
		} else {
			config.MyLogger.Debugf("MyRobotSensorByDate() End date: %v", enddate)
		}
	}
	idRobotResults, err := server.MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		config.MyLogger.Errorf("MyRobotSensorByDate(): %v", err)
		return
	} else {
		config.MyLogger.Debugf("MyRobotSensorByDate(): idRobotResults %v", idRobotResults)
	}
	queryResults, err := server.MysqlDB.RobotSensorSearchByAccountAndBetween(context.Background(), dboutput.RobotSensorSearchByAccountAndBetweenParams{
		IDRobot:                idRobotResults,
		FromCollectionDatetime: begindate,
		ToCollectionDatetime:   enddate,
	})
	config.MyLogger.Debugf("MyRobotSensorByDate(): searched: %v", queryResults)
	c.JSON(http.StatusOK, queryResults)
}

// @Summary 查找id旗下的全部的机器人的current信息
func RobotStatusAll(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		config.MyLogger.Error("Key not found: 'id_account'")
	}
	idRobotResults, err := server.MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		config.MyLogger.Errorf("controller.MysqlDB.RobotIDSearchByAccount %v", err)
	} else {
		config.MyLogger.Debugf("RobotIDSearchByAccount %v", idRobotResults)
	}
	queryResult, err := server.MysqlDB.RobotCurrentAll(context.Background(), idRobotResults)

	config.MyLogger.Debugf("RobotStatusAll(%d)", len(queryResult))
	c.JSON(http.StatusOK, queryResult)
}

func GetCameraOSSUrl(c *gin.Context) {
	filname := c.Query("filename")
	config.MyLogger.Debugf("GetCameraOSSUrl() query file name: %s", filname)
	ossurl := myoss.GetOSSUrl(myoss.OSSClient, filname)
	ossdata := map[string]string{
		"ossurl": ossurl,
	}
	c.JSON(http.StatusOK, ossdata)
}
