# AI Engine

The bot uses OpenAI for interior image generation.

## Provider

- Provider: OpenAI
- API endpoint: `POST https://api.openai.com/v1/images/edits`
- Default model: `gpt-image-1`
- Implementation: `src/services/image-generation/openai.ts`

The service sends the user's room photo as the image input and asks OpenAI to return one redesigned, photorealistic interior image. The response is parsed from `b64_json` and delivered to Telegram as a PNG file.

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

## Flow

1. Telegram handler receives the uploaded room photo.
2. Telegram service downloads the file into `uploads/` with a generated filename.
3. Interior generation service validates the downloaded file.
4. OpenAI image-generation service sends the image and prompt to OpenAI.
5. OpenAI returns a base64 PNG image.
6. Photo handler sends the generated image back to the Telegram user.
7. Temporary uploaded files are deleted in a `finally` block.
