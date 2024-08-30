package resolver

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/jumpei00/graphql/backend/internal/graph/middleware"
	"github.com/jumpei00/graphql/backend/internal/repository"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type userID string

const UserID userID = "graphql_sns_user_id"

func NewAuthenticator(sessionRepository repository.SessionRepository) func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	return func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
		token := ctx.Value(middleware.SessionKey)
		if token == nil {
			return nil, gqlerror.Errorf("unauthentication")
		}
		session, err := sessionRepository.GetByToken(ctx, token.(string))
		if err != nil {
			graphql.AddError(ctx, err)
			return nil, gqlerror.Errorf("unauthentication")
		}
		return next(context.WithValue(ctx, UserID, session.UserID))
	}
}
