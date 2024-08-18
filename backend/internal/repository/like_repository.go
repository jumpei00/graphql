package repository

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type LikeRepository interface {
	GetAllByPostID(ctx context.Context, postID int) ([]domain.Like, error)
	GetAllByUserID(ctx context.Context, userID int) ([]domain.Like, error)
	Create(ctx context.Context, like *domain.Like) (*domain.Like, error)
	Delete(ctx context.Context, id int) error
}
