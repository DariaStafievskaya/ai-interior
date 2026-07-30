# DECISIONS.md
# Architecture Decision Log

This document records all significant architectural and technical decisions made during the development of AI Interior.

Each decision is assigned an ID and must never be silently changed.

---

# ADR-001

## Title

Programming Language

## Status

Accepted

## Decision

The entire project is written in TypeScript.

## Reason

- type safety
- maintainability
- scalability
- excellent grammY support

---

# ADR-002

## Title

Telegram Framework

## Status

Accepted

## Decision

Use grammY.

## Reason

- lightweight
- actively maintained
- modern API
- TypeScript-first

---

# ADR-003

## Title

AI Provider

## Status

Accepted

## Decision

Use OpenAI as the image generation provider.

## Reason

- supports image editing from an uploaded room photo
- returns generated image data directly to the bot
- keeps AI provider logic inside the services layer

---

# ADR-004

## Title

Architecture Style

## Status

Accepted

## Decision

Use layered architecture.

Presentation

↓

Handlers

↓

Services

↓

External APIs

## Reason

Clear separation of responsibilities.

---

# ADR-005

## Title

Business Logic

## Status

Accepted

## Decision

Business logic exists only inside Services.

Handlers only coordinate requests.

---

# ADR-006

## Title

Temporary Files

## Status

Accepted

## Decision

Uploaded files are stored temporarily.

Files are deleted immediately after processing.

---

# ADR-007

## Title

Git Strategy

## Status

Accepted

## Decision

One commit = one logical change.

Documentation, refactoring and features are committed separately.

---

# ADR-008

## Title

Documentation

## Status

Accepted

## Decision

Project documentation lives in the repository.

Core documents:

- AGENTS.md
- PROJECT.md
- DECISIONS.md
- TODO.md

---

# ADR-009

## Title

Development Philosophy

## Status

Accepted

## Decision

Implement only what is required for the current stage.

Avoid premature optimization.

---

# ADR-010

## Title

Code Quality

## Status

Accepted

## Decision

Readable code is preferred over clever code.

Every solution should be understandable after several months.

---

# Future Decisions

All new architectural decisions must be added below using the following template.

---

# ADR-XXX

## Title

...

## Status

Proposed / Accepted / Deprecated

## Decision

...

## Reason

...

## Consequences

...