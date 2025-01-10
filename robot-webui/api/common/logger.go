package common

import (
	"github.com/sirupsen/logrus"
)

// 初始化全局日志记录器
var MyLogger = logrus.New()

// InitLogger 初始化拉格鲁斯
//
// Usage:
// 增加输出文本的颜色 highlightedErr := "\033[31m" + "text" + "\033[0m"
//
// lagrus.Info(highlightedErr)
func InitLogger() {
	//设置日志的时间戳格式
	MyLogger.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006/01/02 15:04:05",
	})

	//设置日志输出等级
	MyLogger.SetLevel(logrus.DebugLevel)
}
