import { Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

import { reachGoal, readAttribution } from "@/lib/analytics";

export const PHONE_DISPLAY = "+7 (918) 003-93-74";
export const PHONE_HREF = "tel:+79180039374";
export const WHATSAPP_HREF = "https://wa.me/79180039374";
export const TELEGRAM_HREF = "https://t.me/+79180039374";
export const MAX_HREF =
  "https://max.ru/u/f9LHodD0cOJK0qdYGJB_46xaAZlQdCOdNiRJg_lZc1FR4yIeVWP1XpMILJ4";
export const LEADS_ENDPOINT = "https://leads.62.60.248.177.nip.io/api/leads";
export const ADDRESS = "Сочи, Адлерский район, ул. Гастелло";

const navLinks = [
  { to: "/chastnym", label: "Частным лицам" },
  { to: "/metalloobrabotka", label: "Металлообработка" },
  { to: "/svarochnye-raboty", label: "Сварка и изделия" },
] as const;

export function GearLogo({ className }: { className?: string }) {
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

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2.5a9.43 9.43 0 0 0-8.14 14.2L2.8 21.5l4.9-1.05a9.43 9.43 0 1 0 4.34-17.95Zm0 1.73a7.7 7.7 0 0 1 6.48 11.86 7.67 7.67 0 0 1-9.96 2.43l-.36-.22-2.95.63.65-2.85-.24-.37a7.7 7.7 0 0 1 6.38-11.48Zm-3.28 3.9c-.17 0-.45.06-.68.33-.23.26-.9.88-.9 2.14 0 1.25.92 2.47 1.04 2.64.13.17 1.78 2.85 4.46 3.88 2.22.86 2.68.69 3.16.65.49-.05 1.58-.65 1.8-1.27.22-.62.22-1.15.15-1.27-.06-.1-.24-.17-.5-.3-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.6.13-.17.26-.68.85-.83 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29a7.86 7.86 0 0 1-1.44-1.8c-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.07-.13-.58-1.44-.82-1.96-.2-.47-.42-.48-.62-.49h-.52Z" />
    </svg>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.7 3.18c.3-.14.62.12.53.44l-3.1 16.22c-.08.41-.56.6-.9.36l-5.17-3.84-2.52 2.43c-.28.27-.75.15-.86-.22l-.96-3.22-4.73-1.56c-.42-.14-.45-.72-.04-.9L21.7 3.18Zm-3.95 4.09-8.27 6.08.68 2.34.38-1.23c.07-.2.2-.38.37-.51l7.3-5.72c.42-.33.02-1-.47-.75Z" />
    </svg>
  );
}

