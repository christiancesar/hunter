import { IBudgetItemsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetItemsRepository";
import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { IEmployeesRepository } from "src/modules/employees/repositories/IEmployeesRepository";
import { ICommissionsRepository } from "../repositories/ICommissionsRepository";
import dayjs from "dayjs";

type MonthlyCommissionServiceParams = {
  startDate: string;
  endDate: string;
};

type MonthlyCommissionServiceConstructor = {
  commissionsRepository: ICommissionsRepository;
  employeesRepository: IEmployeesRepository;
  budgetItemsRepository: IBudgetItemsRepository;
  budgetsRepository: IBudgetsRepository;
};

type EmployeeCommission = {
  id: string;
  name: string;
};

type BudgetItemsCommission = {
  id: string;
  quantity: number;
  amount: number;
  commissionPercent: number;
  divisionBy: number;
  commissionAmount: number;
  divisionWith: {
    id: string;
    name: string;
  }[];
  serviceTypeCommission: string;
};

type BudgetCommission = {
  id: string;
  shortId: number;
  customerName: string;
  item: BudgetItemsCommission;
};

type CommissionDetails = {
  employee: EmployeeCommission;
  budgets: BudgetCommission[];
  totalProducedItems: number;
  commissionAmount: number;
};

type CommissionManager = {
  id: string;
  month: string;
  year: number;
  startDate: Date;
  endDate: Date;
  commissions: CommissionDetails[];
  sumOfAllCommissions: number;
  createdAt: Date;
};

export default class MonthlyCommissionService {
  private commissionsRepository: ICommissionsRepository;
  private employeesRepository: IEmployeesRepository;
  private budgetItemsRepository: IBudgetItemsRepository;
  private budgetsRepository: IBudgetsRepository;
  constructor({
    commissionsRepository,
    employeesRepository,
    budgetItemsRepository,
    budgetsRepository,
  }: MonthlyCommissionServiceConstructor) {
    this.commissionsRepository = commissionsRepository;
    this.employeesRepository = employeesRepository;
    this.budgetItemsRepository = budgetItemsRepository;
    this.budgetsRepository = budgetsRepository;
  }
  async execute({ startDate, endDate }: MonthlyCommissionServiceParams) {
    const startDateOfDay = dayjs(startDate).startOf("day").toDate();
    const endDateOfDay = dayjs(endDate).endOf("day").toDate();

    const employees = await this.employeesRepository.listall();

    const month = dayjs(startDate)
      .toDate()
      .toLocaleString("pt-BR", { month: "long" })
      .toLocaleUpperCase();
    const year = dayjs(startDate).get("year");

    const commissions = await Promise.all(
      employees.map(async (employee) => {
        const commissionsFilteredByPeriod =
          await this.commissionsRepository.findCommissionByPeriod({
            startDate: startDateOfDay,
            endDate: endDateOfDay,
            employeeId: employee.id,
          });

        if (commissionsFilteredByPeriod.length !== 0) {
          const budgets: BudgetCommission[] = [];

          await Promise.all(
            commissionsFilteredByPeriod.map(async (commission) => {
              const employeeCommissionExist = commission.employeeIds.find(
                (id) => id === employee.id,
              );

              if (employeeCommissionExist) {
                const budget = await this.budgetsRepository.findById(
                  commission.budgetId,
                );
                const budgetItem = await this.budgetItemsRepository.findById(
                  commission.budgetItemId,
                );

                const divisionWith = commission.employees.filter(
                  (employeeCommission) => {
                    if (employeeCommission.id !== employee.id) {
                      return {
                        id: employeeCommission.id,
                        name: employeeCommission.name,
                      };
                    }
                  },
                );

                budgets.push({
                  id: commission.budgetId,
                  shortId: budget!.shortId,
                  customerName: budget!.customer!.name,
                  item: {
                    id: budgetItem!.id,
                    quantity: budgetItem!.quantity,
                    amount: commission.budgetItemAmount,
                    commissionPercent: commission.commissionPercent,
                    divisionBy: commission.divisionBy,
                    commissionAmount: commission.commissionAmount,
                    divisionWith,
                    serviceTypeCommission:
                      commission.serviceTypeCommission.name,
                  },
                });
              }
            }),
          );

          return {
            employee: {
              id: employee.id,
              name: employee.name,
            },
            budgets,
            commissionAmount: commissionsFilteredByPeriod.reduce(
              (acc, commission) => {
                return acc + commission.commissionAmount;
              },
              0,
            ),
            totalProducedItems: commissionsFilteredByPeriod.reduce(
              (acc, commission) => {
                return acc + commission.budgetItemQuantity;
              },
              0,
            ),
          } as CommissionDetails;
        }
      }),
    );

    const commissionsFiltered: CommissionDetails[] = [];
    commissions.forEach((commission) => {
      if (commission !== undefined && commission !== null) {
        commissionsFiltered.push(commission);
      }
    });

    const sumOfAllCommissions = commissionsFiltered.reduce(
      (acc, commission) => {
        return acc + commission.commissionAmount;
      },
      0,
    );

    const commissionManager: CommissionManager = {
      id: crypto.randomUUID(),
      month,
      year,
      startDate: startDateOfDay,
      endDate: endDateOfDay,
      commissions: commissionsFiltered,
      sumOfAllCommissions,
      createdAt: new Date(),
    };

    return commissionManager;
  }
}
