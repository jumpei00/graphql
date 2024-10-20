package domain

import (
	"time"

	"github.com/uptrace/bun"
)

type Post struct {
	bun.BaseModel `bun:"table:posts,alias:p"`
	ID            int        `bun:"id,pk,autoincrement"`
	UserID        int        `bun:"user_id,notnull"`
	Content       string     `bun:"content,notnull"`
	CreatedAt     time.Time  `bun:"created_at,default:current_timestamp"`
	UpdatedAt     time.Time  `bun:"updated_at,default:current_timestamp"`
	User          *User      `bun:"rel:belongs-to,join:user_id=id"`
	Comments      []*Comment `bun:"rel:has-many,join:id=post_id"`
	Likes         []*Like    `bun:"rel:has-many,join:id=post_id"`
}

func WithComments(s *bun.SelectQuery) *bun.SelectQuery {
	return s.Relation("Comments")
}

func WithLikes(s *bun.SelectQuery) *bun.SelectQuery {
	return s.Relation("Likes")
}