function Nav({ activeTo }: { activeTo: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Каркас Инвест">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ember text-ember-foreground">
            <GearLogo className="h-5 w-5" />
          </span>
          <span className="text-display truncate text-base sm:text-lg">Каркас Инвест</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                link.to === activeTo
                  ? "text-sm font-semibold text-ember"
                  : "text-sm text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Организациям
          </Link>
        </nav>

        <a
          href={PHONE_HREF}
          className="btn-ember ml-auto hidden items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold lg:ml-0 lg:inline-flex"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
              Организациям
            </Link>
            <a
              href={PHONE_HREF}
              className="btn-ember mt-1 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-3 left-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 grid-cols-2 items-center gap-1.5 rounded-full border border-border/70 bg-background/92 p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:bottom-5 sm:w-auto sm:max-w-none sm:gap-2">
      <a
        href={MAX_HREF}
        target="_blank"
        rel="noreferrer"
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

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember text-ember-foreground">
              <GearLogo className="h-5 w-5" />
            </span>
            <span className="text-display text-lg">Каркас Инвест</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Собственное производство в Адлере на ул. Гастелло. Работаем и с организациями,
            и с частными заказчиками: от одного хомута до навеса под ключ.
          </p>
        </div>
        <div>
          <div className="text-eyebrow">Частным лицам</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-eyebrow">Контакты</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={PHONE_HREF} className="hover:text-foreground">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>{ADDRESS}</li>
            <li>
              <a href="/privacy/" className="hover:text-foreground">
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function B2CLayout({ activeTo, children }: { activeTo: string; children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav activeTo={activeTo} />
      <main className="relative z-10 pb-24 sm:pb-28">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export function MessengerButtons({ page }: { page: string }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <a
        href={MAX_HREF}
        target="_blank"
        rel="noreferrer"
        onClick={() => reachGoal("b2c_messenger_click", { page, channel: "max" })}
        className="btn-max inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
      >
        <MessageCircle className="h-4 w-4" />
        MAX
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        onClick={() => reachGoal("b2c_messenger_click", { page, channel: "whatsapp" })}
        className="btn-whatsapp inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href={TELEGRAM_HREF}
        target="_blank"
        rel="noreferrer"
        onClick={() => reachGoal("b2c_messenger_click", { page, channel: "telegram" })}
        className="btn-telegram inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
      >
        <TelegramIcon className="h-4 w-4" />
        Telegram
      </a>
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  lead,
  priceFrom,
  bullets,
  image,
  imageAlt,
  page,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  priceFrom?: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  page: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
        <div>
          <div className="text-eyebrow">{eyebrow}</div>
          <h1 className="text-display mt-4 text-3xl sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">{lead}</p>

          {priceFrom ? (
            <div className="mt-6 inline-flex items-baseline gap-2 rounded-md border border-ember/40 bg-ember/10 px-4 py-2.5">
              <span className="text-sm text-muted-foreground">Цена</span>
              <span className="text-display text-xl text-ember sm:text-2xl">{priceFrom}</span>
            </div>
          ) : null}

          <ul className="mt-6 grid gap-2.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href="#zayavka"
              onClick={() => reachGoal("b2c_cta_click", { page, place: "hero" })}
              className="btn-ember inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Рассчитать стоимость
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="btn-ghost-line inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="mt-5">
            <MessengerButtons page={page} />
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export function TrustStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-8 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="px-2 py-3">
            <div className="text-display text-lg text-ember sm:text-xl">{item.value}</div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export type ServiceItem = {
  title: string;
  desc: string;
  price?: string;
  Illustration: (props: { className?: string }) => ReactNode;
};

export function ServiceGrid({
  id,
  eyebrow,
  title,
  items,
  page,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: ServiceItem[];
  page: string;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">{eyebrow}</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">{title}</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="surface-card flex flex-col p-5 sm:p-6">
              <div className="text-ember">
                <item.Illustration className="h-16 w-24" />
              </div>
              <h3 className="text-display mt-4 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              {item.price ? (
                <div className="mt-4 text-sm font-semibold text-ember">{item.price}</div>
              ) : null}
              <a
                href="#zayavka"
                onClick={() => reachGoal("b2c_cta_click", { page, place: item.title })}
                className="mt-auto pt-4 text-sm font-semibold text-foreground hover:text-ember"
              >
                Узнать цену →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type PriceRow = { name: string; unit: string; price: string };

export function PriceTable({
  id,
  eyebrow,
  title,
  lead,
  rows,
  note,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  rows: PriceRow[];
  note: string;
}) {
  return (
    <section id={id} className="border-y border-border bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-eyebrow">{eyebrow}</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">{title}</h2>
        {lead ? <p className="mt-4 text-sm text-muted-foreground sm:text-base">{lead}</p> : null}

        <div className="surface-card mt-8 overflow-hidden bg-background">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                  Работа
                </th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                  Ед.
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-6">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 sm:px-6">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground sm:px-6">{row.unit}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ember sm:px-6">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}

export function Gallery({ items }: { items: { src: string; alt: string }[] }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Наши работы</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">Что выходит из цеха</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.src} className="surface-card overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="h-48 w-full object-cover sm:h-56"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps({ items }: { items: { n: string; title: string; desc: string }[] }) {
  return (
    <section className="border-y border-border bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Как заказать</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">Без чертежей и согласований</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.n} className="surface-card bg-background p-5 sm:p-6">
              <div className="text-display text-2xl text-ember">{item.n}</div>
              <h3 className="text-display mt-3 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-eyebrow">Частые вопросы</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">Коротко о главном</h2>
        <div className="mt-8 grid gap-3">
          {items.map((item) => (
            <details key={item.q} className="surface-card group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold sm:text-base">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-ember transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormState = "idle" | "sending" | "done";

export function LeadSection({
  service,
  page,
  title,
  lead,
  placeholder,
}: {
  service: string;
  page: string;
  title: ReactNode;
  lead: string;
  placeholder: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    setError("");

    const payload = new FormData(form);
    payload.set("service", service);
    payload.set("page_url", window.location.href);

    const attribution = readAttribution();
    for (const [key, value] of Object.entries(attribution)) {
      if (value) payload.set(key, value);
    }

    try {
      const response = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Не удалось отправить заявку");
      }

      setState("done");
      reachGoal("lead_submit_success", { source: "b2c_form", page, service });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить заявку. Напишите нам в мессенджер.",
      );
      setState("idle");
    }
  }

  return (
    <section id="zayavka" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="surface-card relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/25 blur-[100px]"
            aria-hidden
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-eyebrow">Заявка</div>
              <h2 className="text-display mt-3 text-2xl sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">{lead}</p>

              <div className="mt-6 space-y-3 text-sm">
                <a href={PHONE_HREF} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-display text-base sm:text-lg">{PHONE_DISPLAY}</span>
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ember/15 text-ember">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {ADDRESS}
                </div>
              </div>

              <div className="mt-6">
                <MessengerButtons page={page} />
              </div>
            </div>

            {state === "done" ? (
              <div className="surface-card flex flex-col items-start justify-center gap-3 bg-background p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ember text-ember-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="text-display text-xl">Заявка отправлена</h3>
                <p className="text-sm text-muted-foreground">
                  Перезвоним в рабочее время. Если срочно — напишите в MAX или Telegram,
                  ответим быстрее.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid content-start gap-4">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />

                <label className="grid gap-2">
                  <span className="text-eyebrow">Имя</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none focus:border-ember"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-eyebrow">Телефон</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none focus:border-ember"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-eyebrow">Что нужно</span>
                  <textarea
                    name="details"
                    rows={3}
                    placeholder={placeholder}
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none focus:border-ember"
                  />
                </label>

                <label className="flex items-start gap-3 text-xs text-muted-foreground">
                  <input
                    name="consent"
                    type="checkbox"
                    value="1"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--ember)]"
                  />
                  <span>
                    Согласен на обработку персональных данных в соответствии с{" "}
                    <a href="/privacy/" className="underline hover:text-foreground">
                      политикой конфиденциальности
                    </a>
                    .
                  </span>
                </label>

                {error ? <p className="text-sm text-ember">{error}</p> : null}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="btn-ember inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold disabled:opacity-60"
                >
                  {state === "sending" ? "Отправляем…" : "Отправить заявку"}
                  {state === "sending" ? null : <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
