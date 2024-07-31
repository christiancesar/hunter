import { beforeEach, describe, expect, it } from "vitest";
import CreateJobHuntService from "./CreateJobHuntService";
import { HuntersInMemoryRepository } from "../repositories/inMemory/HuntersInMemoryRepository";

let huntRepository: HuntersInMemoryRepository;
let createJobHuntService: CreateJobHuntService;
describe("Create Job Hunt Service", () => {
  beforeEach(() => {
    huntRepository = new HuntersInMemoryRepository();
    createJobHuntService = new CreateJobHuntService(huntRepository);
  });

  it("should be able to create a new job hunt", async () => {
    const hunter = await createJobHuntService.execute({
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

    expect(hunter).toHaveProperty("id");
  });
});
