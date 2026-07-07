import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  Factory,
  Flame,
  Ruler,
  Wrench,
  HardHat,
  Scissors,
  Shield,
  Clock,
  FileText,
  ArrowUpRight,
  Building2,
  Truck,
  Landmark,
  Hammer,
  Boxes,
  ClipboardCheck,
  FileCheck2,
  Send,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero-karkas.webp.asset.json";
import kolcoImg from "@/assets/kolco.webp.asset.json";
import weldingImg from "@/assets/welding.webp.asset.json";
import rezkaImg from "@/assets/rezka.webp.asset.json";
import montazhImg from "@/assets/montazh.webp.asset.json";
import montazh2Img from "@/assets/montazh2.webp.asset.json";
import trubaImg from "@/assets/truba.webp.asset.json";
import karkasYardImg from "@/assets/karkas-yard.webp.asset.json";
import karkasProductionImg from "@/assets/karkas-production.webp.asset.json";
import bendingImg from "@/assets/bending.webp.asset.json";
import tankWeldingImg from "@/assets/tank-welding.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE_DISPLAY = "+7 (918) 003-93-74";
const PHONE_HREF = "tel:+79180039374";
const WHATSAPP_HREF = "https://wa.me/79180039374";
const TELEGRAM_HREF = "https://t.me/+79180039374";
const MAX_HREF = "#contacts"; // Replace with direct MAX link when integration is ready.
const EMAIL = "info@karkas-invest.ru";

function GearLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10.55 2h2.9l.55 2.72c.76.22 1.47.52 2.13.9l2.32-1.53 2.05 2.05-1.53 2.32c.38.66.68 1.37.9 2.13l2.63.53v2.9l-2.63.53a8.53 8.53 0 0 1-.9 2.13l1.53 2.32-2.05 2.05-2.32-1.53a8.53 8.53 0 0 1-2.13.9L13.45 22h-2.9L10 19.42a8.53 8.53 0 0 1-2.13-.9l-2.32 1.53-2.05-2.05 1.53-2.32a8.53 8.53 0 0 1-.9-2.13L1.5 14.02v-2.9l2.63-.53c.22-.76.52-1.47.9-2.13L3.5 6.14l2.05-2.05 2.32 1.53c.66-.38 1.37-.68 2.13-.9L10.55 2ZM12 8.15a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const services = [
  {
    icon: Ruler,
    title: "Арматурные каркасы БНС",
    desc: "Каркасы для буронабивных свай Ø 650–1500 мм, секции до 12 м, вес до 5,5 т.",
    objects: "Мосты, эстакады, фундаменты жилых и промышленных объектов.",
    need: "Чертёж КЖ/КМ, диаметр и длина сваи, объём партии, сроки.",
    img: karkasYardImg.url,
  },
  {
    icon: Factory,
    title: "Ёмкости, кольца, трубы из листа",
    desc: "Кольца и трубы Ø до 2 м из листового металла, сварка ответственных швов, антикоррозийная обработка.",
    objects: "Инженерные сети, промплощадки, резервуарные парки, ливневая канализация.",
    need: "Диаметр, толщина стенки, требования к сварке и покрытию, объём.",
    img: kolcoImg.url,
  },
  {
    icon: Scissors,
    title: "Резка, рубка, плазменная резка",
    desc: "Плазменная и механическая резка листа и профиля любой толщины, раскрой по DXF заказчика.",
    objects: "Заготовки для производств, металлобазы, судостроение, декоративные изделия.",
    need: "DXF/чертёж раскроя, марка и толщина металла, количество, срок.",
    img: rezkaImg.url,
  },
  {
    icon: Wrench,
    title: "Закладные детали по чертежам",
    desc: "Закладные для монолитного строительства строго по чертежам, контроль геометрии, паспорт на партию.",
    objects: "Монолитные каркасы, промышленные здания, инфраструктурные объекты.",
    need: "Чертежи КМ/КЖ, спецификация, объём, требования к антикору.",
    img: trubaImg.url,
  },
  {
    icon: HardHat,
    title: "Металлоконструкции под ключ",
    desc: "Ангары, склады, фермы, площадки, каркасы промышленных и коммерческих объектов.",
    objects: "Логистика, производство, торговые комплексы, сельхоз-объекты.",
    need: "Чертежи КМ/КМД или ТЗ, площадь, нагрузки, регион монтажа.",
    img: montazh2Img.url,
  },
  {
    icon: Flame,
    title: "Сварочные работы и монтаж",
    desc: "Аттестованные сварщики, монтаж на объекте по РФ и СНГ, ответственные и ГОСТ-сварные соединения.",
    objects: "Промышленные площадки, объекты капстроительства, инфраструктура.",
    need: "Объём работ, чертежи узлов, требования по НАКС/НК, график.",
    img: montazhImg.url,
  },
];

