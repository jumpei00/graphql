package model

import "time"

type User struct {
	ID          int       `json:"id"`
	Username    string    `json:"username"`
	Mailaddress string    `json:"mailaddress"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type Post struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	UserID    int       `json:"user_id"`
}

type Comment struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	UserID    int       `json:"user_id"`
	PostID    int       `json:"post_id"`
}

type Like struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UserID    int       `json:"user_id"`
	PostID    int       `json:"post_id"`
}
