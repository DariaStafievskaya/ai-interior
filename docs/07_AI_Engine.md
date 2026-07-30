# AI Engine

The bot uses OpenAI for interior image generation.

## Provider

- Provider: OpenAI
- API endpoint: `POST https://api.openai.com/v1/images/edits`
- Default model: `gpt-image-1`
- Implementation: `src/services/image-generation/openai.ts`
- Prompt builder: `src/services/image-generation/prompt.ts`

The service sends the user's room photo and a dynamic prompt to OpenAI. The prompt includes the selected room, style, budget, and generation number. The response is parsed from `b64_json` and delivered to Telegram as a PNG file.

## Required environment variables

```env
BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1024x1024
```

## Migration notes

### Old Fal.ai configuration

```env
FAL_KEY=...
FAL_MODEL=...
```

### New OpenAI configuration

```env
OPENAI_API_KEY=...
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1024x1024
```

`FAL_KEY` and `FAL_MODEL` are no longer used by the application. Keep `BOT_TOKEN` unchanged.

## Generation flow

1. User selects room, style, and budget through the FSM.
2. Telegram handler receives the uploaded room photo only in `WAITING_PHOTO`.
3. Telegram service downloads the file into `uploads/` with a generated filename.
4. Interior generation service validates the downloaded file.
5. OpenAI image-generation service sends the image and dynamic prompt to OpenAI.
6. OpenAI returns a base64 PNG image.
7. Photo handler sends the generated image back to the Telegram user.
8. Temporary uploaded files are deleted in a `finally` block.

## Generation limits

One project means one room, one selected style, one selected budget, and one photo. The user can generate up to 3 variants for the same project. The `Еще вариант` button disappears after the third generation; `Новый проект` remains available.
