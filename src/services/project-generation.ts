import { Api } from "grammy";
import { processInteriorGeneration } from "./interior-generation";
import {
  failGeneration,
  finishGeneration,
  type GenerationContext,
  type UserSession,
} from "./user-session";
import type { GeneratedImage } from "./ai";

type ProjectGenerationSuccess = {
  readonly ok: true;
  readonly generatedImage: GeneratedImage;
  readonly message: string;
  readonly session: UserSession;
};

type ProjectGenerationFailure = {
  readonly ok: false;
  readonly message: string;
};

export type ProjectGenerationResult = ProjectGenerationSuccess | ProjectGenerationFailure;

export async function runProjectGeneration(
  api: Api,
  userId: number,
  photoFileId: string,
  generationContext: GenerationContext
): Promise<ProjectGenerationResult> {
  const result = await processInteriorGeneration(api, photoFileId, generationContext);

  if (!result.ok) {
    failGeneration(userId);
    return result;
  }

  const session = finishGeneration(userId);

  return {
    ok: true,
    generatedImage: result.generatedImage,
    message: result.message,
    session,
  };
}
