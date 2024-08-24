package domain

import "time"

type Session struct {
	UserID    int
	CreatedAt time.Time
}
