DOCKER ?= docker
IMAGE_NAME ?= startpage
CONTAINER_NAME ?= startpage
DOCKERFILE ?= Dockerfile
BUILD_CONTEXT ?= .
HOST_PORT ?= 8080
CONTAINER_PORT ?= 80
SHELL_COMMAND ?= /bin/sh

.DEFAULT_GOAL := help

.PHONY: help build up run down stop restart logs shell status clean test

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z0-9_-]+:.*## / {printf "%-10s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the image from the root Dockerfile
	$(DOCKER) build -f $(DOCKERFILE) -t $(IMAGE_NAME) $(BUILD_CONTEXT)

up: build ## Recreate and start the container in detached mode
	@$(DOCKER) rm -f $(CONTAINER_NAME) >/dev/null 2>&1 || true
	$(DOCKER) run -d --name $(CONTAINER_NAME) -p $(HOST_PORT):$(CONTAINER_PORT) $(IMAGE_NAME)

run: up ## Alias for up

down: ## Stop and remove the container
	@$(DOCKER) stop $(CONTAINER_NAME) >/dev/null 2>&1 || true
	@$(DOCKER) rm $(CONTAINER_NAME) >/dev/null 2>&1 || true

stop: down ## Alias for down

restart: ## Rebuild and restart the container
	$(MAKE) down
	$(MAKE) up

logs: ## Follow the container logs
	$(DOCKER) logs -f $(CONTAINER_NAME)

shell: ## Open a shell inside the running container
	$(DOCKER) exec -it $(CONTAINER_NAME) $(SHELL_COMMAND)

status: ## Show matching containers
	$(DOCKER) ps -a --filter name=$(CONTAINER_NAME)

clean: down ## Remove the image after stopping the container
	@$(DOCKER) image rm $(IMAGE_NAME) >/dev/null 2>&1 || true

test: ## Verify the Makefile expands to the expected docker commands
	sh tests/test_makefile.sh
