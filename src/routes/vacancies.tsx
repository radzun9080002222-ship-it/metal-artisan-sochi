import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Factory,
  HardHat,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import { reachGoal } from "@/lib/analytics";

export const Route = createFileRoute("/vacancies")({
  head: () => ({
    meta: [
      { title: "Вакансии на производстве в Адлере — Каркас Инвест" },
      {
        name: "description",
        content:
          "Работа на производстве металлоконструкций в Адлере на ул. Гастелло. Вакансии крановщика-стропальщика, электрика и сварщика.",
      },
      {
        property: "og:title",
        content: "Работа на производстве в Адлере — Каркас Инвест",
      },
      {
        property: "og:description",
        content:
          "Открытые вакансии на производстве металлоконструкций: крановщик-стропальщик, электрик и сварщик.",
      },
      { property: "og:url", content: "https://karkas-invest.ru/vacancies/" },
    ],
    links: [{ rel: "canonical", href: "https://karkas-invest.ru/vacancies/" }],
  }),
  component: VacanciesPage,
});

const PHONE_DISPLAY = "+7 (918) 003-93-74";
const PHONE_HREF = "tel:+79180039374";

type Vacancy = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: typeof HardHat;
  image: string;
  imageAlt: string;
  lead: string;
  salary: string;
  schedule: string;
  tasks: string[];
  requirements: string[];
  conditions: string[];
};

const vacancies: Vacancy[] = [
  {
    slug: "crane-rigger",
    title: "Крановщик-стропальщик на кран-балку",
    shortTitle: "Крановщик-стропальщик",
    icon: HardHat,
    image: "/assets/vacancy-crane-rigger.webp",
    imageAlt:
      "Крановщик-стропальщик управляет перемещением металлоконструкции в производственном цехе",
    lead: "Работа с металлом и готовыми конструкциями внутри производственного цеха.",
    salary: "от 80 000 ₽ на руки",
    schedule: "5/2, полная занятость",
    tasks: [
      "Управлять кран-балкой с радиопульта.",
      "Выполнять зацепку, строповку, перемещение, раскладку и погрузку грузов.",
      "Проверять грузоподъёмные механизмы, тросы и чалки перед началом смены.",
      "Контролировать крепление грузов и соблюдать схемы строповки.",
    ],
    requirements: [
      "Действующие удостоверения крановщика для управления кран-балкой с пола и стропальщика.",
      "Опыт на аналогичной должности от 1 года.",
      "Знание правил безопасности, внимательность и дисциплина.",
    ],
    conditions: [
      "Официальное трудоустройство по ТК РФ.",
      "Выплаты два раза в месяц без задержек.",
      "Зимняя и летняя спецодежда, оборудованные бытовые помещения.",
    ],
  },
  {
    slug: "electrician",
    title: "Электрик на производство",
    shortTitle: "Электрик",
    icon: Zap,
    image: "/assets/vacancy-electrician.webp",
    imageAlt:
      "Промышленный электрик обслуживает электрооборудование металлообрабатывающего цеха",
    lead: "Обслуживание электрооборудования и поддержание стабильной работы производства.",
    salary: "от 80 000 ₽",
    schedule: "Фиксированный, 8 часов в день",
    tasks: [
      "Обслуживать и ремонтировать электрооборудование производства.",
      "Монтировать и заменять кабельные линии, электрощиты и автоматические выключатели.",
      "Диагностировать неисправности, обслуживать автоматику и приводы.",
      "Контролировать заземление и соблюдать правила электробезопасности.",
    ],
    requirements: [
      "Профильное среднее или среднее профессиональное образование.",
      "Удостоверение электромонтёра и допуск по электробезопасности не ниже IV группы.",
      "Опыт работы на производстве от 1–2 лет, знание ПУЭ и чтение электросхем.",
      "Готовность при необходимости выезжать для устранения аварий.",
    ],
    conditions: [
      "Официальное трудоустройство и социальный пакет.",
      "Обучение при вводе в должность и обеспечение СИЗ.",
      "Компенсация ГСМ при наличии личного автомобиля.",
    ],
  },
  {
    slug: "welder",
    title: "Сварщик металлоконструкций",
    shortTitle: "Сварщик",
    icon: Wrench,
    image: "/assets/vacancy-welder.webp",
    imageAlt: "Сварщик изготавливает стальную конструкцию в производственном цехе",
    lead: "Изготовление металлоконструкций и изделий по производственным заданиям.",
    salary: "90 000–180 000 ₽",
    schedule: "08:00–17:00, 8 часов в день",
    tasks: [
      "Выполнять ручную дуговую, TIG и MIG/MAG сварку.",
      "Подготавливать сварные соединения и контролировать их качество.",
      "Соблюдать требования техники безопасности.",
    ],
    requirements: [
      "Опыт работы сварщиком от 1 года.",
      "Знание технологий сварки различных материалов.",
      "Ответственность и аккуратность.",
    ],
    conditions: [
      "Официальное трудоустройство и социальные гарантии.",
      "Спецодежда и инструменты предоставляются.",
      "Возможны стажировка и профессиональный рост.",
    ],
  },
];

function VacanciesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(vacancies[0].slug);

  useEffect(() => {
    reachGoal("vacancy_page_view", { page: "vacancies" });
  }, []);

  const chooseVacancy = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy.slug);
    reachGoal("vacancy_apply_click", { vacancy: vacancy.slug });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <VacancyNav open={menuOpen} setOpen={setMenuOpen} />

      <main>
        <VacancyHero />

        <section id="vacancies" className="scroll-mt-24 border-y border-border bg-surface/70 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="text-eyebrow">Открытые вакансии</div>
              <h2 className="text-display mt-4 text-3xl leading-tight sm:text-5xl">
                Выберите направление
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Все вакансии относятся к одной производственной площадке в Адлере.
                Оплата, график и основные требования указаны в карточках. Финальные
                условия ответственный сотрудник подтвердит при первом разговоре.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {vacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.slug}
                  vacancy={vacancy}
                  onChoose={() => chooseVacancy(vacancy)}
                />
              ))}
            </div>
          </div>
        </section>

        <Workplace />
        <ApplicationSteps />

        <section id="apply" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="text-eyebrow">Откликнуться</div>
              <h2 className="text-display mt-4 text-3xl leading-tight sm:text-5xl">
                Оставьте номер — обсудим вакансию
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Выберите вакансию, укажите имя и телефон. Ответственный сотрудник
                уточнит ваш опыт, расскажет об условиях и согласует встречу на
                производстве.
              </p>

              <div className="mt-8 rounded-xl border border-border bg-background/70 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                  <div>
                    <div className="font-semibold">Место работы</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      г. Сочи, Адлерский район, ул. Гастелло
                    </div>
                  </div>
                </div>
                <a
                  href={PHONE_HREF}
                  onClick={() =>
                    reachGoal("vacancy_phone_click", {
                      source: "vacancy_apply",
                      vacancy: selectedVacancy,
                    })
                  }
                  className="btn-ghost-line mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-7">
              <iframe
                key={selectedVacancy}
                src={`/vacancy-request/?vacancy=${encodeURIComponent(selectedVacancy)}`}
                title="Форма отклика на вакансию"
                className="min-h-[690px] w-full border-0 sm:min-h-[650px]"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <VacancyFAQ />
      </main>

      <VacancyFooter />
    </div>
  );
}

