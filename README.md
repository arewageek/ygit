# ygit

A CLI tool for scaffolding new projects from git repositories, built with TypeScript, `yargs`, and `degit`.

## Features

- **Project Scaffolding**: Quickly clone templates from GitHub, GitLab, or Bitbucket.
- **Configuration**: Set default preferences for source platforms and usernames.
- **Caching**: Support for caching templates for offline use or faster access.
- **Verbose Mode**: Detailed logging for debugging.

## Installation

Install the package globally via npm:

```bash
npm install -g @arewageek/ygit
```

Or via Bun:

```bash
bun add -g @arewageek/ygit
```

## Usage

After installation, you can access the CLI using the `ygit` command:

```bash
ygit <command> [options]
```

### Commands

#### `clone`

Scaffold a new project at the given destination.

```bash
ygit clone <template> <destination> [options]
```

**Arguments:**

- `template`: The name of the repository template to clone (e.g., `my-repo`).
- `destination`: The folder where the project should be created.

**Options:**

- `--cache`, `-c`: Use cached version of the template (boolean, default: `false`).
- `--force`, `-f`: Force overwrite if the destination already exists (boolean, default: `false`).
- `--verbose`, `-v`: Enable verbose logging (boolean, default: `false`).
- `--src`, `-s`: Source platform (string, default: `github`). Options: `github`, `gitlab`, `bitbucket`.
- `--user`: Username or organization name (string, default: `arewageek`).

**Example:**

```bash
# Clone 'cli-starter' from 'arewageek' on GitHub to 'my-new-app'
ygit clone cli-starter my-new-app

# Clone from a different user on GitLab
ygit clone my-template ./app --src gitlab --user anotheruser
```

#### `config`

Configure global defaults for the CLI (stored using `conf`).

```bash
ygit config <key> <value>
```

**Keys:**

- `src`: Default source platform (e.g., `github`, `gitlab`).
- `user`: Default username or organization.

**Example:**

```bash
# Set default user to 'my-org'
ygit config user my-org

# Set default source to 'gitlab'
ygit config src gitlab
```

## Development

To run the project in development mode with hot reloading:

```bash
npm run dev
```
