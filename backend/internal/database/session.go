package database

import (
	"context"
	"crypto/rand"
	"encoding/base32"
	"encoding/json"
	"io"
	"strings"
	"time"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type sessionRepository struct {
	handler *SessionHandler
}

func NewSessionRepository(handler *SessionHandler) *sessionRepository {
	return &sessionRepository{
		handler: handler,
	}
}

func (s *sessionRepository) GetByToken(ctx context.Context, token string) (*domain.Session, error) {
	cmd := s.handler.db.Get(ctx, token)
	if cmd.Err() != nil {
		return nil, cmd.Err()
	}

	j, err := cmd.Bytes()
	if err != nil {
		return nil, err
	}

	var session domain.Session
	if err := json.Unmarshal(j, &session); err != nil {
		return nil, err
	}

	return &session, nil
}

func (s *sessionRepository) Create(ctx context.Context, session *domain.Session) (string, error) {
	b := make([]byte, 64)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return "", err
	}
	token := strings.TrimRight(base32.StdEncoding.EncodeToString(b), "=")

	j, err := json.Marshal(session)
	if err != nil {
		return "", err
	}

	if err := s.handler.db.Set(ctx, token, j, 3600*24*7*time.Second).Err(); err != nil {
		return "", err
	}

	return token, nil
}

func (s *sessionRepository) Delete(ctx context.Context, token string) error {
	return s.handler.db.Del(ctx, token).Err()
}
