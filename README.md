# PriTech Tasks

A React Native task manager built with Expo, TypeScript, NativeWind, and the Bold Typography design system. Created for the PRITECH React Native technical assessment.

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go on a physical device, or Xcode / Android Studio for simulators

## Setup

```bash
npm install
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

Clear Metro cache if styles do not apply:

```bash
npx expo start --clear
```

## What was implemented

### Core requirements

- **Task list screen** — browse tasks with FlashList
- **Add new task** — title and description with validation
- **Mark complete / incomplete** — toggle from list or detail screen
- **Delete task** — with confirmation alert
- **Task details** — full view of title, description, status, created date
- **Input validation** — required title (2–100 chars), optional description (max 500 chars)
- **Public API** — seeds initial tasks from [JSONPlaceholder `/todos`](https://jsonplaceholder.typicode.com/todos)

### Bonus features

- **Search** — filter tasks by title
- **Status filter** — All / Pending / Done
- **Local storage** — tasks persist via Zustand + AsyncStorage
- **Navigation** — native stack between list, add, and detail screens

## Architecture

```
assets/          Static images and icons
components/      Reusable UI (TaskCard, SearchBar, TaskForm, …)
components/ui/   Bold Typography primitives (AppText, UnderlineButton, AppInput)
screens/         TaskListScreen, AddTaskScreen, TaskDetailScreen
navigation/      RootNavigator (React Navigation native stack)
store/           Zustand task store with persist middleware
hooks/           useTaskFilters (search + status filtering)
services/        JSONPlaceholder API client
helpers/         AsyncStorage wrappers
utils/           Types, validation, date formatting, API mappers
```

## Tech stack

- Expo SDK 56 + TypeScript
- NativeWind v5 (Tailwind CSS v4)
- React Navigation (native stack)
- Zustand + AsyncStorage
- FlashList
- lucide-react-native
- Inter Tight + JetBrains Mono fonts

## Task data model

| Field       | Type                     | Description              |
|-------------|--------------------------|--------------------------|
| title       | string                   | User-entered title       |
| description | string                   | Short description        |
| status      | `pending` \| `completed` | Completion state         |
| createdAt   | ISO string               | Creation timestamp       |

## Screenshots

Add screenshots or a screen recording here before submission:

1. Task list with search and filters
2. Add task form
3. Task detail view

## Cursor skills

This repo includes agent skills for:

- [react-native-best-practices](.cursor/skills/react-native-best-practices/SKILL.md)
- [react-native-project-structure](.cursor/skills/react-native-project-structure/SKILL.md)
- [BoldTypographyNativeWind](.cursor/skills/UI/BoldTypographyNativeWind.md)
