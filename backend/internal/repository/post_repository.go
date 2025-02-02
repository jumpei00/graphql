package repository

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
	"github.com/uptrace/bun"
)

type PostRepository interface {
	GetByID(ctx context.Context, id int) (*domain.Post, error)
	GetAll(ctx context.Context) ([]domain.Post, error)
	GetAllByIDs(ctx context.Context, ids []int, relations ...func(*bun.SelectQuery) *bun.SelectQuery) ([]domain.Post, error)
	GetAllByUserID(ctx context.Context, userID int) ([]domain.Post, error)
	Create(ctx context.Context, post *domain.Post) (*domain.Post, error)
	Update(ctx context.Context, post *domain.Post) (*domain.Post, error)
	Delete(ctx context.Context, id int) error
}
