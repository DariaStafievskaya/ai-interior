# PROJECT.md
# AI Interior
## Project Documentation v1.0

---

# Project Purpose

AI Interior is a Telegram bot that allows users to generate interior design concepts from uploaded room photos using AI models.

The primary goal is to provide a simple, fast and intuitive user experience.

Current MVP flow:

User uploads photo

↓

Bot validates image

↓

Image uploads to Fal.ai

↓

AI generates new interior

↓

Bot returns result

Future versions will support:

- multiple design styles
- generation history
- paid generations
- user accounts
- admin panel
- analytics

---

# Technology Stack

Language

- TypeScript

Runtime

- Node.js

Telegram

- grammY

AI

- Fal.ai

Package Manager

- npm

Version Control

- Git

Hosting

TBD

Database

Not implemented

---

# Current Project Structure

```
ai-interior/

src/
    config/
    handlers/
    keyboards/
    services/

    bot.ts
    index.ts

uploads/

scripts/

docs/

.env
.gitignore
package.json
tsconfig.json
AGENTS.md
PROJECT.md
```

---

# Directory Responsibilities

## src/index.ts

Application entry point.

Responsibilities:

- start application
- initialize configuration
- launch bot

No business logic.

---

## src/bot.ts

Bot initialization.

Responsibilities:

- create bot instance
- register handlers
- start polling

---

## src/config

Stores configuration.

Contains:

- environment variables
- constants
- validation

---

## src/handlers

Telegram update handlers.

Responsibilities:

- receive Telegram updates
- validate input
- call Services
- send replies

Must NOT contain business logic.

---

## src/services

Contains business logic.

Examples:

- Fal.ai
- image processing
- file storage
- generation pipeline

---

## src/keyboards

Contains only keyboard builders.

No business logic.

---

## uploads

Temporary storage.

Rules:

- never permanent
- automatically cleaned
- excluded from Git

---

## scripts

Utility scripts.

Examples:

- testing
- migration
- debugging

Never imported into production code.

---

## docs

Additional documentation.

Architecture

API

Diagrams

Future specifications

---

# Current User Flow

/start

↓

Welcome message

↓

User uploads image

↓

Telegram file download

↓

Temporary storage

↓

Upload to Fal.ai

↓

Receive URL

↓

Generation

↓

Receive generated image

↓

Send result to user

↓

Delete temporary files

---

# Application Layers

Presentation

↓

Handlers

↓

Services

↓

External APIs

↓

Response

Every request follows this direction.

---

# External Services

Telegram Bot API

Purpose:

Communication with users.

---

Fal.ai

Purpose:

Image generation.

---

File System

Purpose:

Temporary image storage.

---

# Environment Variables

Expected variables:

BOT_TOKEN

FAL_KEY

Future variables:

DATABASE_URL

REDIS_URL

PAYMENT_PROVIDER_KEY

ADMIN_CHAT_ID

LOG_LEVEL

---

# Current Limitations

No database

No request queue

No payment system

No user profiles

No admin interface

No logging system

No monitoring

No rate limiting

---

# Planned Architecture

Telegram

↓

Handlers

↓

Services

↓

Repositories (future)

↓

Database (future)

External services remain isolated inside Services.

---

# Error Strategy

Every external operation must:

- use try/catch
- log errors
- return friendly messages

The bot should never terminate because of a user request.

---

# Logging Strategy

Future implementation:

INFO

WARN

ERROR

DEBUG

Secrets must never appear in logs.

---

# Security Principles

Never trust user input.

Validate:

- file size
- mime type
- extension

Never expose:

- API keys
- tokens
- internal errors

---

# Coding Standards

Defined in:

AGENTS.md

PROJECT.md documents the project.

AGENTS.md defines the rules.

---

# Current Development Stage

Stage 1

Telegram MVP

Current priorities:

- stable build
- Fal.ai generation
- clean architecture

---

# Future Roadmap

Stage 2

Interior styles

---

Stage 3

Generation history

---

Stage 4

Database

---

Stage 5

Payments

---

Stage 6

Admin panel

---

Stage 7

Scaling

---

# Documentation Rules

Whenever architecture changes:

Update PROJECT.md.

Whenever folders change:

Update PROJECT.md.

Whenever new external services appear:

Update PROJECT.md.

PROJECT.md must always reflect the actual project state.

It is the single source of truth for the project architecture.