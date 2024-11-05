package main

import (
	"api/config"
	"api/dboutput"
	_ "api/docs"
	"context"
	"database/sql"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/swaggo/http-swagger"
	"io"
	"log"
	"net/http"
	"time"

	//"github.com/go-playground/validator/v10" // 检查传回的密码格式
	"github.com/jmoiron/sqlx"
)

var jwtKey = []byte("your_secret_key")

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// GenerateJWT 生成 JWT 令牌
func GenerateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // 设置 JWT 的过期时间

	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

// ValidateJWT 验证 JWT 令牌
func ValidateJWT(tokenStr string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, err
	}

	return claims, nil
}

type RobotSensor struct {
	ID                    int             `db:"id"`
	IDRobot               string          `db:"id_robot"`               // 机器人标识
	CollectionDatetime    time.Time       `db:"collection_datetime"`    // 数据的记录时间
	CollectionSF6         sql.NullFloat64 `db:"collection_sf6"`         // 六氟化硫数据
	CollectionHumidity    sql.NullFloat64 `db:"collection_humidity"`    // 湿度数据
	CollectionTemperature sql.NullFloat64 `db:"collection_temperature"` // 温度数据
	CollectionNoise       sql.NullFloat64 `db:"collection_noise"`       // 噪音数据
	CollectionNH          sql.NullFloat64 `db:"collection_nh"`          // 氨气数据
	CollectionSO2         sql.NullFloat64 `db:"collection_so2"`         // 二氧化硫数据
	CollectionIMU         sql.NullString  `db:"collection_imu"`         // 文件路径，IMU数据
	CollectionLidar3D     sql.NullString  `db:"collection_lidar_3d"`    // 文件路径，激光雷达传感器3D点云数据
	CollectionLidar2D     sql.NullString  `db:"collection_lidar_2d"`    // 文件路径，激光雷达传感器2D点云数据
	CollectionRGB         sql.NullString  `db:"collection_rgb"`         // 文件路径，相机RGB图像数据
	CollectionThermal     sql.NullString  `db:"collection_thermal"`     // 文件路径，相机热红外图像数据
	CollectionDepth       sql.NullString  `db:"collection_depth"`       // 文件路径，相机depth图像数据
}
type RobotCurrent struct {
	ID                          int             `db:"id"`                             // 自动递增的主键
	IDRobot                     string          `db:"id_robot"`                       // 机器人标识，ROBOT_INFO的id_robot外键
	CollectionDatetime          time.Time       `db:"collection_datetime"`            // 数据记录时间 (NOW())
	ConnectionSuccessInfo       sql.NullBool    `db:"connection_success_info"`        // 连接成功(1)或失败(0)
	ConnectionCode              sql.NullString  `db:"connection_code"`                // 连接代码
	ConnectionMsg               sql.NullString  `db:"connection_msg"`                 // 连接消息
	VersionNavisboard           sql.NullString  `db:"version_navisboard"`             // NavisBoard版本
	VersionNavisbrain           sql.NullString  `db:"version_navisbrain"`             // NavisBrain版本
	VersionNavisbridge          sql.NullString  `db:"version_navisbridge"`            // NavisBridge版本
	VersionPlatformType         sql.NullString  `db:"version_platform_type"`          // 移动平台类型
	VersionPlatformSoftware     sql.NullString  `db:"version_platform_software"`      // 移动平台软件版本
	VersionPlatformHardware     sql.NullString  `db:"version_platform_hardware"`      // 移动平台硬件
	VersionLidarType            sql.NullString  `db:"version_lidar_type"`             // 激光雷达传感器类型
	VersionLidarSoftware        sql.NullString  `db:"version_lidar_software"`         // 激光雷达传感器版本
	VersionLidarHardware        sql.NullString  `db:"version_lidar_hardware"`         // 激光雷达传感器硬件
	VersionInertiaType          sql.NullString  `db:"version_inertia_type"`           // 惯性传感器型号
	VersionInertiaSoftware      sql.NullString  `db:"version_inertia_software"`       // 惯性传感器软件版本
	VersionInertiaHardware      sql.NullString  `db:"version_inertia_hardware"`       // 惯性传感器硬件
	VersionVisionType           sql.NullString  `db:"version_vision_type"`            // 视觉传感器型号
	VersionVisionSoftware       sql.NullString  `db:"version_vision_software"`        // 视觉传感器软件版本
	VersionVisionHardware       sql.NullString  `db:"version_vision_hardware"`        // 视觉传感器硬件
	VersionComputeType          sql.NullString  `db:"version_compute_type"`           // 核心计算单元型号
	VersionComputeSoftware      sql.NullString  `db:"version_compute_software"`       // 核心计算单元软件版本
	VersionComputeHardware      sql.NullString  `db:"version_compute_hardware"`       // 核心计算单元硬件
	StatusNavigating            sql.NullString  `db:"status_navigating"`              // 导航状态
	StatusNavigatingmap         sql.NullString  `db:"status_navigatingmap"`           // 导航的地图信息
	StatusNavigatingtask        sql.NullString  `db:"status_navigatingtask"`          // 导航的任务信息
	Status2DMApping             sql.NullString  `db:"status_2dmapping"`               // 2D建图状态
	Status2DMap                 sql.NullString  `db:"status_2dmap"`                   // 2D建图的地图信息
	Status3DMApping             sql.NullString  `db:"status_3dmapping"`               // 3D建图状态
	Status3DMap                 sql.NullString  `db:"status_3dmap"`                   // 3D建图的地图信息
	StatusRecording             sql.NullString  `db:"status_recording"`               // 录制状态
	StatusRecordMap             sql.NullString  `db:"status_recordmap"`               // 录制的地图信息
	StatusVelocityLinear        sql.NullFloat64 `db:"status_velocity_linear"`         // 线速度
	StatusVelocityAngular       sql.NullFloat64 `db:"status_velocity_angular"`        // 角速度
	StatusBase                  sql.NullString  `db:"status_base"`                    // 底盘状态
	StatusFaultCode             sql.NullString  `db:"status_faultcode"`               // 底盘错误代码
	StatusControlMode           sql.NullString  `db:"status_controlmode"`             // 底盘控制模式
	StatusBatteryCur            sql.NullFloat64 `db:"status_battery_cur"`             // 电池电流
	StatusBatteryTemp           sql.NullFloat64 `db:"status_battery_temp"`            // 电池温度
	StatusBatteryHealth         sql.NullInt64   `db:"status_battery_health"`          // 电池健康
	StatusBatteryPower          sql.NullInt64   `db:"status_battery_power"`           // 电池电量
	StatusBatteryVol            sql.NullFloat64 `db:"status_battery_vol"`             // 电池电压
	StatusBatteryChargeHour     sql.NullFloat64 `db:"status_battery_chargehour"`      // 电池累计充电小时数
	StatusBatteryIsCharging     sql.NullBool    `db:"status_battery_ischarging"`      // 电池是否正在充电
	StatusBatteryChargeTime     sql.NullInt64   `db:"status_battery_chargetime"`      // 电池充电次数
	StatusBatteryLastChargeHour sql.NullFloat64 `db:"status_battery_last_chargehour"` // 最近一次充电小时数
	StatusSensorIsOpen          sql.NullBool    `db:"status_sensor_isopen"`           // 设备传感器状态
	StatusDiskSpace             sql.NullString  `db:"status_disk_space"`              // 机器人底盘的磁盘空间
}
type PigCurrent struct {
	ID                    int             `db:"id"`                     // 自动递增的主键
	IDPig                 string          `db:"id_pig"`                 // 生猪标识
	IDRobot               string          `db:"id_robot"`               // 机器人标识，ROBOT_INFO的id_robot外键
	CollectionDatetime    time.Time       `db:"collection_datetime"`    // 数据记录时间 (NOW())
	CollectionImgRGB      sql.NullString  `db:"collection_img_rgb"`     // 生猪的可见光图像文件路径
	CollectionImgThermal  sql.NullString  `db:"collection_img_thermal"` // 生猪的热红外图像文件路径
	CollectionTemperature sql.NullFloat64 `db:"collection_temperature"` // 生猪的面部温度，取最高值
	CollectionImgRGBD     sql.NullString  `db:"collection_img_rgbd"`    // 生猪的深度图像文件路径
}

