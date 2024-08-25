package database

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type likeRepository struct {
	handler *PostgreSQLHandler
}

func NewLikeRepository(handler *PostgreSQLHandler) *likeRepository {
	return &likeRepository{
		handler: handler,
	}
}

func (l *likeRepository) GetAllByPostID(ctx context.Context, postID int) ([]domain.Like, error) {
	var likes []domain.Like
	if err := l.handler.db.NewSelect().Model(&likes).Where("post_id = ?", postID).Scan(ctx); err != nil {
		return nil, err
	}
	return likes, nil
}

func (l *likeRepository) GetAllByUserID(ctx context.Context, userID int) ([]domain.Like, error) {
	var likes []domain.Like
	if err := l.handler.db.NewSelect().Model(&likes).Where("user_id = ?", userID).Scan(ctx); err != nil {
		return nil, err
	}
	return likes, nil
}

func (l *likeRepository) Create(ctx context.Context, like *domain.Like) (*domain.Like, error) {
	_, err := l.handler.db.NewInsert().Model(like).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return like, nil
}

func (l *likeRepository) Delete(ctx context.Context, id int) error {
	_, err := l.handler.db.NewDelete().Model(&domain.Like{ID: id}).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}
