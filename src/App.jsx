import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Factory,
  FileText,
  Gauge,
  Hammer,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Truck,
  Upload,
  Wrench,
} from "lucide-react";
import { readAttribution, reachGoal, trackContact } from "./analytics.js";

const PHONE_DISPLAY = "+7 (918) 003-93-74";
const PHONE_HREF = "tel:+79180039374";
const WHATSAPP_HREF = "https://wa.me/79180039374";
const TELEGRAM_HREF =
  "https://t.me/+79180039374?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%80%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7.&profile";
const LEAD_ENDPOINT =
  import.meta.env.VITE_LEAD_ENDPOINT?.trim() ||
  "https://leads.62.60.248.177.nip.io/api/leads";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

const services = [
  {
    title: "Арматурные каркасы БНС",
    text: "Каркасы для буронабивных свай, серийные партии и крупные объемы под строительный график.",
    image: "/media/rebar-cage.webp",
    tags: ["БНС", "серии", "объект"],
  },
  {
    title: "Емкости, кольца, трубы",
    text: "Изделия из листового металла, обечайки, трубы и нестандартные узлы диаметром до 2 метров.",
    image: "/media/tank-finished.webp",
    tags: ["лист", "до 2 м", "сварка"],
  },
  {
    title: "Резка и обработка металла",
    text: "Плазменная резка, рубка, подготовка деталей, фасонные элементы для рекламы и строительства.",
    image: "/media/plasma-table.webp",
    tags: ["плазма", "точность", "чертеж"],
  },
  {
    title: "Монтаж металлоконструкций",
    text: "Выездная сборка и монтаж конструкций на объекте: фасады, каркасы, фермы и усиления.",
    image: "/media/montage-frame.webp",
    tags: ["монтаж", "кран", "сроки"],
  },
];

const proof = [
  ["248 млн ₽", "выручка за 2024 год по открытым данным"],
  ["21 чел.", "среднесписочная численность за 2025 год"],
  ["2023", "год регистрации ООО"],
  ["Сочи", "производство и работа по югу России"],
];

const stages = [
  {
    icon: FileText,
    title: "Чертежи и ТЗ",
    text: "Принимаем КМ/КМД, эскизы и спецификации. Если данных не хватает, сразу отмечаем вопросы.",
  },
  {
    icon: Ruler,
    title: "Расчет и спецификация",
    text: "Считаем объем, металл, операции, сроки и фиксируем понятную структуру работ.",
  },
  {
    icon: Factory,
    title: "Производство",
    text: "Резка, гибка, сварка, сборка партий, маркировка и подготовка к отгрузке.",
  },
  {
    icon: Truck,
    title: "Доставка и монтаж",
    text: "Передаем готовые изделия или закрываем объект монтажной бригадой.",
  },
];

const gallery = [
  { src: "/media/montage-crane.webp", label: "Монтаж на объекте" },
  { src: "/media/tank-lift.webp", label: "Листовые конструкции" },
  { src: "/media/torch-cut.webp", label: "Газовая резка" },
  { src: "/media/rebar-close.webp", label: "Арматурные каркасы" },
  { src: "/media/boxes.webp", label: "Готовые изделия" },
  { src: "/media/workshop.webp", label: "Цех и сварка" },
];

