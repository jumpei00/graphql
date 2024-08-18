package repository

import "github.com/jumpei00/graphql/backend/internal/domain"

type CommentRepository interface {
	GetAllByPostID(postID int) ([]domain.Comment, error)
	Create(comment *domain.Comment) error
}
