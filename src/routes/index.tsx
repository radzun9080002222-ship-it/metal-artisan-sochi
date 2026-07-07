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

const PHONE_DISPLAY = "+7 (988) 000-00-00";
const PHONE_HREF = "tel:+79880000000";

const services = [
  {
    icon: Ruler,
    title: "Арматурные каркасы БНС",
    desc: "Каркасы для буронабивных свай диаметром до 1500 мм. Собственная станция вязки, длина секции до 12 м, вес до 5,5 т.",
    img: karkasYardImg.url,
  },
  {
    icon: Factory,
    title: "Ёмкости, кольца, трубы из листа",
    desc: "Кольца и трубы диаметром до 2 метров из листового металла. Сварка ответственных швов, зачистка, антикоррозийная обработка.",
    img: kolcoImg.url,
  },
  {
    icon: Scissors,
    title: "Резка, рубка, плазменная резка",
    desc: "Плазменная и механическая резка металла любой толщины. Художественная плазма для вывесок и декоративных изделий.",
    img: rezkaImg.url,
  },
  {
    icon: Wrench,
    title: "Закладные детали по чертежам",
    desc: "Закладные для монолитного строительства строго по чертежам заказчика. Контроль геометрии, паспорт на партию.",
    img: trubaImg.url,
  },
  {
    icon: HardHat,
    title: "Металлоконструкции под ключ",
    desc: "Ангары, склады, фермы, каркасы, производственные и коммерческие объекты. Проектирование, изготовление, монтаж.",
    img: montazh2Img.url,
  },
  {
    icon: Flame,
    title: "Сварочные работы и монтаж",
    desc: "Аттестованные сварщики, монтаж на объекте, ворота, калитки, навесы. Работы по Краснодарскому краю и Крыму.",
    img: montazhImg.url,
  },
];

const stats = [
  { value: "2023", label: "год основания" },
  { value: "248 млн ₽", label: "оборот за 2024 год" },
  { value: "до 2 м", label: "диаметр колец и труб" },
  { value: "5,5 т", label: "вес каркаса БНС" },
];

const workflow = [
  { n: "01", title: "Заявка и ТЗ", desc: "Принимаем чертежи, спецификации или задачу словами. Уточняем сроки и объём." },
  { n: "02", title: "Расчёт и договор", desc: "Считаем стоимость по металлу и работам, фиксируем цену и сроки в договоре." },
  { n: "03", title: "Производство", desc: "Изготавливаем в собственном цеху в Сочи. Контроль качества на каждом этапе." },
  { n: "04", title: "Доставка и монтаж", desc: "Отгружаем на объект, при необходимости — монтаж силами нашей бригады." },
];

