package resolver

import "github.com/jumpei00/graphql/backend/internal/repository"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	sessionRepository repository.SessionRepository
	userRepository    repository.UserRepository
	postRepository    repository.PostRepository
	commentRepository repository.CommentRepository
	likeRepository    repository.LikeRepository
}

func NewResolver(
	sessionRepository repository.SessionRepository,
	userRepository repository.UserRepository,
	postRepository repository.PostRepository,
	commentRepository repository.CommentRepository,
	likeRepository repository.LikeRepository,
) *Resolver {
	return &Resolver{
		sessionRepository: sessionRepository,
		userRepository:    userRepository,
		postRepository:    postRepository,
		commentRepository: commentRepository,
		likeRepository:    likeRepository,
	}
}