const trustFacts = [
  { label: "Годовой оборот", value: "Более 1 млрд ₽" },
  { label: "География", value: "РФ и страны СНГ" },
  { label: "Производство", value: "Собственный цех" },
  { label: "Сварщики", value: "Аттестованные" },
  { label: "Основа работ", value: "Чертежи заказчика и наши ТЗ" },
  { label: "Документы", value: "Договор, счета, УПД" },
  { label: "Контроль", value: "Геометрия и качество швов" },
  { label: "На рынке", value: "Более 10 лет" },
];

const clients = [
  { icon: Building2, title: "Генподрядчики", desc: "Поставка изделий и субподряд по металлу в графике объекта." },
  { icon: Hammer, title: "Строительные компании", desc: "Каркасы БНС, закладные, металлоконструкции для монолита." },
  { icon: Factory, title: "Промышленные предприятия", desc: "Ёмкости, площадки, ремонтные и штучные металлоизделия." },
  { icon: Landmark, title: "Девелоперы", desc: "Комплексное обеспечение объектов металлом по чертежам." },
  { icon: Truck, title: "Дорожные и инфраструктурные подрядчики", desc: "Каркасы для мостов, эстакад, свай, инженерных сетей." },
  { icon: FileText, title: "Компании с изделиями по чертежам", desc: "Изготовление по КМД, DXF и спецификациям заказчика." },
];

const workflow = [
  { n: "01", title: "Получаем чертежи и ТЗ", desc: "Принимаем КМ/КМД, DXF, спецификации или сами формируем техническое задание." },
  { n: "02", title: "Считаем стоимость и сроки", desc: "Расчёт по металлу и работам за 1 рабочий день." },
  { n: "03", title: "Согласуем договор и оплату", desc: "Договор, спецификация, счёт. Работаем с НДС и без." },
  { n: "04", title: "Производим изделия", desc: "Изготовление в собственном цехе, планирование загрузки под сроки." },
  { n: "05", title: "Контролируем качество", desc: "Геометрия, сварные швы, соответствие чертежу, маркировка партий." },
  { n: "06", title: "Отгружаем или монтируем", desc: "Отгрузка на объект по РФ и СНГ или монтаж силами нашей бригады." },
];

const qc = [
  "Контроль геометрии изделий по чертежам",
  "Проверка сварных швов, ВИК на каждом этапе",
  "Соответствие маркам металла и спецификации",
  "Маркировка партий и прослеживаемость",
  "Фотоотчёт по этапам производства",
  "Полный пакет документов по запросу",
];

const sendChecklist = [
  "Чертежи КМ / КМД",
  "Эскиз или схему изделия",
  "Спецификацию металла",
  "Ведомость расхода металла",
  "Фото или описание задачи",
  "Сроки и город объекта",
];

