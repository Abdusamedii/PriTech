# PriTech Tasks

A React Native task manager built with Expo and TypeScript.

## Install & Run

- Node.js 18+
- npm or yarn
- Expo Go on a physical device, or Xcode / Android Studio for simulators

## Setup

```bash
npm install
npx expo start
```

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go on a physical device

If styles do not load correctly, clear the Metro cache:

```bash
npx expo start --clear
```

## Folder Structure

```
PriTech-1/
├── assets/              Images, icons, and static files
├── components/          Reusable UI (TaskCard, SearchBar, TaskForm, …)
│   └── ui/              Shared primitives (AppText, AppInput, Pill, …)
├── screens/             TaskListScreen, AddTaskScreen, TaskDetailScreen
├── navigation/          RootNavigator and navigation theme
├── store/               Zustand task store
├── hooks/               useTaskDatabase, useTaskFilters
├── services/            SQLite database layer (taskDatabase.ts)
├── utils/               Types, validation, seed data, helpers
├── App.tsx              App entry (fonts, SQLiteProvider, navigation)
└── index.ts             Expo entry point
```

## SQLite

Tasks are stored locally with **expo-sqlite**. The database file is `pritech-tasks.db`.

| Layer | File | Role |
|-------|------|------|
| Provider | `App.tsx` | Opens the DB and runs schema setup on launch |
| Schema & queries | `services/taskDatabase.ts` | CREATE TABLE, CRUD operations |
| State | `store/taskStore.ts` | Zustand store synced with SQLite |
| Bootstrap | `hooks/useTaskDatabase.ts` | Initializes store and loads tasks on startup |

**Schema**

```sql
CREATE TABLE tasks (
  id          TEXT PRIMARY KEY NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  status      TEXT NOT NULL,
  created_at  TEXT NOT NULL
);
```

On first launch, if the table is empty, sample tasks from `utils/seedTasks.ts` are inserted automatically.

**Task statuses:** `todo`, `in_progress`, `on_hold`, `done`, `archived`

## Screenshots

Add your app screenshots here (e.g. save them in `assets/screenshots/`):

| Task list | Add task | Task detail |
|-----------|----------|-------------|
| ![Task list](assets/screenshots/task-list.png) | ![Add task](assets/screenshots/add-task.png) | ![Task detail](assets/screenshots/task-detail.png) |

Replace the image paths above with your own files once you add them.
