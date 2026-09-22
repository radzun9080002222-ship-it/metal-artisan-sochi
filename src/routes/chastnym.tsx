import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import {
  B2CLayout,
  Faq,
  Gallery,
  Hero,
  LeadSection,
  ServiceGrid,
  Steps,
  TrustStrip,
  type ServiceItem,
} from "@/components/b2c/shared";
import {
  BendIllustration,
  CanopyIllustration,
  CarportIllustration,
  GateIllustration,
  GrillIllustration,
  RailingIllustration,
  StairsIllustration,
  StirrupIllustration,
} from "@/components/b2c/illustrations";

export const Route = createFileRoute("/chastnym")({
  head: () => ({
    meta: [
      { title: "Изделия из металла на заказ для частных лиц в Сочи — Каркас Инвест" },
      {
        name: "description",
        content:
          "Свой цех в Адлере на ул. Гастелло: навесы, ворота, ограждения, лестницы, хомуты, кольца для свай и гибка металла. Расчёт по вашим размерам, работаем с частными заказчиками.",
      },
      {
        property: "og:title",
        content: "Металл для дома и участка в Сочи — Каркас Инвест",
      },
      {
        property: "og:description",
        content:
          "Навесы, ворота, ограждения, лестницы и мелкая металлообработка. Собственное производство в Адлере, расчёт по вашим размерам.",
      },
      { property: "og:url", content: "https://karkas-invest.ru/chastnym/" },
    ],
    links: [{ rel: "canonical", href: "https://karkas-invest.ru/chastnym/" }],
  }),
  component: ChastnymPage,
});

const PAGE = "chastnym";

const services: ServiceItem[] = [
  {
    title: "Навесы для машины",
    desc: "Односкатные и арочные навесы во двор, на парковку, над террасой. Профтруба, поликарбонат или профнастил.",
    Illustration: CarportIllustration,
  },
  {
    title: "Ворота и калитки",
    desc: "Откатные и распашные ворота, калитки, зашивка профлистом или жалюзи. Возможность установки автоматики обсудим при расчёте.",
    Illustration: GateIllustration,
  },
  {
    title: "Ограждения и перила",
    desc: "Заборы, балконные и лестничные ограждения, перила для крыльца, отбойники на парковке.",
    Illustration: RailingIllustration,
  },
  {
    title: "Лестницы",
    desc: "Уличные и внутренние лестницы на косоуре, эвакуационные и пожарные марши, площадки обслуживания.",
    Illustration: StairsIllustration,
  },
  {
    title: "Козырьки над входом",
    desc: "Козырьки над крыльцом и калиткой, навесы над окнами, решётки на окна и приямки.",
    Illustration: CanopyIllustration,
  },
  {
    title: "Мангальные зоны",
    desc: "Мангалы, смокеры, каркасы беседок и барбекю-зон. Делаем по вашему эскизу или по фото.",
    Illustration: GrillIllustration,
  },
];

const gallery = [
  { src: "/assets/karkas-yard.webp", alt: "Готовые арматурные каркасы на площадке производства" },
  { src: "/assets/welding.webp", alt: "Сварка металлоконструкции в цехе" },
  { src: "/assets/bending.webp", alt: "Гибка металла на производстве" },
  { src: "/assets/montazh.webp", alt: "Монтаж металлоконструкции на объекте" },
  { src: "/assets/kolco.webp", alt: "Кольца из листового металла собственного производства" },
  { src: "/assets/rezka.webp", alt: "Резка металла в производственном цехе" },
];

const steps = [
  {
    n: "01",
    title: "Пришлите фото или эскиз",
    desc: "Подойдёт снимок места, набросок от руки или ссылка на похожее изделие. Чертёж не нужен.",
  },
  {
    n: "02",
    title: "Согласуем стоимость и срок",
    desc: "Называем стоимость и срок. При необходимости согласуем замер по Сочи и Адлеру.",
  },
  {
    n: "03",
    title: "Делаем и привозим",
    desc: "Изготавливаем в своём цехе, доставляем и монтируем. Условия доставки и монтажа согласуем при заказе.",
  },
];

