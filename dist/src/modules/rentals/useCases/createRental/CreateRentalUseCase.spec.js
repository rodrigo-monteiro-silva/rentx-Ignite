"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const AppError_1 = require("../../../../shared/errors/AppError");
const CarsRepositoryInMemory_1 = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");
const RentalsRepositoryInMemory_1 = require("../../repositories/in-memory/RentalsRepositoryInMemory");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe("Create Rental", () => {
    const dayAdd24Hours = (0, dayjs_1.default)().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });
    it("should be able to create a new rental", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });
        const rental = yield createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    }));
    it("should not be able to create a new rental if there's another open to the same user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345",
        });
        yield expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("There's a rental in progress for user!"));
    }));
    it("should not be able to create a new rental if there's another open to the same car", () => __awaiter(void 0, void 0, void 0, function* () {
        yield rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "12345",
        });
        yield expect(createRentalUseCase.execute({
            user_id: "321",
            car_id: "test",
            expected_return_date: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("Car is unavailable"));
    }));
    it("should not be able to create a new rental with invalid return time", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: "test",
            expected_return_date: (0, dayjs_1.default)().toDate(),
        })).rejects.toEqual(new AppError_1.AppError("Invalid return time!"));
    }));
});
