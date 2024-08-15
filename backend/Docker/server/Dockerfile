# syntax=docker/dockerfile:1

# Base image
FROM golang:1.23.0 AS base

WORKDIR /backend

# RUN --mount=type=cache,target=/go/pkg/mod \
# 	--mount=type=bind,source=go.mod,target=go.mod \
# 	go mod download

RUN --mount=type=bind,source=.,target=. \
	go mod download

RUN go install github.com/air-verse/air@latest

EXPOSE 8080

CMD [ "air" ]

# Build
# FROM base AS build

# RUN --mount=type=cache,target=/go/pkg/mod \
# 	--mount=type=bind,source=.,target=. \
# 	go build -o /bin/server ./cmd/main.go

# Final
# FROM debian:bookworm-slim AS final

# COPY --from=build /bin/server /bin/server
# COPY --from=base /go/bin/air /bin/air

# EXPOSE 8080

# CMD [ "air" ]