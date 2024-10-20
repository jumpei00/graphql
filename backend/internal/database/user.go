package database

import (
	"context"

	"github.com/jumpei00/graphql/backend/internal/domain"
	"github.com/uptrace/bun"
	"golang.org/x/crypto/bcrypt"
)

type userRepository struct {
	handler *PostgreSQLHandler
}

func NewUserRepository(handler *PostgreSQLHandler) *userRepository {
	return &userRepository{
		handler: handler,
	}
}

func (u *userRepository) GetByID(ctx context.Context, id int) (*domain.User, error) {
	var user domain.User
	if err := u.handler.db.NewSelect().Model(&user).Where("id = ?", id).Scan(ctx); err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *userRepository) GetAllByIDs(ctx context.Context, ids []int) ([]*domain.User, error) {
	var users []*domain.User
	if err := u.handler.db.NewSelect().Model(&users).Where("id IN (?)", bun.In(ids)).Scan(ctx); err != nil {
		return nil, err
	}
	return users, nil
}

func (u *userRepository) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user.Password = string(bytes)

	_, err = u.handler.db.NewInsert().Model(user).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userRepository) Update(ctx context.Context, user *domain.User) (*domain.User, error) {
	_, err := u.handler.db.NewUpdate().Model(user).WherePK().Exec(ctx)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u *userRepository) Delete(ctx context.Context, id int) error {
	_, err := u.handler.db.NewDelete().Model(&domain.User{ID: id}).WherePK().Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}
