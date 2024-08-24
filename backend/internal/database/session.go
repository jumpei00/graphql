package database

import (
	"context"
	"crypto/rand"
	"encoding/base32"
	"errors"
	"io"
	"strings"

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
	session, ok := s.handler.db[token]
	if !ok {
		return nil, errors.New("session not found")
	}
	return session, nil
}

func (s *sessionRepository) Create(ctx context.Context, session *domain.Session) (string, error) {
	b := make([]byte, 64)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return "", err
	}
	token := strings.TrimRight(base32.StdEncoding.EncodeToString(b), "=")

	s.handler.db[token] = session

	return token, nil
}

func (s *sessionRepository) Delete(ctx context.Context, token string) error {
	delete(s.handler.db, token)
	return nil
}