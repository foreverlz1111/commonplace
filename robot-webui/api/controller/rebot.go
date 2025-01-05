package controller

import (
	"api/common"
	"api/model"
	"api/myoss"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"net/http"
	"time"
)

// @Summary 根据机器人id获取一个机器人current
func RobotCurrentTable(c *gin.Context) {
	//body, err := io.ReadAll(r.Body)
	//if err != nil {
	//	http.Error(w, "Failed to read request body", http.StatusBadRequest)
	//	return
	//}
	//var webJson map[string]string
	//err = json.Unmarshal(body, &webJson)
	//if err != nil {
	//	http.Error(w, "Invalid JSON format", http.StatusBadRequest)
	//	return
	//}
	//valueIdRobot, _ := webJson["id_robot"]

	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		common.MyLogger.Error("Key not found: 'id_robot'")
	}
	result, err := MysqlDB.RobotCurrentSearchByNew(context.Background(), valueIdRobot)
	if err != nil {
		common.MyLogger.Errorf("RobotCurrentSearchByNew error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		common.MyLogger.Errorf("id_robot: %v", valueIdRobot)
		c.JSON(http.StatusOK, result)
	}
}

// @Summary 根据机器人id获取机器人的详情
func RobotInfo(c *gin.Context) {
	valueIdRobot := c.Query("id_robot")
	if valueIdRobot == "" {
		common.MyLogger.Errorf("Key not found: 'id_robot':%v", valueIdRobot)
	}
	result, err := MysqlDB.RobotInfoSearchByID(context.Background(), valueIdRobot)
	if err != nil {
		common.MyLogger.Errorf("controller.MysqlDB.RobotInfoSearchByID error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		common.MyLogger.Debugf("id_robot[]", valueIdRobot, " Search")
		c.JSON(200, result)
	}
}

// @Summary 根据机器人id获取机器人的详情【特殊请求】
func MyRobot(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Errorf("Key not found: 'id_account'")
	}
	result, err := MysqlDB.RobotInfoSearchByID2(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Errorf("controller.MysqlDB.RobotInfoSearchByID2: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		common.MyLogger.Debugf("id_info: %v", result)
		c.JSON(http.StatusOK, result)
	}
}

// @Summary 根据id查找旗下的全部机器人id,并根据全部机器人id查找机器人传感器信息
func MyRobotSensor(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Error("Key not found: 'id_account'")
	}
	result, err := MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Errorf("RobotIDSearchByAccount err: %v", err)
	} else {
		common.MyLogger.Debugf("RobotIDSearchByAccount result: %v", result)
	}

	sqlxquery, args, err := sqlx.In("SELECT * FROM robot_sensor WHERE id_robot IN (?) ORDER BY `collection_datetime` DESC;", result)
	if err != nil {
		common.MyLogger.Errorf("sqlxquery: ", err)
	}
	sqlxquery = SqlxDB.Rebind(sqlxquery)
	var robotSensor []model.RobotSensorStruct
	err = SqlxDB.SelectContext(context.Background(), &robotSensor, sqlxquery, args...)
	if err != nil {
		common.MyLogger.Errorf("SelectContext: %v", err)
	} else {
		common.MyLogger.Debugf("RobotSensor(): %v", robotSensor)
		c.JSON(http.StatusOK, robotSensor)
	}
}

func MyRobotSensorByDate(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Error("Key not found: 'id_account'")
		return
	}
	begindatevalue := c.Query("begin_date")
	var begindate time.Time
	if begindatevalue == "" {
		common.MyLogger.Error("Key not found: 'begin_date'")
		return
	} else {
		// 将begin_date转换为time.Time
		var err error
		begindate, err = time.Parse("2006-01-02", begindatevalue)
		if err != nil {
			common.MyLogger.Errorf("Error parsing begin_date: %v", err)
		} else {
			common.MyLogger.Debugf("MyRobotSensorByDate() Begin date: %v", begindate)
		}
	}
	enddatevalue := c.Query("end_date")
	var enddate time.Time
	if enddatevalue == "" {
		common.MyLogger.Errorf("Key not found: 'end_date'")
		return
	} else {
		// 将end_date转换为time.Time
		var err error
		enddate, err = time.Parse("2006-01-02", enddatevalue)
		if err != nil {
			common.MyLogger.Errorf("Error parsing end_date: %v", err)
			return
		} else {
			common.MyLogger.Debugf("MyRobotSensorByDate() End date: %v", enddate)
		}
	}
	result, err := MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Errorf("MyRobotSensorByDate(): %v", err)
		return
	} else {
		common.MyLogger.Debugf("MyRobotSensorByDate(): result %v", result)
	}
	beginDateFormatted := begindate.Format("2006-01-02 15:04:05")
	endDateFormatted := enddate.Format("2006-01-02 15:04:05")
	sqlxquery, args, err := sqlx.In("SELECT * FROM robot_sensor WHERE id_robot IN (?) AND collection_datetime BETWEEN (?) AND (?) ORDER BY `collection_datetime` DESC;", result, beginDateFormatted, endDateFormatted)
	if err != nil {
		common.MyLogger.Errorf("MyRobotSensorByDate(): sqlx error %v", err)
		return
	}

	sqlxquery = SqlxDB.Rebind(sqlxquery)
	var robotSensor []model.RobotSensorStruct
	err = SqlxDB.SelectContext(context.Background(), &robotSensor, sqlxquery, args...)
	if err != nil {
		common.MyLogger.Errorf("MyRobotSensorByDate(): sqlx error %v", err)
		return
	} else {
		common.MyLogger.Debugf("MyRobotSensorByDate(): searched: %v", robotSensor)
		c.JSON(http.StatusOK, robotSensor)
	}
}

// @Summary 查找id旗下的全部的机器人的current信息
func RobotCurrentAll(c *gin.Context) {
	valueIdAccount := c.Query("id_account")
	if valueIdAccount == "" {
		common.MyLogger.Error("Key not found: 'id_account'")
	}
	result, err := MysqlDB.RobotIDSearchByAccount(context.Background(), valueIdAccount)
	if err != nil {
		common.MyLogger.Errorf("controller.MysqlDB.RobotIDSearchByAccount %v", err)
	} else {
		common.MyLogger.Debugf("RobotIDSearchByAccount %v", result)
	}
	sqlxquery, args, err := sqlx.In("SELECT * FROM robot_current WHERE id_robot IN (?);", result)
	if err != nil {
		common.MyLogger.Errorf("sqlxquery", err)
	}
	sqlxquery = SqlxDB.Rebind(sqlxquery)
	var robotcurrent []model.RobotCurrentStruct
	err = SqlxDB.SelectContext(context.Background(), &robotcurrent, sqlxquery, args...)
	if err != nil {
		common.MyLogger.Errorf("SelectContext", err)
	} else {
		common.MyLogger.Debugf("RobotCurrentAll %v", robotcurrent)
		c.JSON(http.StatusOK, robotcurrent)
	}
}

func GetCameraOSSUrl(c *gin.Context) {
	filname := c.Query("filename")
	common.MyLogger.Debugf("GetCameraOSSUrl() query file name: %s", filname)
	ossurl := myoss.GetOSSUrl(myoss.OSSClient, filname)
	ossdata := map[string]string{
		"ossurl": ossurl,
	}
	c.JSON(http.StatusOK, ossdata)
}
