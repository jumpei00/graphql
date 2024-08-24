package database

import (
	"crypto/rand"
	"encoding/base32"
	"errors"
	"io"
	"strings"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type sessionRepository struct {
	hander *SessionHandler
}

func NewSessionRepository() *sessionRepository {
	return &sessionRepository{
		hander: NewSessionHandler(),
	}
}

func (s *sessionRepository) GetByToken(token string) (*domain.Session, error) {
	session, ok := s.hander.db[token]
	if !ok {
		return nil, errors.New("session not found")
	}
	return session, nil
}

func (s *sessionRepository) Create(session *domain.Session) (string, error) {
	b := make([]byte, 64)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return "", err
	}
	token := strings.TrimRight(base32.StdEncoding.EncodeToString(b), "=")

	s.hander.db[token] = session

	return token, nil
}

func (s *sessionRepository) Delete(token string) error {
	delete(s.hander.db, token)
	return nil
}