// 保护路由
func jwtMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenStr := r.Header.Get("Authorization")
		if tokenStr == "" {
			http.Error(w, "Authorization token not provided", http.StatusUnauthorized)
			return
		}

		claims, err := ValidateJWT(tokenStr)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// 将用户名存储在请求上下文中，供后续的处理函数使用
		ctx := context.WithValue(r.Context(), "username", claims.Username)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

// @Summary 处理登录请求
func loginHandler(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodPut {
		http.Error(w, "Only PUT method is allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	var webJson map[string]string
	err = json.Unmarshal(body, &webJson)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}
	valueIdAccount, _ := webJson["id_account"]
	valuePwdAccount, _ := webJson["pwd_account"]

	if valueIdAccount == "" || valuePwdAccount == "" {
		http.Error(w, "Missing account or password", http.StatusBadRequest)
		return
	}

	// 验证用户
	result, err := query.AccountSearch(ctx, dboutput.AccountSearchParams{
		IDAccount:  valueIdAccount,
		PwdAccount: valuePwdAccount,
	})
	if err != nil || result.IDAccount == "" {
		http.Error(w, "Invalid account or password", http.StatusUnauthorized)
		return
	}

	// 生成 JWT
	token, err := GenerateJWT(valueIdAccount)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// 返回 JWT 给客户端
	w.Header().Set("Content-Type", "application/json")
	type Response struct {
		Token string      `json:"token"`
		Data  interface{} `json:"data"` // 使用 interface{} 支持多种类型
	}
	json.NewEncoder(w).Encode(Response{token, result})

	// 读取页面put + 鉴别 + 查找 + 返回
	//if r.Method != http.MethodPut {
	//	http.Error(w, "Only PUT method is allowed", http.StatusMethodNotAllowed)
	//}
	//body, err := io.ReadAll(r.Body)
	//if err != nil {
	//	http.Error(w, "Failed to read request body", http.StatusBadRequest)
	//	return
	//}
	//log.Println("/loginHandler: " + string(body))
	//r.Body = io.NopCloser(bytes.NewBuffer(body))

	//err = r.ParseForm() // 之后可用 r.FromValue()
	//if err != nil {
	//	http.Error(w, "Failed to parse form", http.StatusBadRequest)
	//}

	//valueIdAccount := r.FormValue("id_account")
	//valuePwdAccount := r.FormValue("pwd_account")
	//var webJson map[string]string
	//err = json.Unmarshal(body, &webJson)
	//if err != nil {
	//	http.Error(w, "Invalid JSON format", http.StatusBadRequest)
	//	return
	//}
	//valueIdAccount, _ := webJson["id_account"]
	//valuePwdAccount, _ := webJson["pwd_account"]
	//if valueIdAccount == "" {
	//	log.Println("Key not found: 'id_account'")
	//	http.Error(w, "Key not found: 'id_account'", http.StatusBadRequest)
	//	return
	//} else if valuePwdAccount == "" {
	//	log.Println("Key not found: 'pwd_account'")
	//	http.Error(w, "Key not found: 'pwd_account'", http.StatusBadRequest)
	//	return
	//}
	//
	//result, err := query.AccountSearch(ctx, dboutput.AccountSearchParams{
	//	IDAccount:  valueIdAccount,
	//	PwdAccount: valuePwdAccount,
	//})
	//
	//if err != nil {
	//	log.Println(err)
	//	http.Error(w, "Database Server Error", http.StatusInternalServerError)
	//} else {
	//	json.NewEncoder(w).Encode(result) // 测试用
	//	if result.IDAccount != "" && result.PwdAccount != "" {
	//		// 简单的respond用于测试，不应该返回1个以上的json
	//		//response := map[string]string{
	//		//	"success": "true",
	//		//}
	//		w.Header().Set("Content-Type", "application/json")
	//		w.WriteHeader(http.StatusOK)
	//		//json.NewEncoder(w).Encode(response)
	//	} else {
	//		w.Header().Set("Content-Type", "application/json")
	//		http.Error(w, "Account not found", http.StatusNoContent)
	//	}
	//}
}

// @Summary 根据id查找名下的机器人id[]
func accountRobot(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotIDSearchByAccount(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_account", valueIdAccount, " Search robot")
		json.NewEncoder(w).Encode(result)
	}
}

// @Summary 根据机器人id获取一个机器人current
func robotCurrent(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
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

	urlquery := r.URL.Query()
	valueIdRobot := urlquery.Get("id_robot")
	if valueIdRobot == "" {
		log.Println("Key not found: 'id_robot'")
	}
	result, err := query.RobotCurrentSearchByNew(ctx, valueIdRobot)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_robot", valueIdRobot, " Search")
		json.NewEncoder(w).Encode(result)
	}
}

