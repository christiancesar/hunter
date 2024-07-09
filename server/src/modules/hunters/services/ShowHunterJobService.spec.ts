import { beforeEach, describe, expect, it } from "vitest";
import ShowHunterJobService from "./ShowHunterJobService";
import { HuntersInMemoryRepository } from "../repositories/inMemory/HuntersInMemoryRepository";
import CreateJobHuntService from "./CreateJobHuntService";
import { AppError } from "@shared/errors/AppError";

let huntRepository: HuntersInMemoryRepository;
let showHunterJobService: ShowHunterJobService;
let createJobHuntService: CreateJobHuntService;
describe("Show Job Hunter Service", () => {
  beforeEach(() => {
    huntRepository = new HuntersInMemoryRepository();
    showHunterJobService = new ShowHunterJobService(huntRepository);
    createJobHuntService = new CreateJobHuntService(huntRepository);
  });

  it("should be able show hunter job", async () => {
    const hunterCreated = await createJobHuntService.execute({
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

    const hunter = await showHunterJobService.execute(hunterCreated.id);

    expect(hunter).toEqual(expect.objectContaining({ id: hunterCreated.id }));
  });

  it("should not be able to return hunter if id not sent", async () => {
    await expect(() => showHunterJobService.execute("")).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it("should not be able to return hunter if id not exist", async () => {
    await expect(() =>
      showHunterJobService.execute("id-not-exist"),
    ).rejects.toBeInstanceOf(AppError);
  });
});
