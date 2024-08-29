package main

import (
	"api/myquery"
	"context"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

func run() error {
	ctx := context.Background()

	db, err := sql.Open("mysql", DBconfig_user+DBconfig_password+DBconfig_url+DBconfig_dbname+"?parseTime=true")
	if err != nil {
		return err
	}

	queries := myquery.New(db)

	testconnect, err := queries.Testconnect(ctx)
	if err != nil {
		return err
	}
	log.Println(testconnect)

	result, err := queries.AddLine(ctx, myquery.AddLineParams{
		MyrowUser:   sql.NullString{String: "Pyrus", Valid: true},
		MyrowNumber: sql.NullInt16{Int16: 1, Valid: true},
	})
	if err != nil {
		return err
	} else {
		log.Println(result)
	}

	err = queries.DeleteLine(ctx, sql.NullString{String: "Pyrus", Valid: true})
	if err != nil {
		return err
	} else {
		log.Println("Deleted!")
	}

	return nil
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
