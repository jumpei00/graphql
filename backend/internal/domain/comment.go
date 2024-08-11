package domain

import (
	"time"

	"github.com/uptrace/bun"
)

type Comment struct {
	bun.BaseModel `bun:"comments,alias:c"`
	ID            int       `bun:"id,pk,autoincrement"`
	UserID        int       `bun:"user_id,notnull"`
	PostID        int       `bun:"post_id,notnull"`
	content       string    `bun:"content,notnull"`
	CreatedAt     time.Time `bun:"created_at,default:current_timestamp"`
	UpdatedAt     time.Time `bun:"updated_at,default:current_timestamp"`
	User          *User     `bun:"rel:belongs-to,join:user_id=id"`
	Post          *Post     `bun:"rel:belongs-to,join:post_id=id"`
}
