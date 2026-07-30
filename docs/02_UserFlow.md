# User Flow

## Interior generation flow

```text
/start
↓
Приветствие
↓
Выбор комнаты
↓
Выбор стиля
↓
Выбор бюджета
↓
Теперь отправьте фотографию комнаты.
↓
Фото получено
↓
Генерация OpenAI
↓
Показ результата
↓
Еще вариант / Новый проект
```

## Options

Rooms:

- Гостиная
- Спальня
- Кухня
- Детская
- Ванная
- Кабинет
- Прихожая

Styles:

- Современный
- Минимализм
- Скандинавский
- Лофт
- Неоклассика
- Джапанди

Budgets:

- Эконом
- Средний
- Премиум

## Limits

- One project is one room.
- One project keeps the same room, style, budget, and photo.
- `Еще вариант` generates another design variant for the same project.
- Maximum variants per project: 3.
- After 3 generations, only `Новый проект` is shown.
