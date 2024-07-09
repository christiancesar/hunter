import handlebars from "handlebars";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

type CommissionRepostData = {
  header: {
    companyName: string;
    employeeName: string;
    monthRef: string;
  };
  content: {
    count: number;
    budgetShorId: number;
    budgeCustomerName: string;
    budgetItemOrder: number;
    budgetItemDescription: string;
    budgetItemQuantity: string;
    budgetItemNetAmount: string;
    commissionPercent: string;
    commissionGrossRecevedAmount: string;
    commissionDivisionBy: string;
    commissionNetReceveidAmount: string;
    commissionServieType: string;
    commissionEmployeesNameDivisonBy: string;
  }[];
  footerTotalItems: string;
  footerTotalCommissionReceved: string;
};

const data: CommissionRepostData = {
  header: {
    companyName: "Weber & Soares Ltda",
    employeeName: "Christian Cesar Rodrigues Santos",
    monthRef: "Junho 2024",
  },
  content: [
    {
      count: 1,
      budgetShorId: 2548,
      budgeCustomerName: "Cristiano Ronaldo",
      budgetItemOrder: 1,
      budgetItemDescription: "Porta de Correr 4 folhas | Gold",
      budgetItemQuantity: Number(1).toLocaleString("pt-BR", {
        style: "decimal",
        maximumFractionDigits: 2,
      }),
      budgetItemNetAmount: Number(1000).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      commissionPercent: Number(1 / 100).toLocaleString("pt-BR", {
        style: "percent",
      }),
      commissionGrossRecevedAmount: Number(10).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      commissionDivisionBy: Number(1).toLocaleString("pt-BR", {
        style: "decimal",
        maximumFractionDigits: 2,
      }),
      commissionNetReceveidAmount: Number(10).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      commissionServieType: "Montagem",
      commissionEmployeesNameDivisonBy: "---",
    },
  ],
  footerTotalItems: Number(1).toLocaleString("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2,
  }),
  footerTotalCommissionReceved: Number(10.0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
};

export default async function compilepdf() {
  const file = path.resolve(
    __dirname,
    "views",
    "commission-report-template.hbs",
  );

  const templateFileContent = await fs.promises.readFile(file, {
    encoding: "utf-8",
  });

  const parseTemplate = handlebars.compile(templateFileContent);

  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  const page = await browser.newPage();

  await page.setContent(parseTemplate({ data }), {
    waitUntil: "domcontentloaded",
  });
  await page.emulateMediaType("screen");

  await page.setDefaultNavigationTimeout(0);

  const pdf = await page.pdf({
    format: "A4",
    landscape: true,
    displayHeaderFooter: false,
    preferCSSPageSize: false,
    printBackground: true,
  });
  await browser.close();
  return pdf;
}
