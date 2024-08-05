import { BudgetsHuntedInMemoryRepository } from "@shared/database/inMemory/BudgetsHuntedInMemoryRepository";
import { unionDataHunted } from "@shared/helpers/unionDataHunted";
import { LogType } from "@shared/loggers/Observer";
import { Subject } from "@shared/loggers/Subject";
import "dotenv/config";
import puppeteer, { Browser, Page } from "puppeteer";
import { BudgetHuntedDTO } from "../dtos/BudgetHuntedDTO";
import { BudgetItemHuntedDTO } from "../dtos/BudgetItemHuntedDTO";
import { LooseItemHuntedDTO } from "../dtos/LooseItemHuntedDTO";
import { ScrapingDataNormalizeService } from "./ScrapingDataNormalizeService";
import { ScrapingDataNormalizeServiceFactory } from "../factories/ScrapingDataNormalizeServiceFactory";
import { CompareBudgetsHuntToBudgetsPersistedService } from "./CompareBudgetsHuntToBudgetsPersistedService";
import { CompareBudgetsHuntToBudgetsPersistedServiceFactory } from "../factories/CompareBudgetsHuntToBudgetsPersistedServiceFactory";

type BudgetHunterParams = {
  user: string;
  password: string;
  license: string;
  url: string;
};

export enum BudgetStatus {
  ORÇAMENTO = "O",
  AGENDADO = "A",
  VENDA = "V",
  FATURADO = "F",
  CANCELADO = "C",
}

type FilterParams = {
  initialDate: string;
  finalDate: string;
  budgetStatus: BudgetStatus;
  budgetId: number;
  huntPagesQuantity: number;
};

class BudgetHunter extends Subject {
  private user: string;
  private password: string;
  private license: string;
  private url: string;
  private browser: Browser;
  private page: Page;

  private budgetsHuntedInMemoryRepository: BudgetsHuntedInMemoryRepository;
  private scrapingDataNormalizeService: ScrapingDataNormalizeService;
  private compareBudgetsHuntToBudgetsPersistedService: CompareBudgetsHuntToBudgetsPersistedService;

  constructor({ user, password, license, url }: BudgetHunterParams) {
    super();
    this.user = user;
    this.password = password;
    this.license = license;
    this.url = url;
    this.browser = {} as Browser;
    this.page = {} as Page;

    this.budgetsHuntedInMemoryRepository =
      new BudgetsHuntedInMemoryRepository();

    this.scrapingDataNormalizeService =
      ScrapingDataNormalizeServiceFactory.make();

    this.compareBudgetsHuntToBudgetsPersistedService =
      CompareBudgetsHuntToBudgetsPersistedServiceFactory.make();
  }

  private async configure(): Promise<void> {
    this.notifyObservers({
      className: this.constructor.name,
      methodName: this.configure.name,
      message: "CONFIGURE PUPEETEER SETTINGS",
      logType: LogType.INFO,
    });

    this.browser = await puppeteer.launch({
      headless: false,
      // devtools: true,
      slowMo: 150,
      waitForInitialPage: true,
      defaultViewport: null,
    });
    this.page = await this.browser.newPage();
  }

  private async goToLoginPage(): Promise<void> {
    this.notifyObservers({
      className: this.constructor.name,
      methodName: this.goToLoginPage.name,
      message: "GO TO THE LOGIN PAGE",
      logType: LogType.INFO,
    });

    await this.page.goto(this.url, {
      waitUntil: ["load", "domcontentloaded", "networkidle2"],
    });

    await this.page.setJavaScriptEnabled(false);

    await this.page.type("#vLOGIN", this.user);

    await this.page.type("#vSENHA", this.password);

    await this.page.type("#vLICENCAIDAUX", this.license);

    await this.page.setJavaScriptEnabled(true);
    await this.page.waitForSelector("#ENTRAR", { visible: true });
    await this.page.click("#ENTRAR");
  }

