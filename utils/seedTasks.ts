import type { Task, TaskStatus } from "./types";

type SeedTask = {
  title: string;
  description: string;
  status: TaskStatus;
};

const SEED_TASKS: SeedTask[] = [
  {
    title: "Refaktoro komponentët e listës së detyrave",
    description:
      "Thjeshto TaskCard dhe Pill për të reduktuar re-render-et dhe për të përmirësuar scroll-in me FlashList.",
    status: "in_progress",
  },
  {
    title: "Shto testimin e njësisë për taskStore",
    description:
      "Shkruaj teste për addTask, setTaskStatus dhe deleteTask duke përdorur mock të SQLite.",
    status: "todo",
  },
  {
    title: "Konfiguro CI/CD për build-et Expo",
    description:
      "Vendos pipeline në GitHub Actions që ekzekuton lint, typecheck dhe EAS build për iOS dhe Android.",
    status: "todo",
  },
  {
    title: "Optimizo madhësinë e bundle-it JavaScript",
    description:
      "Analizo bundle-in me source-map-explorer dhe hiq importet barrel që rrisin madhësinë e app-it.",
    status: "on_hold",
  },
  {
    title: "Implemento autentifikimin me Firebase",
    description:
      "Shto ekrane login/register dhe lidh Firebase Auth me rregullat e sigurisë për të dhënat e përdoruesit.",
    status: "todo",
  },
  {
    title: "Rregullo bug-un e filtrit të arkivuar",
    description:
      "Verifiko që detyrat me status archived nuk shfaqen te filtri All, por mbeten të aksesueshme te filtri Archived.",
    status: "done",
  },
  {
    title: "Dizajno ekranin e profilit të përdoruesit",
    description:
      "Krijo UI për avatar, emrin e përdoruesit dhe preferencat e njoftimeve sipas Bold Typography.",
    status: "todo",
  },
  {
    title: "Integro animacionet me Reanimated 4",
    description:
      "Përdor worklets për animacionin e status dot dhe sigurohu që animacionet mbeten në UI thread.",
    status: "done",
  },
  {
    title: "Përditëso dokumentacionin e API-së",
    description:
      "Dokumento endpoint-et REST për detyrat, filtrat e statusit dhe formatin e përgjigjeve JSON.",
    status: "on_hold",
  },
  {
    title: "Review pull request për navigimin",
    description:
      "Kontrollo ndryshimet e React Navigation stack dhe verifiko deep linking për TaskDetail.",
    status: "in_progress",
  },
  {
    title: "Deploy build beta në TestFlight",
    description:
      "Përgatit build-in iOS me EAS, ngarko në App Store Connect dhe fto testerët e brendshëm.",
    status: "todo",
  },
  {
    title: "Heq integrimin me JSONPlaceholder",
    description:
      "Zëvendëso të dhënat e jashtme me seed lokal në shqip dhe thjeshto logjikën e hydrate.",
    status: "archived",
  },
];

export function getSeedTasks(): Task[] {
  return SEED_TASKS.map((seed, index) => ({
    id: `seed-${index + 1}`,
    title: seed.title,
    description: seed.description,
    status: seed.status,
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  }));
}
