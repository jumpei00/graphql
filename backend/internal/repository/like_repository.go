package repository

import "github.com/jumpei00/graphql/backend/internal/domain"

type LikeRepository interface {
	GetAllByPostID(postID int) ([]domain.Like, error)
	Create(like *domain.Like) error
	Delete(id int) error
}