function VacancyNav({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const links = [
    { href: "#vacancies", label: "Вакансии" },
    { href: "#workplace", label: "Производство" },
    { href: "#steps", label: "Как откликнуться" },
    { href: "#apply", label: "Отклик" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <a href="/" className="flex min-w-0 items-center" aria-label="Каркас Инвест — главная">
          <img
            src="/logo-header.webp"
            alt="Каркас Инвест"
            className="h-auto w-[185px] sm:w-[230px]"
            decoding="async"
          />
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/"
            className="btn-ghost-line hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            <ArrowLeft className="h-4 w-4" />
            На основной сайт
          </a>
          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-foreground hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/"
              className="mt-1 rounded-md border border-border px-3 py-3 font-semibold text-foreground"
            >
              На основной сайт
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function VacancyHero() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden">
      <img
        src="/assets/vacancy-crane-rigger.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,0.96)_0%,rgba(10,10,9,0.82)_43%,rgba(10,10,9,0.28)_78%,rgba(10,10,9,0.46)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.15),rgba(10,10,9,0.7))]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-ember" />
            <span className="font-semibold uppercase tracking-[0.14em] text-white/80">
              Работа в Каркас Инвест · Адлер
            </span>
          </div>

          <h1 className="text-display mt-6 text-[2.35rem] leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            Работа на производстве{" "}
            <span className="text-ember">металлоконструкций</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-xl">
            Ищем крановщика-стропальщика, электрика и сварщика на постоянную
            производственную площадку в Адлере, на ул. Гастелло.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#vacancies"
              className="btn-ember inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold"
            >
              Смотреть вакансии
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-black/25 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-ember hover:bg-black/40"
            >
              Быстрый отклик
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { icon: Factory, title: "Производство", value: "Металлоконструкции" },
              { icon: MapPin, title: "Место", value: "Адлер, Гастелло" },
              { icon: BriefcaseBusiness, title: "Открыто", value: "3 вакансии" },
            ].map((fact) => (
              <div
                key={fact.title}
                className="rounded-lg border border-white/15 bg-black/30 p-4 backdrop-blur-md"
              >
                <fact.icon className="h-5 w-5 text-ember" />
                <div className="mt-3 text-xs uppercase tracking-[0.12em] text-white/50">
                  {fact.title}
                </div>
                <div className="mt-1 text-sm font-bold text-white">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VacancyCard({ vacancy, onChoose }: { vacancy: Vacancy; onChoose: () => void }) {
  const Icon = vacancy.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_70px_-45px_rgba(0,0,0,0.95)]">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={vacancy.image}
          alt={vacancy.imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg bg-ember text-ember-foreground shadow-lg">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-display text-xl leading-tight">{vacancy.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{vacancy.lead}</p>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>Адлер, ул. Гастелло</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>{vacancy.salary}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>{vacancy.schedule}</span>
          </div>
        </div>

        <details className="mt-5 rounded-lg border border-border bg-surface/60 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
            Обязанности и требования
            <ChevronDown className="h-4 w-4 shrink-0 text-ember" />
          </summary>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground">Что делать</div>
              <ul className="mt-2 space-y-2">
                {vacancy.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-foreground">Что важно</div>
              <ul className="mt-2 space-y-2">
                {vacancy.requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-foreground">Что предлагаем</div>
              <ul className="mt-2 space-y-2">
                {vacancy.conditions.map((condition) => (
                  <li key={condition} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        <a
          href="#apply"
          onClick={onChoose}
          className="btn-ember mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold"
        >
          Откликнуться
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function Workplace() {
  const facts = [
    {
      icon: MapPin,
      title: "Одна площадка",
      text: "Все три вакансии открыты на производстве в Адлере, на ул. Гастелло.",
    },
    {
      icon: Factory,
      title: "Настоящее производство",
      text: "Работа с металлом, оборудованием и конструкциями в производственном цехе.",
    },
    {
      icon: ShieldCheck,
      title: "Понятные условия",
      text: "Оплата, график и основные требования опубликованы в каждой карточке.",
    },
    {
      icon: BadgeCheck,
      title: "Прямой отклик",
      text: "Заявка поступает ответственному сотруднику без сторонних кадровых агентств.",
    },
  ];

  return (
    <section id="workplace" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <div className="text-eyebrow">Производственная площадка</div>
            <h2 className="text-display mt-4 text-3xl leading-tight sm:text-5xl">
              Работа в Адлере, на Гастелло
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Это не удалённый набор и не кадровый резерв. Сейчас сотрудники нужны
              непосредственно на действующее производство металлоконструкций.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.title} className="surface-card p-5 sm:p-6">
                <fact.icon className="h-6 w-6 text-ember" />
                <h3 className="mt-4 font-bold">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationSteps() {
  const steps = [
    ["01", "Выберите вакансию", "Откройте обязанности и отметьте подходящее направление."],
    ["02", "Оставьте контакты", "Укажите имя, телефон, город и кратко опишите опыт."],
    ["03", "Уточните детали", "Ответственный сотрудник подтвердит условия и ответит на вопросы."],
    ["04", "Приезжайте на встречу", "Если условия подходят, согласуем встречу на производстве."],
  ];

  return (
    <section id="steps" className="scroll-mt-24 border-y border-border bg-surface/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Как устроен отклик</div>
        <h2 className="text-display mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
          Без длинных анкет и лишних этапов
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <div key={number} className="bg-background p-6">
              <div className="text-display text-2xl text-ember">{number}</div>
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VacancyFAQ() {
  const questions = [
    {
      q: "Где находится производство?",
      a: "В Сочи, Адлерский район, на ул. Гастелло. Все опубликованные здесь вакансии относятся к этой площадке.",
    },
    {
      q: "Какая зарплата и график?",
      a: "Крановщик-стропальщик — от 80 000 ₽ на руки, график 5/2. Электрик — от 80 000 ₽, фиксированный восьмичасовой график. Сварщик — 90 000–180 000 ₽, с 08:00 до 17:00.",
    },
    {
      q: "Какие документы и допуски нужны?",
      a: "Крановщику-стропальщику нужны действующие удостоверения по обеим специальностям. Электрику — удостоверение электромонтёра и допуск не ниже IV группы. Для сварщика указан опыт от одного года.",
    },
    {
      q: "Можно ли откликнуться без резюме?",
      a: "Да. Достаточно имени, телефона и краткого описания опыта. Резюме на первом этапе не обязательно.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <div className="text-eyebrow">Частые вопросы</div>
          <h2 className="text-display mt-4 text-3xl leading-tight sm:text-5xl">Перед откликом</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {questions.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-ember transition group-open:rotate-180" />
              </summary>
              <p className="max-w-3xl pt-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function VacancyFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <img
            src="/logo-header.webp"
            alt="Каркас Инвест"
            className="h-auto w-[210px]"
            decoding="async"
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Вакансии производственной площадки в Адлере.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="btn-ghost-line inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            Основной сайт
          </a>
          <a
            href="#apply"
            className="btn-ember inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold"
          >
            Откликнуться
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ООО «Каркас Инвест». Все права защищены.
      </div>
    </footer>
  );
}
