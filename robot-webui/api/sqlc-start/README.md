### sqlc 配置

#### 0. 安装 sqlc
> sudo snap install sqlc

#### 1. 填写 sqlc.yaml 配置文件

#### 2. 从数据库中导出表生成的sql文件，放在schema文件，如schema/table.sql

#### 3. 编写查询sql放在query文件夹，如query/table.sql，每条查询格式如：

> \- name: [Functioname] :[many]
> SELECT * FROM table;
> 
> [Functioname]为后续生成的函数名，直接调用该名称

###### [many]是查询的返回类型，可以是：one, many, execresult, exec, 根据返回的量而定，示例：
> \- name: Myselect :many 
> 
> SELECT * FROM table;

#### 4. 在Console中，通过sqlc生成sql查询函数
> sqlc generte
> 
#### 5. 通过"database/sql"库连接数据库，调用生成sql查询函数： [myquery.go](https://github.com/foreverlz1111/commonplace/tree/main/robot-webui/api/sqlc-start/myquery.go)
