package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/jumpei00/graphql/backend/internal/database"
	"github.com/jumpei00/graphql/backend/internal/graph"
	"github.com/jumpei00/graphql/backend/internal/graph/middleware"
	"github.com/jumpei00/graphql/backend/internal/graph/resolver"
	"github.com/rs/cors"
)

func main() {
	postgresDB, err := database.NewPostgreSQL()
	if err != nil {
		log.Fatal(err)
	}
	sessionDB := database.NewSessionHandler()

	userRepository := database.NewUserRepository(postgresDB)
	postRepository := database.NewPostRepository(postgresDB)
	commentRepository := database.NewCommentRepository(postgresDB)
	likeRepository := database.NewLikeRepository(postgresDB)
	sessionRepository := database.NewSessionRepository(sessionDB)

	newResolver := resolver.NewResolver(sessionRepository, userRepository, postRepository, commentRepository, likeRepository)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: newResolver,
		Directives: graph.DirectiveRoot{
			IsAuthenticated: resolver.NewAuthenticator(sessionRepository),
		},
	}))
	srv.Use(extension.FixedComplexityLimit(10))

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
	}).Handler

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsHandler(middleware.AuthenticationMiddleware(srv)))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", "8080")
	log.Fatal(http.ListenAndServe(":"+"8080", nil))
}