const faq = [
  {
    q: "Работаете с частными лицами или только с организациями?",
    a: "И с теми, и с другими. Стоимость, порядок оплаты и документы согласуем перед началом работ.",
  },
  {
    q: "Нужен ли чертёж?",
    a: "Нет. Достаточно фотографии места, размеров и эскиза от руки. Если размеров нет, обсудим возможность замера.",
  },
  {
    q: "Выезжаете на замер?",
    a: "Возможность и стоимость выезда по Сочи и Адлеру согласуем при обращении. Для крупных изделий нужны точные размеры.",
  },
  {
    q: "Сколько ждать изделие?",
    a: "Срок зависит от изделия, количества и загрузки цеха. Согласуем его вместе со стоимостью до начала работ.",
  },
  {
    q: "Можно ли забрать самому?",
    a: "Да. Производство в Адлере на ул. Гастелло, забрать можно в рабочее время. Доставку по Сочи тоже организуем.",
  },
  {
    q: "Даёте гарантию?",
    a: "Гарантийные условия зависят от изделия и покрытия. Обсудим и зафиксируем их при оформлении заказа.",
  },
];

function DirectionCards() {
  const directions = [
    {
      to: "/metalloobrabotka" as const,
      Illustration: StirrupIllustration,
      title: "Металлообработка на заказ",
      desc: "Хомуты, кольца для свай, гибка арматуры и трубы, закладные детали, резка.",
      hint: "Срок изготовления согласуем при расчёте",
    },
    {
      to: "/svarochnye-raboty" as const,
      Illustration: BendIllustration,
      title: "Сварка и изделия под ключ",
      desc: "Навесы, ворота, ограждения, перила, лестницы, козырьки, решётки и мангальные зоны с монтажом.",
      hint: "Замер по Сочи и Адлеру — по согласованию",
    },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-eyebrow">Два направления</div>
        <h2 className="text-display mt-3 text-2xl sm:text-4xl">С чем к нам приходят</h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {directions.map((direction) => (
            <Link
              key={direction.to}
              to={direction.to}
              className="surface-card group flex flex-col p-6 transition-colors hover:border-ember/50 sm:p-8"
            >
              <div className="text-ember">
                <direction.Illustration className="h-16 w-24" />
              </div>
              <h3 className="text-display mt-5 text-xl sm:text-2xl">{direction.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{direction.desc}</p>
              <div className="mt-5 text-xs text-muted-foreground">{direction.hint}</div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-ember">
                Смотреть и считать
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChastnymPage() {
  return (
    <B2CLayout activeTo="/chastnym">
      <Hero
        page={PAGE}
        eyebrow="Частным лицам · Сочи и Адлер"
        title={
          <>
            Металл для дома <span className="text-ember">и участка</span>
          </>
        }
        lead="Собственный цех в Адлере на ул. Гастелло. Делаем и один хомут, и навес под ключ. Чертежи не нужны — достаточно фото и размеров."
        bullets={[
          "Своё производство и кран — работаем без посредников",
          "Рассчитываем стоимость по вашей задаче",
          "Принимаем фото или эскиз от руки вместо чертежа",
          "Стоимость и условия согласуем до начала работ",
        ]}
        image="/assets/hero-karkas.webp"
        imageAlt="Производство металлоконструкций Каркас Инвест в Адлере"
      />

      <TrustStrip
        items={[
          { value: "Адлер, Гастелло", label: "Свой цех, забрать можно самому" },
          { value: "По вашим размерам", label: "Расчёт стоимости и срока" },
          { value: "10+ лет", label: "На рынке Сочи" },
          { value: "Физлица и компании", label: "Условия согласуем при заказе" },
        ]}
      />

      <DirectionCards />

      <ServiceGrid
        page={PAGE}
        eyebrow="Изделия"
        title="Что делаем для частных заказчиков"
        items={services}
      />

      <Steps items={steps} />

      <Gallery items={gallery} />

      <Faq items={faq} />

      <LeadSection
        page={PAGE}
        service="Частным лицам"
        title={
          <>
            Опишите задачу — <span className="text-ember">рассчитаем стоимость</span>
          </>
        }
        lead="Фото, размеры или просто словами. Перезвоним и назовём цену и срок. Если удобнее переписка — пишите в MAX, WhatsApp или Telegram."
        placeholder="Например: навес во двор 6×4 м, есть фото места"
      />
    </B2CLayout>
  );
}
