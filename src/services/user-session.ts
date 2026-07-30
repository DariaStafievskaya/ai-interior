import { randomUUID } from "node:crypto";

export const fsmStates = {
  start: "START",
  selectRoom: "SELECT_ROOM",
  selectStyle: "SELECT_STYLE",
  selectBudget: "SELECT_BUDGET",
  waitingPhoto: "WAITING_PHOTO",
  generating: "GENERATING",
  result: "RESULT",
} as const;

export type FsmState = (typeof fsmStates)[keyof typeof fsmStates];

export type RoomType =
  | "Гостиная"
  | "Спальня"
  | "Кухня"
  | "Детская"
  | "Ванная"
  | "Кабинет"
  | "Прихожая";

export type InteriorStyle =
  | "Современный"
  | "Минимализм"
  | "Скандинавский"
  | "Лофт"
  | "Неоклассика"
  | "Джапанди";

export type ProjectBudget = "Эконом" | "Средний" | "Премиум";

export type UserSession = {
  readonly userId: number;
  roomType?: RoomType;
  style?: InteriorStyle;
  budget?: ProjectBudget;
  photoFileId?: string;
  generationCount: number;
  readonly projectId: string;
  state: FsmState;
};

export type GenerationContext = {
  readonly roomType: RoomType;
  readonly style: InteriorStyle;
  readonly budget: ProjectBudget;
  readonly generationNumber: number;
};

const MAX_GENERATIONS_PER_PROJECT = 3;
const sessions = new Map<number, UserSession>();

export function startUserProject(userId: number): UserSession {
  const session: UserSession = {
    userId,
    generationCount: 0,
    projectId: randomUUID(),
    state: fsmStates.selectRoom,
  };

  sessions.set(userId, session);

  return session;
}

export function getUserSession(userId: number): UserSession | undefined {
  return sessions.get(userId);
}

export function selectRoom(userId: number, roomType: RoomType): UserSession {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.selectRoom);

  session.roomType = roomType;
  session.state = fsmStates.selectStyle;

  return session;
}

export function selectStyle(userId: number, style: InteriorStyle): UserSession {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.selectStyle);

  session.style = style;
  session.state = fsmStates.selectBudget;

  return session;
}

export function selectBudget(userId: number, budget: ProjectBudget): UserSession {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.selectBudget);

  session.budget = budget;
  session.state = fsmStates.waitingPhoto;

  return session;
}

export function savePhotoAndStartGeneration(
  userId: number,
  photoFileId: string
): GenerationContext {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.waitingPhoto);

  session.photoFileId = photoFileId;
  session.state = fsmStates.generating;

  return getGenerationContext(session);
}

export function startNextGeneration(userId: number): {
  readonly photoFileId: string;
  readonly generationContext: GenerationContext;
} {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.result);

  if (!session.photoFileId) {
    throw new Error("Фото проекта не найдено. Начните новый проект.");
  }

  if (!canGenerateMore(session)) {
    throw new Error("Для одного проекта доступно максимум 3 варианта.");
  }

  session.state = fsmStates.generating;

  return {
    photoFileId: session.photoFileId,
    generationContext: getGenerationContext(session),
  };
}

export function finishGeneration(userId: number): UserSession {
  const session = getRequiredSession(userId);
  ensureState(session, fsmStates.generating);

  session.generationCount += 1;
  session.state = fsmStates.result;

  return session;
}

export function failGeneration(userId: number): UserSession | undefined {
  const session = getUserSession(userId);

  if (!session) {
    return undefined;
  }

  if (session.photoFileId) {
    session.state = fsmStates.result;
  } else {
    session.state = fsmStates.waitingPhoto;
  }

  return session;
}

export function canGenerateMore(session: UserSession): boolean {
  return session.generationCount < MAX_GENERATIONS_PER_PROJECT;
}

function getRequiredSession(userId: number): UserSession {
  const session = getUserSession(userId);

  if (!session) {
    throw new Error("Проект не найден. Нажмите /start, чтобы начать заново.");
  }

  return session;
}

function ensureState(session: UserSession, expectedState: FsmState): void {
  if (session.state !== expectedState) {
    throw new Error("Сейчас это действие недоступно. Нажмите /start, чтобы начать заново.");
  }
}

function getGenerationContext(session: UserSession): GenerationContext {
  if (!session.roomType || !session.style || !session.budget) {
    throw new Error("Не все параметры проекта выбраны. Нажмите /start, чтобы начать заново.");
  }

  return {
    roomType: session.roomType,
    style: session.style,
    budget: session.budget,
    generationNumber: session.generationCount + 1,
  };
}
