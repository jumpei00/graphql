package domain

import (
	"time"

	"github.com/uptrace/bun"
)

type Like struct {
	bun.BaseModel `bun:"likes,alias:l"`
	ID            int       `bun:"id,pk,autoincrement"`
	UserID        int       `bun:"user_id,notnull"`
	PostID        int       `bun:"post_id,notnull"`
	CreatedAt     time.Time `bun:"created_at,default:current_timestamp"`
}
