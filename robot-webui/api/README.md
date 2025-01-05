### gin框架 实现页面请求响应 + sqlc、database包和sqlx库 实现数据库操纵 + Swagger 自动文档

1、填写配置文件: common/config.go 

2、启动:
> go run main.go

- net/http包 用法 位于 [_netstart文件夹](https://github.com/foreverlz1111/commonplace/tree/main/robot-webui/api/_netstart)

- sqlc 用法 位于 [_sqlcstart](https://github.com/foreverlz1111/commonplace/tree/main/robot-webui/api/_sqlcstart)

- Swagger 注释用法 如下：

###### 1. @Summary：简短描述 API 的功能。
###### 2. @Description：详细描述 API 的功能。
###### 3. @Tags：用于分类 API（类似于 Swagger 文档中的标签），可以帮助你在 Swagger UI 中按组展示 API。
###### 4. @Accept：指定 API 接受的内容类型，如 json、xml 或 multipart/form-data。
###### 5. @Produce：指定 API 返回的内容类型，如 json 或 xml。
###### 6. @Param：描述请求参数。

> ###### 第一个参数是参数名称。 
> ###### 第二个参数是参数类型（如 query、path、formData 等）。
> ###### 第三个参数是数据类型（如 string、int 等）。
> ###### 第四个参数是 true 或 false，表示此参数是否为必填项。
> ###### 最后是参数的描述。

###### 7. @Success：描述成功时的响应。


> ###### 第一个参数是 HTTP 状态码。
> ###### 第二个参数是返回类型（如 object 或 array）。
> ###### 第三个参数是返回的结构体或数据类型。

8. ###### @Failure：描述失败时的响应，参数与 @Success 类似。

9. ###### @Router：指定请求路径和方法。路径格式和方法都必须匹配实际的路由。

TODO：

1.  "validator" 包 验证输入数据
2.  "token" 包 授权验证