  private async goToBudgetPage(): Promise<void> {
    this.notifyObservers({
      className: this.constructor.name,
      methodName: this.goToBudgetPage.name,
      message: "GO TO THE BUDGET PAGE",
      logType: LogType.INFO,
    });

    const budgetPageUrl =
      "https://sistema.wvetro.com.br/wvetro/app.core.wworcamento";
    await this.page.waitForNavigation();
    await this.page.goto(budgetPageUrl, {
      waitUntil: ["load", "domcontentloaded", "networkidle2"],
    });
  }

  private async setFilter(filter: FilterParams): Promise<void> {
    this.notifyObservers({
      className: this.constructor.name,
      methodName: this.configure.name,
      message: `APPLY FILTER: ${JSON.stringify(filter)}`,
      logType: LogType.INFO,
    });

    await this.page.waitForSelector("#BTN_SEARCH", { visible: true });

    await this.page.evaluate((filter) => {
      if (filter.budgetId !== 0) {
        (
          document.querySelector(
            "#TABLEDYNAMICFILTERS input",
          ) as HTMLInputElement
        ).value = filter.budgetId.toString();
      }

      //Change status to "Faturado"
      (
        document.querySelector("#vORCAMENTOSITUACAO") as HTMLSelectElement
      ).value = filter.budgetStatus;

      //Input data de cadastro
      const initialDate = document.querySelector(
        "#vORCAMENTODATACADASTRO",
      ) as HTMLInputElement;
      const finalDate = document.querySelector(
        "#vORCAMENTODATACADASTRO_TO",
      ) as HTMLInputElement;

      if (initialDate) {
        initialDate.value = filter.initialDate ?? "";
      }

      if (finalDate) {
        finalDate.value = filter.finalDate ?? "";
      }

      const btnGuide = document.querySelector(
        ".enjoyhint_skip_btn",
      ) as HTMLDivElement;

      if (btnGuide) {
        btnGuide.click();
      }

      (document.querySelector("#BTN_SEARCH") as HTMLButtonElement).click();
    }, filter);
  }

  public async getBudgets(params: FilterParams): Promise<BudgetHuntedDTO[]> {
    try {
      await this.goToLoginPage();
      await this.goToBudgetPage();
      await this.setFilter(params);

      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.getBudgets.name,
        message: "STARTING TO GET BUDGETS",
        logType: LogType.INFO,
      });

      await this.page.waitForSelector(".first.disabled");

      let paginationLenght = await this.page.evaluate(async () => {
        function navegatedOnFirstPage() {
          const firstButtonElementIsDisabled =
            document.querySelector(".first.disabled");

          if (!firstButtonElementIsDisabled) {
            const firstButtonElement = document.querySelector(".first a");
            (firstButtonElement as HTMLElement).click();
          }
        }

        function getPaginationLenght(selector: string): number {
          const buttonElementExist = document.querySelector(
            selector,
          ) as HTMLElement;

          let paginationLenght = 0;

          if (buttonElementExist) {
            const buttonElementText =
              buttonElementExist.innerText.match(/(\d+)(?!.*\d)/g);

            paginationLenght = buttonElementText
              ? Number(buttonElementText[0])
              : 0;

            navegatedOnFirstPage();
          }

          return paginationLenght;
        }

        return getPaginationLenght(
          ".PaginationBarCaption.dropdown .btn.btn-primary.dropdown-toggle",
        );
      });

      const budgetsHunted: BudgetHuntedDTO[] = [];

      paginationLenght =
        params.huntPagesQuantity > 0
          ? params.huntPagesQuantity
          : paginationLenght;