// @Summary 根据机器人id获取机器人的详情
func robotInfo(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdRobot := urlquery.Get("id_robot")
	if valueIdRobot == "" {
		log.Println("Key not found: 'id_robot'")
	}
	result, err := query.RobotInfoSearchByID(ctx, valueIdRobot)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_robot[]", valueIdRobot, " Search")
		json.NewEncoder(w).Encode(result)
	}
}

// @Summary 根据机器人id获取机器人的详情【特殊请求】
func myRobot(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotInfoSearchByID2(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_info []", valueIdAccount, " Search")
		json.NewEncoder(w).Encode(result)
	}
}

// @Summary 根据id查找旗下的全部机器人id,并根据全部机器人id查找机器人传感器信息
func myRobotSensor(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries, sqlxdb *sqlx.DB) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotIDSearchByAccount(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("result", result, " Search")
	}

	sqlxquery, args, err := sqlx.In("SELECT * FROM robot_sensor WHERE id_robot IN (?);", result)
	if err != nil {
		log.Println("sqlxquery", err)
	}
	sqlxquery = sqlxdb.Rebind(sqlxquery)
	var robotSensor []RobotSensor
	err = sqlxdb.SelectContext(context.Background(), &robotSensor, sqlxquery, args...)
	if err != nil {
		log.Println("SelectContext", err)
	} else {
		log.Println("myRobotSensor")
		json.NewEncoder(w).Encode(robotSensor)
	}
}

