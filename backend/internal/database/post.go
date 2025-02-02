package database

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
	"github.com/uptrace/bun"
)

type postRepository struct {
	handler *PostgreSQLHandler
}

func NewPostRepository(handler *PostgreSQLHandler) *postRepository {
	return &postRepository{
		handler: handler,
	}
}

func (p *postRepository) GetByID(ctx context.Context, id int) (*domain.Post, error) {
	var post domain.Post
	if err := p.handler.db.NewSelect().Model(&post).Where("id = ?", id).Scan(ctx); err != nil {
		return nil, err
	}
	return &post, nil
}

func (p *postRepository) GetAll(ctx context.Context) ([]domain.Post, error) {
	var posts []domain.Post
	if err := p.handler.db.NewSelect().Model(&posts).Order("updated_at DESC").Scan(ctx); err != nil {
		return nil, err
	}
	return posts, nil
}

func (p *postRepository) GetAllByIDs(ctx context.Context, ids []int, relations ...func(*bun.SelectQuery) *bun.SelectQuery) ([]domain.Post, error) {
	var posts []domain.Post

	query := p.handler.db.NewSelect().Model(&posts).Where("id IN (?)", bun.In(ids)).Order("updated_at DESC")
	for _, relation := range relations {
		query = relation(query)
	}

	if err := query.Scan(ctx); err != nil {
		return nil, err
	}

	return posts, nil
}

func (p *postRepository) GetAllByUserID(ctx context.Context, userID int) ([]domain.Post, error) {
	var posts []domain.Post
	if err := p.handler.db.NewSelect().Model(&posts).Where("user_id = ?", userID).Scan(ctx); err != nil {
		return nil, err
	}
	return posts, nil
}

func (p *postRepository) Create(ctx context.Context, post *domain.Post) (*domain.Post, error) {
	_, err := p.handler.db.NewInsert().Model(post).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return post, nil
}

func (p *postRepository) Update(ctx context.Context, post *domain.Post) (*domain.Post, error) {
	_, err := p.handler.db.NewUpdate().Model(post).WherePK().Exec(ctx)
	if err != nil {
		return nil, err
	}
	return post, nil
}

func (p *postRepository) Delete(ctx context.Context, id int) error {
	_, err := p.handler.db.NewDelete().Model(&domain.Post{ID: id}).WherePK().Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}
