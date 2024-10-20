package resolver

import (
	"context"

	"github.com/graph-gophers/dataloader/v7"
	"github.com/jumpei00/graphql/backend/internal/domain"
	"github.com/jumpei00/graphql/backend/internal/graph/model"
	"github.com/jumpei00/graphql/backend/internal/repository"
)

type Loaders struct {
	CommentLoader dataloader.Interface[int, []*model.Comment]
	LikeLoader    dataloader.Interface[int, []*model.Like]
	UserLoader    dataloader.Interface[int, *model.User]
}

func NewLoaders(postRepository repository.PostRepository, userRepository repository.UserRepository) *Loaders {
	return &Loaders{
		CommentLoader: newCommentLoader(postRepository),
		LikeLoader:    newLikeLoader(postRepository),
		UserLoader:    newUserLoader(userRepository),
	}
}

type commentLoader struct {
	postRepository repository.PostRepository
}

func newCommentLoader(postRepository repository.PostRepository) *dataloader.Loader[int, []*model.Comment] {
	loader := commentLoader{
		postRepository: postRepository,
	}
	return dataloader.NewBatchedLoader(loader.batchFunc(), dataloader.WithClearCacheOnBatch[int, []*model.Comment]())
}

func (c *commentLoader) batchFunc() dataloader.BatchFunc[int, []*model.Comment] {
	return func(ctx context.Context, postIDs []int) []*dataloader.Result[[]*model.Comment] {
		postArrange := make(map[int]int)
		for i, postID := range postIDs {
			postArrange[postID] = i
		}

		posts, err := c.postRepository.GetAllByIDs(ctx, postIDs, domain.WithComments)
		if err != nil {
			return nil
		}

		results := make([]*dataloader.Result[[]*model.Comment], len(postIDs))
		for _, post := range posts {
			comments := make([]*model.Comment, 0, len(post.Comments))
			for _, comment := range post.Comments {
				comments = append(comments, &model.Comment{
					ID:        comment.ID,
					Content:   comment.Content,
					CreatedAt: comment.CreatedAt,
					UpdatedAt: comment.UpdatedAt,
					UserID:    comment.UserID,
					PostID:    comment.PostID,
				})
			}
			results[postArrange[post.ID]] = &dataloader.Result[[]*model.Comment]{
				Data:  comments,
				Error: nil,
			}
		}

		return results
	}
}

type likeLoader struct {
	postRepository repository.PostRepository
}

func newLikeLoader(postRepository repository.PostRepository) *dataloader.Loader[int, []*model.Like] {
	loader := likeLoader{
		postRepository: postRepository,
	}
	return dataloader.NewBatchedLoader(loader.batchFunc(), dataloader.WithClearCacheOnBatch[int, []*model.Like]())
}

func (l *likeLoader) batchFunc() dataloader.BatchFunc[int, []*model.Like] {
	return func(ctx context.Context, postIDs []int) []*dataloader.Result[[]*model.Like] {
		postArrange := make(map[int]int)
		for i, postID := range postIDs {
			postArrange[postID] = i
		}

		posts, err := l.postRepository.GetAllByIDs(ctx, postIDs, domain.WithLikes)
		if err != nil {
			return nil
		}

		results := make([]*dataloader.Result[[]*model.Like], len(postIDs))
		for _, post := range posts {
			likes := make([]*model.Like, 0, len(post.Likes))
			for _, like := range post.Likes {
				likes = append(likes, &model.Like{
					ID:        like.ID,
					UserID:    like.UserID,
					PostID:    like.PostID,
					CreatedAt: like.CreatedAt,
				})
			}
			results[postArrange[post.ID]] = &dataloader.Result[[]*model.Like]{
				Data:  likes,
				Error: nil,
			}
		}

		return results
	}
}

type userLoader struct {
	userRepository repository.UserRepository
}

func newUserLoader(userRepository repository.UserRepository) *dataloader.Loader[int, *model.User] {
	loader := userLoader{
		userRepository: userRepository,
	}
	return dataloader.NewBatchedLoader(loader.batchFunc())
}

func (u *userLoader) batchFunc() dataloader.BatchFunc[int, *model.User] {
	return func(ctx context.Context, userIDs []int) []*dataloader.Result[*model.User] {
		users, err := u.userRepository.GetAllByIDs(ctx, userIDs)
		if err != nil {
			return nil
		}

		results := make([]*dataloader.Result[*model.User], 0, len(users))
		for _, user := range users {
			results = append(results, &dataloader.Result[*model.User]{
				Data: &model.User{
					ID:          user.ID,
					Username:    user.Username,
					Mailaddress: user.Mailaddress,
					CreatedAt:   user.CreatedAt,
					UpdatedAt:   user.UpdatedAt,
				},
				Error: nil,
			})
		}

		return results
	}
}
