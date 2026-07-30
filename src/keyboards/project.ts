import { InlineKeyboard } from "grammy";
import {
  canGenerateMore,
  type InteriorStyle,
  type ProjectBudget,
  type RoomType,
  type UserSession,
} from "../services/user-session";

export const roomOptions: readonly RoomType[] = [
  "Гостиная",
  "Спальня",
  "Кухня",
  "Детская",
  "Ванная",
  "Кабинет",
  "Прихожая",
];

export const styleOptions: readonly InteriorStyle[] = [
  "Современный",
  "Минимализм",
  "Скандинавский",
  "Лофт",
  "Неоклассика",
  "Джапанди",
];

export const budgetOptions: readonly ProjectBudget[] = ["Эконом", "Средний", "Премиум"];

export function createRoomKeyboard(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  roomOptions.forEach((room, index) => {
    keyboard.text(room, `room:${room}`);

    if (index % 2 === 1) {
      keyboard.row();
    }
  });

  return keyboard;
}

export function createStyleKeyboard(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  styleOptions.forEach((style, index) => {
    keyboard.text(style, `style:${style}`);

    if (index % 2 === 1) {
      keyboard.row();
    }
  });

  return keyboard;
}

export function createBudgetKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text("Эконом", "budget:Эконом")
    .text("Средний", "budget:Средний")
    .row()
    .text("Премиум", "budget:Премиум");
}

export function createResultKeyboard(session: UserSession): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  if (canGenerateMore(session)) {
    keyboard.text("Еще вариант", "project:another").row();
  }

  keyboard.text("Новый проект", "project:new");

  return keyboard;
}

export function isRoomType(value: string): value is RoomType {
  return roomOptions.includes(value as RoomType);
}

export function isInteriorStyle(value: string): value is InteriorStyle {
  return styleOptions.includes(value as InteriorStyle);
}

export function isProjectBudget(value: string): value is ProjectBudget {
  return budgetOptions.includes(value as ProjectBudget);
}
