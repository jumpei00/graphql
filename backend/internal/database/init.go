package database

import (
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

type PostgreSQLHandler struct {
	db *bun.DB
}

func NewPostgreSQL() (*PostgreSQLHandler, error) {
	dns := "postgres://developer:password@localhost:5432/sns?sslmode=disable"

	pgDB := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dns)))
	if err := pgDB.Ping(); err != nil {
		return nil, err
	}

	db := bun.NewDB(pgDB, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))

	return &PostgreSQLHandler{db: db}, nil
}
