package repository

import "github.com/jumpei00/graphql/backend/internal/domain"

type PostRepository interface {
	GetByID(id int) (*domain.Post, error)
	GetAll() ([]domain.Post, error)
	Create(post *domain.Post) error
	Update(post *domain.Post) error
	Delete(id int) error
}
