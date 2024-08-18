package repository

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type UserRepository interface {
	GetByID(ctx context.Context, id int) (*domain.User, error)
	Create(ctx context.Context, user *domain.User) (*domain.User, error)
	Update(ctx context.Context, user *domain.User) (*domain.User, error)
	Delete(ctx context.Context, id int) error
}