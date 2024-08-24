package repository

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type SessionRepository interface {
	GetByToken(ctx context.Context) (domain.Session, error)
	Create(ctx context.Context, session *domain.Session) (token string, err error)
	Delete(ctx context.Context) error
}
