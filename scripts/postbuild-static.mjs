import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist");

// Строки из index.html, которые подменяются для каждого маршрута.
// Статическая сборка не выполняет SSR, поэтому мета-теги подставляются здесь —
// иначе поисковик увидит на всех страницах мета главной.
const BASE = {
  title: "Изготовление металлоконструкций и каркасов БНС — Каркас Инвест",
  description:
    "Изготовление металлоконструкций и арматурных каркасов БНС в Сочи. Производство, сварка и монтаж по чертежам заказчика, поставка по России и СНГ.",
  canonical: '<link rel="canonical" href="https://karkas-invest.ru/" />',
  ogTitle: "Каркас Инвест — изготовление металлоконструкций и каркасов БНС",
  ogDescription:
    "Собственное производство в Сочи: каркасы БНС, закладные детали и металлоконструкции по чертежам. Работаем по России и СНГ.",
  ogUrl: '<meta property="og:url" content="https://karkas-invest.ru/" />',
  ogImage: "https://karkas-invest.ru/og-image.png",
  ogImageWidth: '<meta property="og:image:width" content="1200" />',
  ogImageHeight: '<meta property="og:image:height" content="630" />',
  ogImageAlt: "Каркас Инвест — производство металлоконструкций",
  twitterTitle: "Каркас Инвест — металлоконструкции и каркасы БНС",
  twitterDescription: "Производство металлоконструкций в Сочи с поставкой по России и СНГ.",
};

const ORGANIZATION = {
  "@type": "Organization",
  name: "ООО «Каркас Инвест»",
  url: "https://karkas-invest.ru/",
  telephone: "+7-918-003-93-74",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Краснодарский край",
    addressLocality: "Сочи",
    streetAddress: "ул. Гастелло",
  },
};

function serviceLd({ name, description, url, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: ORGANIZATION,
    areaServed: [
      { "@type": "City", name: "Сочи" },
      { "@type": "AdministrativeArea", name: "Адлерский район" },
    ],
    audience: { "@type": "Audience", audienceType: "Частные лица" },
  };
}

function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