const faq = [
  {
    q: "Работаете ли по России и СНГ?",
    a: "Да. Производим в Сочи, отгружаем и монтируем по России и странам СНГ. Логистику берём на себя или согласуем с заказчиком.",
  },
  {
    q: "Можно ли прислать только чертежи для расчёта?",
    a: "Да. Достаточно КМ/КМД, DXF или спецификации. Рассчитываем стоимость и сроки за 1 рабочий день.",
  },
  {
    q: "Делаете ли монтаж на объекте?",
    a: "Да. Собственная бригада аттестованных сварщиков и монтажников, выезд по России и СНГ, работа по графику генподряда.",
  },
  {
    q: "Работаете ли с НДС?",
    a: "Работаем как с НДС, так и без — под требования заказчика. Полный пакет закрывающих документов.",
  },
  {
    q: "Какие объёмы берёте?",
    a: "От единичных штучных изделий до серийных партий металлоконструкций и каркасов на крупные объекты.",
  },
  {
    q: "Можно ли изготовить нестандартные изделия?",
    a: "Да, работаем строго по чертежам заказчика. Изготавливаем нестандартные конструкции, ёмкости, узлы.",
  },
  {
    q: "Какие сроки расчёта?",
    a: "Стоимость и срок производства считаем в течение 1 рабочего дня после получения чертежей и ТЗ.",
  },
];

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustBar />
      <Clients />
      <Services />
      <SendChecklist />
      <Workflow />
      <Quality />
      <Gallery />
      <About />
      <FAQ />
      <ContactCTA />
      <FloatingActions />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Услуги" },
    { href: "#clients", label: "Для кого" },
    { href: "#workflow", label: "Как работаем" },
    { href: "#quality", label: "Качество" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacts", label: "Контакты" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ember text-ember-foreground sm:h-10 sm:w-10">
            <GearLogo className="h-5 w-5" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-display truncate text-base sm:text-lg">Каркас Инвест</div>
            <div className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
              металлоконструкции · РФ и СНГ
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={PHONE_HREF}
            className="hidden text-sm font-semibold text-foreground xl:block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contacts"
            className="btn-ember hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            Заявка
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-foreground hover:bg-surface"
              >
                {l.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="mt-1 rounded-md border border-border px-3 py-3 font-semibold text-foreground"
            >
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-ember/20 blur-[120px] ember-pulse sm:h-[520px] sm:w-[520px]" aria-hidden />

      <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-24">
        <div className="flex min-w-0 max-w-full flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            <span className="text-muted-foreground">Сочи · РФ и страны СНГ</span>
          </div>

          <h1 className="text-display mt-5 max-w-full text-[1.5rem] leading-[1.08] [overflow-wrap:break-word] min-[420px]:text-[2.05rem] sm:max-w-5xl sm:text-5xl sm:leading-[1.02] lg:text-7xl xl:text-[5.4rem]">
            Металлоконструкции, <span className="text-ember">которые держат</span>{" "}
            объект и сроки
          </h1>

          <p className="mt-5 max-w-full text-base text-muted-foreground sm:max-w-xl sm:text-lg">
            Производство, сварка и монтаж металлоконструкций по России и странам СНГ.
            Работаем с генподрядчиками, промышленными предприятиями и крупными
            строительными компаниями. Берём объёмные и штучные заказы: по
            чертежам заказчика или по самостоятельно подготовленному ТЗ.
          </p>

          <div className="mt-7 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#contacts"
              className="btn-ember inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold sm:w-auto"
            >
              Рассчитать проект
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contacts"
              className="btn-ghost-line inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Отправить чертёж
            </a>
            <a
              href={PHONE_HREF}
              className="btn-ghost-line inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-6 min-[420px]:grid-cols-3 sm:gap-6 sm:pt-8">
            <div className="min-w-0">
              <dt className="text-eyebrow">Годовой оборот</dt>
              <dd className="text-display mt-2 text-lg sm:text-2xl">1+ млрд ₽</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-eyebrow">География</dt>
              <dd className="text-display mt-2 text-lg sm:text-2xl">РФ и СНГ</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-eyebrow">На рынке</dt>
              <dd className="text-display mt-2 text-lg sm:text-2xl">10+ лет</dd>
            </div>
          </dl>
        </div>

        <div className="relative min-w-0 max-w-full">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-deep)]">
            <img
              src={heroImg.url}
              alt="Производственный участок ООО Каркас Инвест: арматурные каркасы БНС"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
              <div className="surface-card px-4 py-3 backdrop-blur-md">
                <div className="text-eyebrow">Собственный цех</div>
                <div className="text-display text-base sm:text-lg">
                  Вязка каркасов БНС Ø 650–1500 мм
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="text-eyebrow">Факты о компании</div>
            <h2 className="text-display mt-3 text-2xl sm:text-3xl">
              Подрядчик для крупных B2B-заказов
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Работаем с генподрядчиками и промышленными заказчиками.
            Прозрачные документы, ответственность за сроки и качество.
          </p>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {trustFacts.map((f) => (
            <div key={f.label} className="bg-surface p-4 sm:p-5">
              <dt className="text-eyebrow">{f.label}</dt>
              <dd className="text-display mt-1.5 text-base sm:text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Для кого работаем</div>
        <h2 className="text-display mt-3 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          Крупные заказчики, подрядчики и производственные компании
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <div key={c.title} className="surface-card flex gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-display text-base sm:text-lg">{c.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-eyebrow">Услуги</div>
            <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Полный цикл работ с металлом — от чертежа до монтажа
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            Берём проекты любой сложности: типовые арматурные каркасы, штучные
            изделия по чертежам заказчика, крупные металлоконструкции для
            промышленного и коммерческого строительства.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group surface-card flex flex-col overflow-hidden transition-all hover:border-ember/60 hover:shadow-[var(--shadow-ember)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-background/80 backdrop-blur-md">
                  <s.icon className="h-5 w-5 text-ember" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-display text-lg sm:text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <dl className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
                  <div>
                    <dt className="text-eyebrow">Для объектов</dt>
                    <dd className="mt-1 text-sm text-foreground/90">{s.objects}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Нужно от заказчика</dt>
                    <dd className="mt-1 text-sm text-foreground/90">{s.need}</dd>
                  </div>
                </dl>
                <a
                  href="#contacts"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ember"
                >
                  Обсудить проект
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SendChecklist() {
  return (
    <section className="border-y border-border bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <div className="text-eyebrow">Расчёт стоимости</div>
          <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Что можно отправить для расчёта
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Подойдёт любой из документов ниже. Если чертежей ещё нет — опишите
            задачу словами и приложите фото. Рассчитаем стоимость и сроки за
            1 рабочий день.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href="#contacts"
              className="btn-ember inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Отправить чертёж на расчёт
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_HREF}
              className="btn-ghost-line inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {sendChecklist.map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm"
            >
              <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Как работаем</div>
        <h2 className="text-display mt-3 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          Прозрачный процесс — от заявки до сдачи объекта
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((step) => (
            <div key={step.n} className="surface-card p-5 sm:p-6">
              <div className="text-display text-3xl text-ember sm:text-4xl">{step.n}</div>
              <div className="text-display mt-3 text-lg sm:text-xl">{step.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quality() {
  return (
    <section id="quality" className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="text-eyebrow">Контроль и ответственность</div>
            <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Изделия соответствуют чертежу и приёмке
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
              Каждое изделие проходит контроль геометрии и сварных швов.
              По запросу передаём документы, фотоотчёт и маркировку партий —
              удобно для генподряда и приёмки.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {qc.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm"
              >
                <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const gallery = [
    { type: "image", src: karkasProductionImg.url, label: "Арматурные каркасы, производственная площадка", span: "lg:col-span-2 lg:row-span-2" },
    { type: "video", src: "/assets/welding-area.mp4", poster: weldingImg.url, label: "Сварочный участок" },
    { src: montazh2Img.url, label: "Монтаж каркаса на объекте" },
    { src: bendingImg.url, label: "Гибка и обработка металла" },
    { src: tankWeldingImg.url, label: "Ёмкость под сварку" },
  ];
  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow">Производство</div>
            <h2 className="text-display mt-3 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
              Реальные фото из цеха и с объектов
            </h2>
          </div>
        </div>
        <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className={`group relative overflow-hidden rounded-xl border border-border ${g.span ?? ""}`}
            >
              {g.type === "video" ? (
                <video
                  src={g.src}
                  poster={g.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs text-foreground/90 sm:p-4">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="text-eyebrow">О компании</div>
            <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
              ООО «Каркас Инвест» — подрядчик для крупных заказов
            </h2>
            <p className="mt-5 text-sm text-muted-foreground sm:text-base">
              Работаем в сегменте металлообработки, сварочных работ и монтажа
              более 10 лет. Годовой оборот компании — более 1 млрд ₽. В
              команде — аттестованные сварщики, монтажники и специалисты по
              подготовке чертежей и технических заданий.
            </p>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Производственная площадка находится по адресу: Краснодарский край,
              г. Сочи, Адлерский район, ул. Изумрудная, 42 к3. Отгружаем и
              монтируем по России и странам СНГ: от штучных изделий до
              серийных поставок для промышленных объектов.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-8 text-sm">
              <div className="min-w-0">
                <dt className="text-eyebrow">ИНН</dt>
                <dd className="mt-1 font-semibold">2367031991</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-eyebrow">ОГРН</dt>
                <dd className="mt-1 font-semibold">1232300040026</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-eyebrow">Регион</dt>
                <dd className="mt-1 font-semibold">Краснодарский край, Сочи</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-eyebrow">Адрес производства</dt>
                <dd className="mt-1 font-semibold">Сочи, ул. Изумрудная, 42 к3</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Factory, title: "Собственное производство", desc: "Цех в Сочи: вязка каркасов, резка, гибка, сварка." },
              { icon: Shield, title: "Работаем по договору", desc: "Официальные документы, УПД, счета и годовой оборот более 1 млрд ₽." },
              { icon: Clock, title: "Соблюдаем сроки", desc: "Планируем загрузку цеха под график генподряда." },
              { icon: Boxes, title: "Штучно и серийно", desc: "От единичных изделий до серийных партий по РФ и СНГ." },
            ].map((a) => (
              <div key={a.title} className="surface-card p-5 sm:p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-ember/15 text-ember">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="text-display mt-4 text-base sm:text-lg">{a.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="text-eyebrow">Частые вопросы</div>
            <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Отвечаем на вопросы заказчиков
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Если нужного вопроса нет — задайте его напрямую в WhatsApp,
              Telegram или по телефону.
            </p>
          </div>
          <div className="divide-y divide-border rounded-xl border border-border bg-background">
            {faq.map((item, idx) => (
              <details key={item.q} className="group px-5 py-4 sm:px-6" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-foreground sm:text-base">
                  <span>{item.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    task: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: подключить приём заявок (email / CRM)
    setSent(true);
  };

  return (
    <section id="contacts" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="surface-card relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ember/25 blur-[100px]" aria-hidden />
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-ember text-ember-foreground">
                <GearLogo className="h-6 w-6" />
              </div>
              <div className="text-eyebrow">Заявка на расчёт</div>
              <h2 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
                Пришлите чертёж или задачу — <span className="text-ember">рассчитаем стоимость и сроки</span>
              </h2>
              <p className="mt-5 max-w-md text-sm text-muted-foreground sm:text-base">
                Работаем с юрлицами по России и странам СНГ. Расчёт за 1 рабочий день,
                договор, НДС по запросу, полный пакет закрывающих документов.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <a href={PHONE_HREF} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-display text-base sm:text-lg">{PHONE_DISPLAY}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <Mail className="h-4 w-4" />
                  </span>
                  {EMAIL}
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Краснодарский край, г. Сочи, Адлерский район, ул. Изумрудная, 42 к3
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a
                  href={MAX_HREF}
                  className="btn-max inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  MAX
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-telegram inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                >
                  <TelegramIcon className="h-4 w-4" />
                  Telegram
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="btn-ghost-line inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-start justify-center rounded-xl border border-ember/40 bg-ember/10 p-6 sm:p-8">
                <CheckCircle2 className="h-10 w-10 text-ember" />
                <div className="text-display mt-4 text-2xl">Заявка отправлена</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Спасибо! Свяжемся с вами в течение рабочего дня.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-3">
                  <Field
                    label="Имя"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Как к вам обращаться"
                    required
                  />
                  <Field
                    label="Телефон"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="+7"
                    type="tel"
                    required
                  />
                </div>
                <div>
                  <label className="text-eyebrow">Что нужно изготовить</label>
                  <textarea
                    value={form.task}
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                    rows={4}
                    placeholder="Например: 40 арматурных каркасов Ø 1000 мм длиной 8 м, срок 3 недели. Чертежи КЖ есть."
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Чертежи и файлы удобнее прислать в MAX, WhatsApp, Telegram или на{" "}
                  <a href={`mailto:${EMAIL}`} className="text-ember">{EMAIL}</a>.
                </p>
                <button
                  type="submit"
                  className="btn-ember inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold"
                >
                  Отправить заявку
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных
                  данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-3 left-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 grid-cols-2 items-center gap-1.5 rounded-full border border-border/70 bg-background/92 p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:bottom-5 sm:w-auto sm:max-w-none sm:gap-2 sm:bg-background/86 sm:shadow-[0_18px_46px_-28px_rgba(0,0,0,0.85)]">
      <a
        href={MAX_HREF}
        className="btn-max inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold"
      >
        <MessageCircle className="h-4 w-4" />
        MAX
      </a>
      <a
        href={PHONE_HREF}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-foreground transition-colors hover:bg-surface sm:px-5"
      >
        <Phone className="h-4 w-4" />
        Позвонить
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2.5a9.43 9.43 0 0 0-8.14 14.2L2.8 21.5l4.9-1.05a9.43 9.43 0 1 0 4.34-17.95Zm0 1.73a7.7 7.7 0 0 1 6.48 11.86 7.67 7.67 0 0 1-9.96 2.43l-.36-.22-2.95.63.65-2.85-.24-.37a7.7 7.7 0 0 1 6.38-11.48Zm-3.28 3.9c-.17 0-.45.06-.68.33-.23.26-.9.88-.9 2.14 0 1.25.92 2.47 1.04 2.64.13.17 1.78 2.85 4.46 3.88 2.22.86 2.68.69 3.16.65.49-.05 1.58-.65 1.8-1.27.22-.62.22-1.15.15-1.27-.06-.1-.24-.17-.5-.3-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.6.13-.17.26-.68.85-.83 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29a7.86 7.86 0 0 1-1.44-1.8c-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.07-.13-.58-1.44-.82-1.96-.2-.47-.42-.48-.62-.49h-.52Z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.7 3.18c.3-.14.62.12.53.44l-3.1 16.22c-.08.41-.56.6-.9.36l-5.17-3.84-2.52 2.43c-.28.27-.75.15-.86-.22l-.96-3.22-4.73-1.56c-.42-.14-.45-.72-.04-.9L21.7 3.18Zm-3.95 4.09-8.27 6.08.68 2.34.38-1.23c.07-.2.2-.38.37-.51l7.3-5.72c.42-.33.02-1-.47-.75Z" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label className="text-eyebrow">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember text-ember-foreground">
              <GearLogo className="h-5 w-5" />
            </div>
            <div className="text-display text-lg">Каркас Инвест</div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            ООО «Каркас Инвест». Производство, сварка и монтаж
            металлоконструкций по чертежам заказчика и нашим ТЗ. Работаем по
            России и странам СНГ.
          </p>
        </div>
        <div>
          <div className="text-eyebrow">Услуги</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-foreground">Арматурные каркасы БНС</a></li>
            <li><a href="#services" className="hover:text-foreground">Закладные детали</a></li>
            <li><a href="#services" className="hover:text-foreground">Резка и плазма</a></li>
            <li><a href="#services" className="hover:text-foreground">Металлоконструкции под ключ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-eyebrow">Контакты</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={PHONE_HREF} className="hover:text-foreground">{PHONE_DISPLAY}</a></li>
            <li className="break-all"><a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a></li>
            <li>Краснодарский край, г. Сочи, Адлерский район, ул. Изумрудная, 42 к3</li>
            <li>ИНН 2367031991 · ОГРН 1232300040026</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} ООО «Каркас Инвест». Все права защищены.</div>
          <div>Сделано с расчётом на нагрузку.</div>
        </div>
      </div>
    </footer>
  );
}