// @Summary 查找id旗下的全部的机器人的current信息
func robotCurrentAll(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries, sqlxdb *sqlx.DB) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotIDSearchByAccount(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("result", result, " Search")
	}
	sqlxquery, args, err := sqlx.In("SELECT * FROM robot_current WHERE id_robot IN (?);", result)
	if err != nil {
		log.Println("sqlxquery", err)
	}
	sqlxquery = sqlxdb.Rebind(sqlxquery)
	var robotcurrent []RobotCurrent
	err = sqlxdb.SelectContext(context.Background(), &robotcurrent, sqlxquery, args...)
	if err != nil {
		log.Println("SelectContext", err)
	} else {
		log.Println("robotCurrentAll")
		json.NewEncoder(w).Encode(robotcurrent)
	}
}

// @Summary 查找旗下全部机器人的对应猪脸信息
func pigFaceAll(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries, sqlxdb *sqlx.DB) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdAccount := urlquery.Get("id_account")
	if valueIdAccount == "" {
		log.Println("Key not found: 'id_account'")
	}
	result, err := query.RobotIDSearchByAccount(ctx, valueIdAccount)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("result", result, " Search")
	}
	sqlxquery, args, err := sqlx.In("SELECT * FROM pig_current WHERE id_robot IN (?);", result)
	if err != nil {
		log.Println("sqlxquery", err)
	}
	sqlxquery = sqlxdb.Rebind(sqlxquery)
	var pigcurrent []PigCurrent
	err = sqlxdb.SelectContext(context.Background(), &pigcurrent, sqlxquery, args...)
	if err != nil {
		log.Println("SelectContext", err)
	} else {
		log.Println("pigcurrent")
		json.NewEncoder(w).Encode(pigcurrent)
	}
}

// @Summary 为了大屏展示列出最近的6条传感器信息
func myrobotSensorScreen(w http.ResponseWriter, r *http.Request, ctx context.Context, query *dboutput.Queries) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
	}
	urlquery := r.URL.Query()
	valueIdRobot := urlquery.Get("id_robot")
	if valueIdRobot == "" {
		log.Println("Key not found: 'id_robot'")
	}
	result, err := query.RobotSensorSearchByAccountScreen(ctx, valueIdRobot)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database Server Error", http.StatusInternalServerError)
	} else {
		log.Println("id_robot sensor 6[]", valueIdRobot, " Search")
		json.NewEncoder(w).Encode(result)
	}
}
func main() {
	ctx := context.Background()
	connectedDatabase, err := sql.Open("mysql", config.DBconfig_user+config.DBconfig_password+config.DBconfig_url+config.DBconfig_dbname+"?parseTime=true")
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("sql DB connected")
	}
	sqlxdb, dberr := sqlx.Open("mysql", config.DBconfig_user+config.DBconfig_password+config.DBconfig_url+config.DBconfig_dbname+"?parseTime=true")
	if dberr != nil {
		log.Println(dberr)
	} else {
		log.Println("sqlx DB opened")
	}
	query := dboutput.New(connectedDatabase)
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, ctx, query)
	})
	http.HandleFunc("/accountrobot", func(w http.ResponseWriter, r *http.Request) {
		accountRobot(w, r, ctx, query)
	})
	http.HandleFunc("/robotcurrent", func(w http.ResponseWriter, r *http.Request) {
		robotCurrent(w, r, ctx, query)
	})
	http.HandleFunc("/robotinfo", func(w http.ResponseWriter, r *http.Request) {
		robotInfo(w, r, ctx, query)
	})
	http.HandleFunc("/myrobot", func(w http.ResponseWriter, r *http.Request) {
		myRobot(w, r, ctx, query)
	})
	http.HandleFunc("/myrobotsensor", func(w http.ResponseWriter, r *http.Request) {
		myRobotSensor(w, r, ctx, query, sqlxdb)
	})
	http.HandleFunc("/myrobotsensorscreen", func(w http.ResponseWriter, r *http.Request) {
		myrobotSensorScreen(w, r, ctx, query)
	})
	http.HandleFunc("/robotcurrentall", jwtMiddleware(func(w http.ResponseWriter, r *http.Request) {
		robotCurrentAll(w, r, ctx, query, sqlxdb)
	}))
	http.HandleFunc("/pigfaceall", func(w http.ResponseWriter, r *http.Request) {
		pigFaceAll(w, r, ctx, query, sqlxdb)
	})
	http.HandleFunc("/doc/", httpSwagger.WrapHandler)
	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