const routes = {
  vacancies: {
    title: "Вакансии на производстве в Адлере — Каркас Инвест",
    description:
      "Работа на производстве металлоконструкций в Адлере на ул. Гастелло. Вакансии крановщика-стропальщика, электрика и сварщика.",
    canonical: "https://karkas-invest.ru/vacancies/",
    ogTitle: "Работа на производстве в Адлере — Каркас Инвест",
    ogDescription:
      "Открытые вакансии на производстве металлоконструкций: крановщик-стропальщик, электрик и сварщик.",
    ogImage: "https://karkas-invest.ru/assets/vacancy-crane-rigger.webp",
    ogImageWidth: "1536",
    ogImageHeight: "1024",
    ogImageAlt: "Крановщик-стропальщик на производстве Каркас Инвест",
    twitterTitle: "Вакансии на производстве — Каркас Инвест",
    twitterDescription: "Работа крановщиком-стропальщиком, электриком и сварщиком в Адлере.",
  },

  chastnym: {
    title: "Изделия из металла на заказ для частных лиц в Сочи — Каркас Инвест",
    description:
      "Свой цех в Адлере на ул. Гастелло: навесы, ворота, ограждения, лестницы, хомуты, кольца для свай и гибка металла. Расчёт в день обращения, работаем с частными заказчиками.",
    canonical: "https://karkas-invest.ru/chastnym/",
    ogTitle: "Металл для дома и участка в Сочи — Каркас Инвест",
    ogDescription:
      "Навесы, ворота, ограждения, лестницы и мелкая металлообработка. Собственное производство в Адлере, расчёт в день обращения.",
    ogImageAlt: "Изделия из металла на заказ для частных лиц в Сочи",
    twitterTitle: "Металл для дома и участка — Каркас Инвест",
    twitterDescription:
      "Навесы, ворота, ограждения и мелкая металлообработка в Сочи и Адлере.",
    jsonLd: [
      serviceLd({
        name: "Изделия из металла на заказ для частных лиц",
        description:
          "Навесы, ворота, ограждения, перила, лестницы, козырьки, мангальные зоны, хомуты, кольца для свай и гибка металла для частных заказчиков в Сочи и Адлере.",
        url: "https://karkas-invest.ru/chastnym/",
        serviceType: "Изготовление металлоизделий на заказ",
      }),
      faqLd([
        [
          "Работаете с частными лицами или только с организациями?",
          "И с теми, и с другими. Для частного заказчика принимаем наличные и перевод на карту, договор составим по желанию.",
        ],
        [
          "Нужен ли чертёж?",
          "Нет. Достаточно фотографии места, размеров и эскиза от руки. Если размеров нет, приедем и замерим сами.",
        ],
        [
          "Выезжаете на замер?",
          "Да, по Сочи и Адлеру. Для навесов и ворот замер обязателен.",
        ],
        [
          "Можно ли забрать самому?",
          "Да. Производство в Адлере на ул. Гастелло, забрать можно в рабочее время.",
        ],
      ]),
    ],
  },

  metalloobrabotka: {
    title: "Металлообработка в Сочи: хомуты, кольца для свай, гибка — Каркас Инвест",
    description:
      "Хомуты, кольца для каркасов свай, арматурные каркасы БНС, закладные детали, гибка арматуры и трубы, резка листа. Свой цех в Адлере на ул. Гастелло, расчёт в день обращения.",
    canonical: "https://karkas-invest.ru/metalloobrabotka/",
    ogTitle: "Металлообработка в Сочи — хомуты, кольца, гибка, закладные",
    ogDescription:
      "Мелкие металлоизделия и обработка металла в Адлере: от одной штуки, расчёт в день обращения.",
    ogImageAlt: "Металлообработка и изготовление металлоизделий в Адлере",
    twitterTitle: "Металлообработка в Сочи — Каркас Инвест",
    twitterDescription: "Хомуты, кольца для свай, гибка, резка и закладные детали от одной штуки.",
    jsonLd: [
      serviceLd({
        name: "Металлообработка и изготовление металлоизделий",
        description:
          "Хомуты, кольца для каркасов свай, арматурные каркасы БНС, закладные детали, гибка арматуры и профильной трубы, плазменная резка листа, сварочные работы по эскизу.",
        url: "https://karkas-invest.ru/metalloobrabotka/",
        serviceType: "Металлообработка",
      }),
      faqLd([
        [
          "Сколько штук минимум?",
          "Делаем и от одной штуки. Разовые заказы берём.",
        ],
        [
          "Нужен ли чертёж?",
          "Нет, достаточно размеров и эскиза от руки. Файл раскроя тоже возьмём в работу.",
        ],
        [
          "Как быстро готово?",
          "Мелкие позиции, как правило, в день обращения или на следующий день.",
        ],
        [
          "Как оплатить?",
          "Частному заказчику — наличными или переводом на карту. Организациям выставим счёт.",
        ],
      ]),
    ],
  },

  "svarochnye-raboty": {
    title: "Навесы, ворота, ограждения и лестницы на заказ в Сочи — Каркас Инвест",
    description:
      "Изготовление и монтаж навесов, ворот, калиток, ограждений, перил, лестниц, козырьков и мангальных зон в Сочи и Адлере. Свой цех, выезд на замер, расчёт в день обращения.",
    canonical: "https://karkas-invest.ru/svarochnye-raboty/",
    ogTitle: "Навесы, ворота и ограждения на заказ в Сочи — Каркас Инвест",
    ogDescription:
      "Сварные изделия для дома и участка с монтажом: навесы, ворота, перила, лестницы. Производство в Адлере.",
    ogImageAlt: "Навесы, ворота и ограждения на заказ в Сочи",
    twitterTitle: "Навесы, ворота и ограждения — Каркас Инвест",
    twitterDescription: "Сварные изделия для дома и участка с монтажом в Сочи и Адлере.",
    jsonLd: [
      serviceLd({
        name: "Изготовление и монтаж сварных металлоизделий",
        description:
          "Навесы для машины, козырьки, откатные и распашные ворота, калитки, ограждения и заборы, перила, лестницы на косоуре, решётки на окна, мангальные зоны.",
        url: "https://karkas-invest.ru/svarochnye-raboty/",
        serviceType: "Сварочные работы и изготовление металлоконструкций",
      }),
      faqLd([
        [
          "Выезжаете на замер?",
          "Да, по Сочи и Адлеру. Для навесов, ворот и лестниц замер обязателен.",
        ],
        [
          "Монтаж делаете сами?",
          "Да, своей бригадой — той же, что работает у нас на объектах.",
        ],
        [
          "Можно по своему эскизу или по фото?",
          "Да. Повторим понравившееся изделие и скажем, во что это обойдётся.",
        ],
        [
          "Работаете с частными лицами?",
          "Да. Оплата наличными или переводом на карту, договор по желанию.",
        ],
      ]),
    ],
  },
};

function buildReplacements(route) {
  const pairs = [
    [BASE.title, route.title],
    [BASE.description, route.description],
    [BASE.canonical, `<link rel="canonical" href="${route.canonical}" />`],
    [BASE.ogTitle, route.ogTitle],
    [BASE.ogDescription, route.ogDescription],
    [BASE.ogUrl, `<meta property="og:url" content="${route.canonical}" />`],
    [BASE.ogImageAlt, route.ogImageAlt],
    [BASE.twitterTitle, route.twitterTitle],
    [BASE.twitterDescription, route.twitterDescription],
  ];

  if (route.ogImage) {
    pairs.push([BASE.ogImage, route.ogImage]);
  }
  if (route.ogImageWidth) {
    pairs.push([
      BASE.ogImageWidth,
      `<meta property="og:image:width" content="${route.ogImageWidth}" />`,
    ]);
  }
  if (route.ogImageHeight) {
    pairs.push([
      BASE.ogImageHeight,
      `<meta property="og:image:height" content="${route.ogImageHeight}" />`,
    ]);
  }

  return pairs;
}

function renderJsonLd(blocks) {
  return blocks
    .map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block).replaceAll("<", "\\u003c")}</script>`,
    )
    .join("");
}

for (const [slug, route] of Object.entries(routes)) {
  const routeDir = path.join(outputDir, slug);
  const routeFile = path.join(routeDir, "index.html");
  await mkdir(routeDir, { recursive: true });
  await copyFile(path.join(outputDir, "index.html"), routeFile);

  let html = await readFile(routeFile, "utf8");

  for (const [from, to] of buildReplacements(route)) {
    if (!html.includes(from)) {
      throw new Error(`postbuild: строка не найдена в index.html для /${slug}/: ${from}`);
    }
    html = html.replaceAll(from, to);
  }

  if (route.jsonLd?.length) {
    html = html.replace("</head>", `${renderJsonLd(route.jsonLd)}</head>`);
  }

  await writeFile(routeFile, html);
}