const advantages = [
  { icon: Factory, title: "Собственное производство", desc: "Цех в Сочи с оборудованием для вязки каркасов, резки, гибки и сварки." },
  { icon: Shield, title: "Работаем по договору", desc: "Юрлицо с 2023 года, оборот более 240 млн ₽, работа с крупными подрядчиками." },
  { icon: Clock, title: "Соблюдаем сроки", desc: "Планируем загрузку цеха и не срываем графики строительства объектов." },
  { icon: FileText, title: "Документы и паспорта", desc: "Полный пакет: договор, спецификация, паспорт на изделия, закрывающие документы." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Workflow />
      <Gallery />
      <Advantages />
      <ContactCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ember text-ember-foreground">
            <Flame className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-display text-lg">Каркас Инвест</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              металлоконструкции · сочи
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="transition-colors hover:text-foreground">Услуги</a>
          <a href="#workflow" className="transition-colors hover:text-foreground">Как работаем</a>
          <a href="#gallery" className="transition-colors hover:text-foreground">Производство</a>
          <a href="#about" className="transition-colors hover:text-foreground">О компании</a>
          <a href="#contacts" className="transition-colors hover:text-foreground">Контакты</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden text-sm font-semibold text-foreground md:block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contacts"
            className="btn-ember inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
          >
            Заявка
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-ember/20 blur-[120px] ember-pulse" aria-hidden />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            <span className="text-muted-foreground">Сочи · Краснодарский край · Крым</span>
          </div>

          <h1 className="text-display mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Металлоконструкции,
            <br />
            <span className="text-ember">которые держат</span>
            <br />
            объект.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Производим арматурные каркасы БНС, закладные, ёмкости, ангары и фермы
            по чертежам заказчика. Свой цех в Сочи, монтаж на объекте, работа с
            крупными подрядчиками.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contacts"
              className="btn-ember inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold"
            >
              Рассчитать проект
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="btn-ghost-line inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <dt className="text-eyebrow">Оборот 2024</dt>
              <dd className="text-display mt-2 text-2xl">248 млн ₽</dd>
            </div>
            <div>
              <dt className="text-eyebrow">Производство</dt>
              <dd className="text-display mt-2 text-2xl">Сочи</dd>
            </div>
            <div>
              <dt className="text-eyebrow">На рынке с</dt>
              <dd className="text-display mt-2 text-2xl">2023</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-deep)]">
            <img
              src={heroImg.url}
              alt="Производственный участок ООО Каркас Инвест: арматурные каркасы БНС"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div className="surface-card px-4 py-3 backdrop-blur-md">
                <div className="text-eyebrow">Собственный цех</div>
                <div className="text-display text-lg">Вязка каркасов БНС Ø 650–1500 мм</div>
              </div>
              <div className="hidden rounded-full border border-border bg-background/70 px-4 py-3 text-xs text-muted-foreground backdrop-blur-md sm:block">
                г. Сочи
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Арматурные каркасы БНС",
    "Закладные детали",
    "Резка металла до 40 мм",
    "Ёмкости и кольца до Ø 2 м",
    "Ангары, склады, фермы",
    "Плазменная резка",
    "Ворота, навесы, калитки",
    "Монтаж на объекте",
  ];
  return (
    <div className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {items.map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ember" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-eyebrow">Что делаем</div>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl">
              Полный цикл работ с металлом — от чертежа до монтажа
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Берём проекты любой сложности: типовые арматурные каркасы, штучные
            изделия по чертежам заказчика, крупные металлоконструкции для
            промышленного и коммерческого строительства.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group surface-card overflow-hidden transition-all hover:border-ember/60 hover:shadow-[var(--shadow-ember)]"
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
              <div className="p-6">
                <h3 className="text-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
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

function Stats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-8">
            <div className="text-display text-3xl text-ember sm:text-4xl">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-eyebrow">Как работаем</div>
        <h2 className="text-display mt-4 max-w-3xl text-4xl sm:text-5xl">
          Прозрачный процесс — от заявки до сдачи объекта
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step) => (
            <div key={step.n} className="surface-card p-6">
              <div className="text-display text-ember text-4xl">{step.n}</div>
              <div className="mt-4 text-display text-xl">{step.title}</div>
              <p className="mt-3 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
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
    <section id="gallery" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow">Производство</div>
            <h2 className="text-display mt-4 max-w-2xl text-4xl sm:text-5xl">
              Реальные фото из цеха и с объектов
            </h2>
          </div>
        </div>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
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
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-xs text-foreground/90">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" aria-hidden />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <div className="text-eyebrow">О компании</div>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl">
              ООО «Каркас Инвест» — подрядчик для крупных заказов
            </h2>
            <p className="mt-6 text-muted-foreground">
              Мы работаем в сегменте сварочных и металлообрабатывающих работ с
              2023 года. За 2024 год выполнили заказов на 248 млн рублей. В
              команде — аттестованные сварщики, монтажники и специалисты по
              подготовке чертежей.
            </p>
            <p className="mt-4 text-muted-foreground">
              Юридически зарегистрированы в Краснодарском крае, г. Сочи.
              Работаем по всему югу России, включая объекты в Крыму. Готовы
              выполнить как штучный заказ, так и серийную поставку
              металлоконструкций для промышленного и коммерческого
              строительства.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm">
              <div>
                <dt className="text-eyebrow">ИНН</dt>
                <dd className="mt-1 font-semibold">2367031991</dd>
              </div>
              <div>
                <dt className="text-eyebrow">ОГРН</dt>
                <dd className="mt-1 font-semibold">1232300040026</dd>
              </div>
              <div>
                <dt className="text-eyebrow">Регион</dt>
                <dd className="mt-1 font-semibold">Краснодарский край, Сочи</dd>
              </div>
              <div>
                <dt className="text-eyebrow">Руководитель</dt>
                <dd className="mt-1 font-semibold">Борисов Д. Л.</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((a) => (
              <div key={a.title} className="surface-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-ember/15 text-ember">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-display text-lg">{a.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", task: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: подключить приём заявок (email / CRM)
    setSent(true);
  };

  return (
    <section id="contacts" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="surface-card relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ember/25 blur-[100px]" aria-hidden />
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="text-eyebrow">Оставить заявку</div>
              <h2 className="text-display mt-4 text-4xl sm:text-5xl">
                Расскажите о задаче — <span className="text-ember">рассчитаем за 1 день</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Пришлите чертёж или опишите задачу словами. Свяжемся, уточним
                детали и подготовим коммерческое предложение.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <a href={PHONE_HREF} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-display text-lg">{PHONE_DISPLAY}</span>
                </a>
                <a href="mailto:info@karkas-invest.ru" className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <Mail className="h-4 w-4" />
                  </span>
                  info@karkas-invest.ru
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <MapPin className="h-4 w-4" />
                  </span>
                  г. Сочи, Краснодарский край
                </div>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-start justify-center rounded-xl border border-ember/40 bg-ember/10 p-8">
                <CheckCircle2 className="h-10 w-10 text-ember" />
                <div className="text-display mt-4 text-2xl">Заявка отправлена</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Спасибо! Свяжемся с вами в течение рабочего дня.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Field
                  label="Как к вам обращаться"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Имя"
                  required
                />
                <Field
                  label="Телефон для связи"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="+7"
                  type="tel"
                  required
                />
                <div>
                  <label className="text-eyebrow">Задача или объект</label>
                  <textarea
                    value={form.task}
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                    rows={4}
                    placeholder="Например: 40 арматурных каркасов Ø 1000 мм длиной 8 м, объект в Адлере"
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ember"
                  />
                </div>
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
    <div>
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
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ember text-ember-foreground">
              <Flame className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="text-display text-lg">Каркас Инвест</div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            ООО «Каркас Инвест». Производство и монтаж металлоконструкций.
            Сочи, Краснодарский край, Крым.
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
            <li><a href="mailto:info@karkas-invest.ru" className="hover:text-foreground">info@karkas-invest.ru</a></li>
            <li>г. Сочи, Краснодарский край</li>
            <li>ИНН 2367031991 · ОГРН 1232300040026</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} ООО «Каркас Инвест». Все права защищены.</div>
          <div>Сделано с расчётом на нагрузку.</div>
        </div>
      </div>
    </footer>
  );
}
