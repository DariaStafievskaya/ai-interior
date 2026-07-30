# State Machine

The bot uses an in-memory FSM for one active project per Telegram user.

## States

- `START`
- `SELECT_ROOM`
- `SELECT_STYLE`
- `SELECT_BUDGET`
- `WAITING_PHOTO`
- `GENERATING`
- `RESULT`

## Session model

Each user session stores:

- `userId`
- `roomType`
- `style`
- `budget`
- `photoFileId`
- `generationCount`
- `projectId`
- `state`

The current implementation stores sessions in memory. Restarting the bot clears active sessions. Persistent sessions can be added later when the database stage is implemented.

## User flow

1. `/start` creates a new project and moves the user to `SELECT_ROOM`.
2. The user selects a room and moves to `SELECT_STYLE`.
3. The user selects a style and moves to `SELECT_BUDGET`.
4. The user selects a budget and moves to `WAITING_PHOTO`.
5. The bot asks: `Теперь отправьте фотографию комнаты.`
6. `photo.ts` accepts a photo only in `WAITING_PHOTO`, stores `photoFileId`, and moves the user to `GENERATING`.
7. The generation service downloads the same Telegram photo and sends it to OpenAI.
8. A successful generation increments `generationCount` and moves the user to `RESULT`.
9. In `RESULT`, the user can request `Еще вариант` while `generationCount < 3`.
10. After the third generation, only `Новый проект` remains.
11. `Новый проект` clears the current session by creating a fresh project and starts again from room selection.
