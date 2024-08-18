package repository

import "github.com/jumpei00/graphql/backend/internal/domain"

type UserRepository interface {
	GetByID(id int) (*domain.User, error)
	Create(user *domain.User) error
	Update(user *domain.User) error
	Delete(id int) error
}