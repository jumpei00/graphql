package database

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
)

type commentRepository struct {
	handler *PostgreSQLHandler
}

func NewCommentRepository(handler *PostgreSQLHandler) *commentRepository {
	return &commentRepository{
		handler: handler,
	}
}

func (c *commentRepository) GetAllByPostID(ctx context.Context, postID int) ([]domain.Comment, error) {
	var comments []domain.Comment
	if err := c.handler.db.NewSelect().Model(&comments).Where("post_id = ?", postID).Scan(ctx); err != nil {
		return nil, err
	}
	return comments, nil
}

func (c *commentRepository) GetAllByUserID(ctx context.Context, userID int) ([]domain.Comment, error) {
	var comments []domain.Comment
	if err := c.handler.db.NewSelect().Model(&comments).Where("user_id = ?", userID).Scan(ctx); err != nil {
		return nil, err
	}
	return comments, nil
}

func (c *commentRepository) Create(ctx context.Context, comment *domain.Comment) (*domain.Comment, error) {
	res, err := c.handler.db.NewInsert().Model(comment).Exec(ctx)
	if err != nil {
		return nil, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}

	comment.ID = int(id)

	return comment, nil
}
