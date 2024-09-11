package domain

import "time"

type Session struct {
	UserID    int       `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}
