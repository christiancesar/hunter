import { beforeEach, describe, expect, it } from "vitest";
import ListAllHuntersJobService from "./ListAllHuntersJobService";
import { HuntersInMemoryRepository } from "../repositories/inMemory/HuntersInMemoryRepository";
import CreateJobHuntService from "./CreateJobHuntService";

let huntRepository: HuntersInMemoryRepository;
let listAllHuntersJobService: ListAllHuntersJobService;
let createJobHuntService: CreateJobHuntService;

describe("List All Job Hunt Service", () => {
  beforeEach(() => {
    huntRepository = new HuntersInMemoryRepository();
    listAllHuntersJobService = new ListAllHuntersJobService(huntRepository);
    createJobHuntService = new CreateJobHuntService(huntRepository);
  });

  it("should be able list job hunters", async () => {
    await createJobHuntService.execute({
      credentials: {
        license: "123456",
        password: "123456",
        user: "john_doe",
      },
      filter: {
        budgetId: 0,
        budgetStatus: "F",
        finalDate: "",
        huntPagesQuantity: 1,
        initialDate: "",
      },
    });

    await createJobHuntService.execute({
      credentials: {
        license: "123456",
        password: "123456",
        user: "john_doe",
      },
      filter: {
        budgetId: 0,
        budgetStatus: "F",
        finalDate: "",
        huntPagesQuantity: 1,
        initialDate: "",
      },
    });

    const hunters = await listAllHuntersJobService.execute();

    expect(hunters).toHaveLength(2);
  });
});
