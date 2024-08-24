package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/jumpei00/graphql/backend/internal/domain"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

type PostgreSQLHandler struct {
	db *bun.DB
}

func NewPostgreSQL() (*PostgreSQLHandler, error) {
	dns := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable", 
		os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"), os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	pgDB := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dns)))
	if err := pgDB.Ping(); err != nil {
		return nil, err
	}

	db := bun.NewDB(pgDB, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))

	return &PostgreSQLHandler{db: db}, nil
}

type SessionHandler struct {
	db map[string]*domain.Session
}

func NewSessionHandler() *SessionHandler {
	return &SessionHandler{db: make(map[string]*domain.Session)}
}
