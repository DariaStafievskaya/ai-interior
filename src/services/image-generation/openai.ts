import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { config } from "../../config";

const OPENAI_IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";
const OPENAI_REQUEST_TIMEOUT_MS = 120_000;
const IMAGE_MIME_TYPE = "image/jpeg";

export type GeneratedImage = {
  readonly buffer: Buffer;
  readonly mimeType: "image/png";
  readonly fileName: string;
};

type OpenAIImageEditResponse = {
  readonly data?: readonly OpenAIImageData[];
  readonly error?: OpenAIApiError;
};

type OpenAIImageData = {
  readonly b64_json?: string;
  readonly url?: string;
};

type OpenAIApiError = {
  readonly message?: string;
  readonly type?: string;
  readonly code?: string;
};

export async function generateInterior(imagePath: string): Promise<GeneratedImage> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_REQUEST_TIMEOUT_MS);

  try {
    const requestBody = await createImageEditRequestBody(imagePath);

    const response = await fetch(OPENAI_IMAGE_EDIT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openaiApiKey}`,
      },
      body: requestBody,
      signal: controller.signal,
    });

    const responseBody = await parseOpenAIResponse(response);

    if (!response.ok) {
      throw createOpenAIError(response.status, responseBody.error);
    }

    return parseGeneratedImage(responseBody);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("OpenAI не успел сгенерировать изображение. Попробуйте позже.", {
        cause: error,
      });
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function createImageEditRequestBody(imagePath: string): Promise<FormData> {
  const imageBuffer = await readFile(imagePath);
  const formData = new FormData();
  const imageBlob = new Blob([imageBuffer], { type: IMAGE_MIME_TYPE });

  formData.append("model", config.openaiImageModel);
  formData.append("image", imageBlob, basename(imagePath));
  formData.append("prompt", createInteriorPrompt());
  formData.append("size", config.openaiImageSize);
  formData.append("n", "1");

  return formData;
}

function createInteriorPrompt(): string {
  return [
    "Redesign the uploaded room photo into a realistic modern interior.",
    "Keep the original room layout, camera angle, windows, walls, and permanent architectural features.",
    "Improve furniture, lighting, colors, decor, and materials.",
    "Return a polished photorealistic interior design image without text or watermarks.",
  ].join(" ");
}

async function parseOpenAIResponse(response: Response): Promise<OpenAIImageEditResponse> {
  const rawBody = await response.text();

  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody) as OpenAIImageEditResponse;
  } catch (error) {
    throw new Error("OpenAI вернул ответ в неизвестном формате.", {
      cause: error,
    });
  }
}

function parseGeneratedImage(responseBody: OpenAIImageEditResponse): GeneratedImage {
  const firstImage = responseBody.data?.[0];

  if (!firstImage?.b64_json) {
    throw new Error("OpenAI не вернул сгенерированное изображение.");
  }

  return {
    buffer: Buffer.from(firstImage.b64_json, "base64"),
    mimeType: "image/png",
    fileName: "ai-interior.png",
  };
}

function createOpenAIError(status: number, apiError: OpenAIApiError | undefined): Error {
  const safeMessage = apiError?.message ?? "OpenAI вернул ошибку без описания.";
  console.error("OpenAI image generation failed:", {
    status,
    type: apiError?.type,
    code: apiError?.code,
    message: safeMessage,
  });

  return new Error("Не удалось сгенерировать интерьер через OpenAI. Попробуйте позже.");
}
