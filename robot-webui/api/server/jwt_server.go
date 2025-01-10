package server

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

var jwtKey = []byte("505")

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

// 保护路由
func JwtMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 从 Header 中获取 Authorization 字段
		tokenStr := c.GetHeader("Authorization")
		if tokenStr == "" || !strings.HasPrefix(tokenStr, "") {
			// 如果没有提供有效的 token，重定向到首页
			c.JSON(http.StatusBadRequest, "no token received")
			return
		}
		// 验证 JWT
		tokenStr = strings.TrimPrefix(tokenStr, "")
		claims, err := ValidateJWT(tokenStr)
		if err != nil {
			// 如果 token 无效，报错
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "token验证失败",
			})
			return
		}

		// 将用户名存储到上下文中
		c.Set("username", claims.Username)
		c.Next()
	}
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
