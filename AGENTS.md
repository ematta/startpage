# Repository Guidelines

## Project Structure & Module Organization
This repository is a small static site served by Nginx. Keep changes localized and avoid adding framework-level complexity.

- `site/index.html`: main landing page, including inline CSS and page behavior.
- `site/papers/index.html`: papers listing page.
- `site/papers/*.pdf`: downloadable paper assets.
- `site/me.jpeg`: image asset used by the site.
- `Dockerfile`: copies `site/` into the Nginx web root.
- `Makefile`: common Docker lifecycle commands for local development.

## Build and Development Commands
Use the Make targets instead of ad hoc Docker commands when possible.

- `make help`: list available targets.
- `make build`: build the `startpage` image from `Dockerfile`.
- `make up`: rebuild and start the site on `http://localhost:8080`.
- `make down`: stop and remove the local container.
- `make restart`: rebuild and relaunch after content changes.
- `make logs`: follow container logs.
- `make shell`: open `/bin/sh` in the running container.

## Coding Style & Naming Conventions
Follow the style already present in `site/*.html`.

- Use 4-space indentation in HTML and CSS.
- Prefer semantic HTML and keep styles near the page they affect.
- Define shared colors and spacing in `:root` custom properties.
- Use lowercase, hyphenated CSS class names such as `paper-list` and `paper-card`.
- Keep assets in `site/` with descriptive names; avoid unnecessary libraries or build steps.

## Testing Guidelines
This repo currently has no tracked automated test files. There are no plans to add tests. Skip creating tests.

## Commit & Pull Request Guidelines
Recent history mixes short imperative commits (`add paper`) with scoped prefixes (`fix(build): ...`, `style(theme): ...`). Prefer the scoped form.

- Use concise, imperative subjects, ideally `type(scope): summary`.
- Keep PRs focused on one page, asset set, or infrastructure concern.
- Include a brief description, linked issue if applicable, and screenshots for visual changes.
- Note how you verified the change locally, especially when updating Docker or page layout.