      for (let index = 0; index < paginationLenght; index++) {
        try {
          // get budgets in table and normalize data
          let budgets: BudgetHuntedDTO[] = [];

          budgets = await this.page.evaluate((): BudgetHuntedDTO[] => {
            //GET HEADERS VALUES
            const tHead = document.querySelector("thead");
            const tRow = tHead!.childNodes;

            const headValuesArray = [];

            for (
              let headIndex = 0;
              headIndex < tRow[0].childNodes.length;
              headIndex++
            ) {
              headValuesArray.push(
                (tRow[0].childNodes[headIndex] as HTMLElement).innerText,
              );
            }

            headValuesArray.push("link");

            const newValues = headValuesArray.map((value) => {
              return value.replace(/[^A-Z0-9]+/gi, "");
            });

            //GET TABLE BODY VALUES
            const budgetValuesArray = [];

            const tBody = document.querySelector("#GridContainerTbl tbody");
            const tRowBody = tBody!.childNodes; //eslint-disable-line

            let customerCaunt = 0;

            for (
              let rowBodyIndex = 0;
              rowBodyIndex < tRowBody.length;
              rowBodyIndex++
            ) {
              const tCollumnBody = tRowBody[rowBodyIndex].childNodes;
              const collumnData = [];

              for (
                let collumnBodyIndex = 0;
                collumnBodyIndex < tCollumnBody.length;
                collumnBodyIndex++
              ) {
                collumnData.push(
                  (tCollumnBody[collumnBodyIndex] as HTMLElement).innerText,
                );
              }

              customerCaunt++;

              const linkElement = (
                document.querySelector(
                  `td>p>span#span_CLIENTENOMERAZAO_${customerCaunt
                    .toString()
                    .padStart(4, "0")}>a`,
                ) as HTMLAnchorElement
              ).href;

              collumnData.push(linkElement);

              budgetValuesArray.push(collumnData);
            }

            //eslint-disable-next-line
            let budgetsValuesFmt: BudgetHuntedDTO[] = [];

            for (
              let bodyValuesIndex = 0;
              bodyValuesIndex < budgetValuesArray.length;
              bodyValuesIndex++
            ) {
              let budget = {} as BudgetHuntedDTO;

              for (
                let index = 0;
                index < budgetValuesArray[bodyValuesIndex].length;
                index++
              ) {
                const valuesFmt = {
                  [newValues[index]]: budgetValuesArray[bodyValuesIndex][index],
                };

                budget = {
                  ...budget,
                  ...valuesFmt,
                };
              }

              budgetsValuesFmt.push(budget);
            }

            return budgetsValuesFmt;
          });

          budgetsHunted.push(...budgets);

          this.notifyObservers({
            className: this.constructor.name,
            methodName: this.getBudgets.name,
            message: `
              Page ${index + 1} of ${paginationLenght},
              Budgets: ${JSON.stringify(
                budgets.map((budget) => budget.NroOrc),
              )},
              Budgets found: ${budgets.length}`,
            logType: LogType.INFO,
          });

          // eslint-disable-next-line prettier/prettier
          if (index < (paginationLenght - 1)) {
            // await this.page.waitForTimeout(4000);
            await this.page.waitForSelector(".next");
            await this.page.click(".next");
          }

          await this.page.waitForSelector("#GridContainerDiv");
        } catch (error: any) {
          this.notifyObservers({
            className: this.constructor.name,
            methodName: this.getBudgets.name,
            message: `
              Class Error: ${error.name}
              Message: ${error.message}
              Custom Message Error: Error on page ${index + 1}
            `,
            logType: LogType.ERROR,
          });
        }
      }

      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.getBudgets.name,
        message: "FINISHED TO GET BUDGETS AND START SAVING IN MEMORY.",
        logType: LogType.INFO,
      });

      const budgets =
        await this.compareBudgetsHuntToBudgetsPersistedService.execute(
          budgetsHunted,
        );

      await this.budgetsHuntedInMemoryRepository.saveAll(budgets);

      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.getBudgets.name,
        message: `SAVED ${
          budgets.length
        } BUDGETS IN MEMORY. BUDGETS: ${budgets.map(
          (budget) => budget.NroOrc,
        )}`,
        logType: LogType.INFO,
      });

      const budgetHunted = await this.getBudgetItems();

      return budgetHunted;
    } catch (error: any) {
      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.getBudgets.name,
        message: `
          Class Error: ${error.name}
          Message: ${error.message}
          Custom Message Error: Error on get budgets
        `,
        logType: LogType.ERROR,
      });
    }

    return [];
  }

  private async getBudgetItems(): Promise<BudgetHuntedDTO[]> {
    this.notifyObservers({
      className: this.constructor.name,
      methodName: this.getBudgetItems.name,
      message: "STARTING TO GET ITEMS BUDGETS ",
      logType: LogType.INFO,
    });

    //TODO: Compare budgets hunted in database with budgets hunted in memory, and get only the news budgets

    let budgetsHunted = await this.budgetsHuntedInMemoryRepository.findAll();

    for (let index = 0; index < budgetsHunted.length; index++) {
      try {
        await this.page.goto(budgetsHunted[index].link, {
          waitUntil: "networkidle0",
        });

        await this.page.waitForSelector("#W0094W0002GridContainerTbl", {
          visible: true,
        });

        const budgetItemsHunted = await this.page.evaluate(async () => {
          const budgetItemsTableHeadElement = document.querySelectorAll(
            "table#W0094W0002GridContainerTbl thead>tr>th",
          );

          const budgetItemsTableHeadNames = [] as string[];

          budgetItemsTableHeadElement.forEach((spanElement, index) => {
            let value;

            if ((spanElement as HTMLElement).innerText.trim() === "") {
              value = "void";
            } else {
              value = (spanElement as HTMLElement).innerText.replace(
                /[^A-Z0-9]+/gi,
                "",
              );
            }

            budgetItemsTableHeadNames.push(`${value}${index}`);
          });

          const rowItemsElements = document.querySelectorAll(
            "table#W0094W0002GridContainerTbl tbody tr",
          );

          const budgetItemsHunted: BudgetItemHuntedDTO[] = [];

          rowItemsElements.forEach((item) => {
            const rowItems = item.querySelectorAll("td");

            let budgetItemsNormalizedData = {} as BudgetItemHuntedDTO;

            rowItems.forEach((rowItem, index) => {
              budgetItemsNormalizedData = {
                ...budgetItemsNormalizedData,
                [budgetItemsTableHeadNames[index]]: rowItem.textContent,
              };
            });

            budgetItemsHunted.push(budgetItemsNormalizedData);
          });

          const cardHeaderNames = [
            "itenscesta",
            "vendaitens",
            "valorbruto",
            "valordesconto",
            "valorliquido",
          ];

          const cardsHeaderValue = [] as string[];

          document.querySelectorAll(".huge").forEach((element) => {
            cardsHeaderValue.push((element as HTMLElement).innerText);
          });

          let cardAmountRepository = {} as { [key: string]: string };

          cardHeaderNames.forEach((header, index) => {
            cardAmountRepository = {
              ...cardAmountRepository,
              [header]: cardsHeaderValue[index],
            };
          });

          return { cardAmountRepository, budgetItemsHunted };
        });

        let getLooseItems: LooseItemHuntedDTO[] = [];

        getLooseItems = await this.getLooseItems();

        const budgetsHuntedUpdated = {
          ...budgetsHunted[index],
          ...budgetItemsHunted.cardAmountRepository,
          items: budgetItemsHunted.budgetItemsHunted,
          looseItems: getLooseItems,
        } as BudgetHuntedDTO;

        //Todo: Update budget hunted in real database
        // await this.budgetsHuntedInMemoryRepository.update(budgetsHuntedUpdated); removed because it is save in memory
        await this.scrapingDataNormalizeService.execute(budgetsHuntedUpdated);

        const message = `
          Budget: ${index + 1} of ${budgetsHunted.length},
          Items: ${budgetsHuntedUpdated.items.length},
          Loose Items: ${getLooseItems.length},
          Total Items: ${
            budgetsHuntedUpdated.items.length + getLooseItems.length
          },
          Updated new hunting on budget ${
            budgetsHunted[index].NroOrc
          } in database ✔
        `;

        this.notifyObservers({
          className: this.constructor.name,
          methodName: this.getBudgetItems.name,
          message,
          logType: LogType.INFO,
        });

        console.log();
      } catch (error: any) {
        this.notifyObservers({
          className: this.constructor.name,
          methodName: this.getBudgetItems.name,
          message: `
            Class Error: ${error.name}
            Message: ${error.message}
            Custom Message Error: Error on budget ${budgetsHunted[index].NroOrc}
          `,
          logType: LogType.ERROR,
        });
      }
    }

    budgetsHunted = await this.budgetsHuntedInMemoryRepository.findAll();

    return budgetsHunted;
  }

  private async getLooseItems(): Promise<LooseItemHuntedDTO[]> {
    try {
      //get loose items
      await this.page.evaluate(async () => {
        (document.querySelector("#TABLEICONS_0002") as HTMLElement).click();
      });

      await this.page.waitForSelector("#W0094GridContainerTbl", {
        visible: true,
      });

      const looseItemsCount = await this.page.evaluate(async () => {
        return document.querySelectorAll("#W0094GridContainerTbl tbody>tr")
          .length;
      });

      let looseItemsHunted: LooseItemHuntedDTO[] = [];

      if (looseItemsCount > 0) {
        const looseItemsHeaderNames = await this.page.evaluate(async () => {
          const tableHeaderNames = document.querySelectorAll(
            "#W0094GridContainerTbl thead>tr>th",
          );

          const headNamesValues: string[] = [];
          let index = 0;
          for (const headName of tableHeaderNames) {
            index++;
            if ((headName as HTMLElement).innerText.trim() === "") {
              headNamesValues.push(`void${index}`);
            } else {
              headNamesValues.push(
                `${(headName as HTMLElement).innerText.replace(
                  /[^A-Z0-9]+/gi,
                  "",
                )}${index}`,
              );
            }
          }

          return headNamesValues;
        });

        const looseItemsRowData = await this.page.evaluate(async () => {
          const tableBodyRowElements = document.querySelectorAll(
            "#W0094GridContainerTbl tbody>tr",
          );

          const tableBodyData: string[][] = [];

          for (const tableBodyRowElement of tableBodyRowElements) {
            const collumnsElements = tableBodyRowElement.querySelectorAll("td");
            const collumnData = [];
            for (const collumnElement of collumnsElements) {
              collumnData.push(collumnElement.innerText);
            }
            tableBodyData.push(collumnData);
          }

          return tableBodyData;
        });

        looseItemsHunted = unionDataHunted<LooseItemHuntedDTO>(
          looseItemsHeaderNames,
          looseItemsRowData,
        );
      }

      return looseItemsHunted;
    } catch (error: any) {
      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.getLooseItems.name,
        message: `
          Class Error: ${error.name}
          Message: ${error.message}
          Custom Message Error: Error on get loose items}
        `,
        logType: LogType.ERROR,
      });
    }

    return [];
  }

  public async toHunt(filter: FilterParams): Promise<BudgetHuntedDTO[]> {
    try {
      await this.configure();
      const budgetHunted = await this.getBudgets(filter);

      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.toHunt.name,
        message: `Finished Hunting. Budgets: ${budgetHunted?.length}`,
        logType: LogType.INFO,
      });

      return budgetHunted;
    } catch (error: any) {
      this.notifyObservers({
        className: this.constructor.name,
        methodName: this.toHunt.name,
        message: `
          Class Error: ${error.name}
          Message: ${error.message}
          Custom Message Error: "Contact the developer to check, there are errors in data capture."}
        `,
        logType: LogType.ERROR,
      });

      return [];
    } finally {
      await this.browser.close();
    }
  }
}

export class BudgetHunterBuilderService {
  private user: string;
  private password: string;
  private license: string;
  private url: string;

  constructor() {
    this.user = process.env.WVETRO_USER || "";
    this.password = process.env.WVETRO_PASSWORD || "";
    this.license = process.env.WVETRO_LICENSE || "";
    this.url = process.env.WVETRO_URL || "";
  }

  getParams(): BudgetHunterParams {
    return {
      user: this.user,
      password: this.password,
      license: this.license,
      url: this.url,
    };
  }

  build(): BudgetHunter {
    return new BudgetHunter(this.getParams());
  }
}
