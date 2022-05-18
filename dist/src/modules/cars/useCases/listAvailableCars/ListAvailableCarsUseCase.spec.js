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
Object.defineProperty(exports, "__esModule", { value: true });
const CarsRepositoryInMemory_1 = require("../../repositories/in-memory/CarsRepositoryInMemory");
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });
        const cars = yield listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            name: "Car3",
        });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "12345",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        expect(cars).toEqual([car]);
    }));
});
