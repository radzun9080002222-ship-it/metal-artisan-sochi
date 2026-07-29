import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist");
const routes = ["vacancies"];

for (const route of routes) {
  const routeDir = path.join(outputDir, route);
  const routeFile = path.join(routeDir, "index.html");
  await mkdir(routeDir, { recursive: true });
  await copyFile(path.join(outputDir, "index.html"), routeFile);

  if (route === "vacancies") {
    let html = await readFile(routeFile, "utf8");
    const replacements = new Map([
      [
        "Изготовление металлоконструкций и каркасов БНС — Каркас Инвест",
        "Вакансии на производстве в Адлере — Каркас Инвест",
      ],
      [
        "Изготовление металлоконструкций и арматурных каркасов БНС в Сочи. Производство, сварка и монтаж по чертежам заказчика, поставка по России и СНГ.",
        "Работа на производстве металлоконструкций в Адлере на ул. Гастелло. Вакансии крановщика-стропальщика, электрика и сварщика.",
      ],
      [
        '<link rel="canonical" href="https://karkas-invest.ru/" />',
        '<link rel="canonical" href="https://karkas-invest.ru/vacancies/" />',
      ],
      [
        "Каркас Инвест — изготовление металлоконструкций и каркасов БНС",
        "Работа на производстве в Адлере — Каркас Инвест",
      ],
      [
        "Собственное производство в Сочи: каркасы БНС, закладные детали и металлоконструкции по чертежам. Работаем по России и СНГ.",
        "Открытые вакансии на производстве металлоконструкций: крановщик-стропальщик, электрик и сварщик.",
      ],
      [
        '<meta property="og:url" content="https://karkas-invest.ru/" />',
        '<meta property="og:url" content="https://karkas-invest.ru/vacancies/" />',
      ],
      [
        "https://karkas-invest.ru/og-image.png",
        "https://karkas-invest.ru/assets/vacancy-crane-rigger.webp",
      ],
      [
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:width" content="1536" />',
      ],
      [
        '<meta property="og:image:height" content="630" />',
        '<meta property="og:image:height" content="1024" />',
      ],
      [
        "Каркас Инвест — производство металлоконструкций",
        "Крановщик-стропальщик на производстве Каркас Инвест",
      ],
      [
        "Каркас Инвест — металлоконструкции и каркасы БНС",
        "Вакансии на производстве — Каркас Инвест",
      ],
      [
        "Производство металлоконструкций в Сочи с поставкой по России и СНГ.",
        "Работа крановщиком-стропальщиком, электриком и сварщиком в Адлере.",
      ],
    ]);

    for (const [from, to] of replacements) {
      html = html.replaceAll(from, to);
    }
    await writeFile(routeFile, html);
  }
}
