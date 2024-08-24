package middleware

import (
	"context"
	"net/http"
)

type ResponseWriter string
type Session string

const (
	SessionKey        Session        = "graphql_sns_session_key"
	ResponseWriterKey ResponseWriter = "graphql_sns_response_writer_key"
)

func AuthenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := r.Cookie("graphql_sns_token")
		if err != nil || token == nil {
			ctx := context.WithValue(r.Context(), ResponseWriterKey, w)
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}
		ctx := context.WithValue(r.Context(), SessionKey, token.Value)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