function App() {
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    if (!LEAD_ENDPOINT) {
      setFormStatus("error");
      setFormMessage(
        `Онлайн-отправка ещё подключается. Позвоните ${PHONE_DISPLAY} или напишите менеджеру в Telegram.`,
      );
      return;
    }

    const file = form.elements.drawing?.files?.[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setFormStatus("error");
      setFormMessage("Файл больше 15 МБ. Отправьте его менеджеру в Telegram или WhatsApp.");
      return;
    }

    setFormStatus("loading");
    setFormMessage("Отправляем заявку…");

    const payload = new FormData(form);
    const attribution = readAttribution();
    Object.entries(attribution).forEach(([key, value]) => payload.append(key, value));
    payload.append("page_url", window.location.href);
    payload.append("referrer", document.referrer || "direct");

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || `HTTP ${response.status}`);
      }

      setFormStatus("success");
      setFormMessage("Заявка принята. Свяжемся с вами в рабочее время.");
      reachGoal("lead_submit_success", {
        service: payload.get("service"),
        has_drawing: Boolean(file),
      });
      form.reset();
      setFileName("");
    } catch (error) {
      console.error("Lead submission failed", error);
      setFormStatus("error");
      setFormMessage(
        `Не удалось отправить заявку. Позвоните ${PHONE_DISPLAY} или напишите менеджеру в Telegram.`,
      );
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setFileName(file?.name || "");
    if (file) {
      reachGoal("drawing_attached", { extension: file.name.split(".").pop()?.toLowerCase() });
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Каркас Инвест">
          <span className="brand-mark" aria-hidden="true">
            <span>КИ</span>
          </span>
          <span className="brand-text">
            <strong>Каркас Инвест</strong>
            <small>металлоконструкции</small>
          </span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#works">Работы</a>
          <a href="#standard">Стандарт</a>
          <a href="#projects">Проекты</a>
          <a href="#request">Расчет</a>
        </nav>
        <a className="header-action" href="#request">
          <MessageCircle size={18} />
          Заявка
        </a>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-bg-video"
          src="/media/hero-process.mp4"
          poster="/media/plasma-table.webp"
          muted
          autoPlay
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            Производство · обработка · монтаж
          </div>
          <h1>Металлоконструкции по чертежам. Без срыва графика.</h1>
          <p>
            ООО «Каркас Инвест» закрывает производственные задачи для монолита,
            промышленных и коммерческих объектов: БНС, закладные детали, листовые
            изделия, резка, сварка и монтаж.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#request">
              Рассчитать заказ
              <ArrowRight size={19} />
            </a>
            <a className="button ghost" href="#projects">
              Смотреть работы
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Производственный контур">
          <span>Контур работ</span>
          <strong>От чертежа до монтажа</strong>
          <ul>
            <li>
              <Check size={16} />
              расчет по КМ, КМД и спецификации
            </li>
            <li>
              <Check size={16} />
              серийное изготовление партий
            </li>
            <li>
              <Check size={16} />
              обработка, сварка, маркировка
            </li>
            <li>
              <Check size={16} />
              доставка и монтаж на объекте
            </li>
          </ul>
        </aside>
        <div className="hero-facts">
          {proof.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a className="scroll-cue" href="#works" aria-label="Перейти к работам">
          <ChevronDown size={22} />
        </a>
      </section>

      <section className="section intro-band">
        <div>
          <span className="section-kicker">Подрядчик для стройки</span>
          <h2>Изготавливаем не «примерно такое», а то, что нужно по проекту.</h2>
        </div>
        <p>
          Берем чертежи заказчика, подбираем технологию, согласуем объем и
          сдаем результат в формате, с которым удобно выходить на объект:
          партиями, с маркировкой, доставкой и монтажом.
        </p>
      </section>

      <section className="section services" id="works">
        <div className="section-heading">
          <span className="section-kicker">Типы работ</span>
          <h2>Основные направления</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <img src={service.image} alt={service.title} />
              <div className="service-body">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="tags">
                  {service.tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section standard" id="standard">
        <div className="standard-copy">
          <span className="section-kicker">Стандарт Каркас Инвест</span>
          <h2>Крупный заказ должен быть предсказуемым.</h2>
          <p>
            В металле цена ошибки слишком высокая: простой крана, сорванная
            бетонная смена или переделка узла стоят дороже нормальной
            подготовки. Поэтому сайт продает не только сварку, а управляемый
            подряд.
          </p>
        </div>
        <div className="standard-list">
          <div>
            <Gauge />
            <h3>Производственная база</h3>
            <p>Станки, сварочные посты, плазма, работа с листом и арматурой.</p>
          </div>
          <div>
            <ShieldCheck />
            <h3>Документы и фиксация</h3>
            <p>Договор, спецификация, сроки, порядок оплаты и приемки.</p>
          </div>
          <div>
            <TimerReset />
            <h3>Сроки под график</h3>
            <p>Партии можно планировать под бетон, монтаж или отгрузку.</p>
          </div>
          <div>
            <Wrench />
            <h3>Нестандартные задачи</h3>
            <p>Изделия по чертежам заказчика, а не только типовые позиции.</p>
          </div>
        </div>
      </section>

      <section className="process">
        <div className="section process-inner">
          <div className="section-heading">
            <span className="section-kicker">Как работаем</span>
            <h2>От чертежа до монтажа</h2>
          </div>
          <div className="stage-grid">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <article key={stage.title}>
                  <span>{index + 1}</span>
                  <Icon size={28} />
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-heading compact">
          <span className="section-kicker">Реальные кадры</span>
          <h2>Производство, которое видно</h2>
        </div>
        <div className="gallery">
          {gallery.map((item, index) => (
            <figure key={item.src} className={index === 0 ? "wide" : ""}>
              <img src={item.src} alt={item.label} />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="video-proof">
        <div className="video-copy">
          <span className="section-kicker">Серийное изготовление</span>
          <h2>Арматурные каркасы не собираются на обещаниях.</h2>
          <p>
            Для рекламы это сильный материал: можно показывать не абстрактный
            «опыт», а процесс изготовления и масштаб партии.
          </p>
          <ul>
            <li>
              <Check size={17} />
              каркасы для буронабивных свай
            </li>
            <li>
              <Check size={17} />
              большие партии под объект
            </li>
            <li>
              <Check size={17} />
              производство и отгрузка в одном контуре
            </li>
          </ul>
        </div>
        <video src="/media/rebar-machine.mp4" muted autoPlay loop playsInline />
      </section>

      <section className="section request" id="request">
        <div className="request-copy">
          <span className="section-kicker">Быстрый расчет</span>
          <h2>Пришлите чертежи. Вернем расчет без лишних кругов.</h2>
          <p>
            Укажите тип работ и ориентировочный объем. Для точной цены нужны
            чертежи, марка металла, объем партии, адрес объекта и желаемые
            сроки.
          </p>
          <div className="contact-strip">
            <a href={PHONE_HREF} onClick={() => trackContact("phone")}>
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("telegram")}
            >
              <MessageCircle size={18} />
              Telegram
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp")}
            >
              WhatsApp
            </a>
          </div>
        </div>
        <form className="quote-box" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="honeypot"
            type="text"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="field-grid">
            <label>
              Имя <span aria-hidden="true">*</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Компания
              <input name="company" type="text" autoComplete="organization" />
            </label>
          </div>
          <label>
            Телефон <span aria-hidden="true">*</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 900 000-00-00"
              required
            />
          </label>
          <label>
            Направление <span aria-hidden="true">*</span>
            <select name="service" defaultValue="Каркасы БНС" required>
              <option>Каркасы БНС</option>
              <option>Изделия и металлоконструкции по чертежам</option>
              <option>Кольца и небольшие детали</option>
              <option>Гибка, сверление и обработка</option>
              <option>Бурение и экскаваторы</option>
              <option>Доставка, манипулятор и длинномер</option>
            </select>
          </label>
          <label>
            Объём, сроки и город объекта
            <textarea
              name="details"
              rows="4"
              placeholder="Например: 12 каркасов БНС Ø 800 мм, Краснодар, нужны к 20 августа"
            />
          </label>
          <label className="file-field">
            Чертёж или ТЗ до 15 МБ
            <span className="file-control">
              <Upload size={19} />
              {fileName || "Выбрать файл"}
            </span>
            <input
              name="drawing"
              type="file"
              accept=".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
              onChange={handleFileChange}
            />
          </label>
          <label className="consent-field">
            <input name="consent" type="checkbox" required />
            <span>
              Согласен на обработку персональных данных в соответствии с{" "}
              <a href="/privacy/" target="_blank" rel="noreferrer">
                политикой конфиденциальности
              </a>
              .
            </span>
          </label>
          <button className="button primary full" type="submit" disabled={formStatus === "loading"}>
            {formStatus === "loading" ? "Отправляем…" : "Получить расчет"}
            <Hammer size={18} />
          </button>
          {formMessage && (
            <p className={`form-message ${formStatus}`} role="status" aria-live="polite">
              {formMessage}
            </p>
          )}
        </form>
      </section>

      <footer>
        <div>
          <strong>Каркас Инвест</strong>
          <span>ООО · ИНН 2367031991 · Сочи</span>
        </div>
        <a href="#top">Наверх</a>
      </footer>
    </main>
  );
}

export default App;
