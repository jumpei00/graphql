package domain

import (
	"time"

	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`
	ID            int       `bun:"id,pk,autoincrement"`
	Username      string    `bun:"username,notnull,unique"`
	Password      string    `bun:"password,notnull"`
	CreatedAt     time.Time `bun:"created_at,default:current_timestamp"`
	UpdatedAt     time.Time `bun:"updated_at,default:current_timestamp"`
	Posts         []*Post   `bun:"rel:has-many,join:id=user_id"`
}
