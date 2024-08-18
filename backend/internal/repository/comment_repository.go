package repository

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type CommentRepository interface {
	GetAllByPostID(ctx context.Context, postID int) ([]domain.Comment, error)
	Create(ctx context.Context, comment *domain.Comment) error
}
