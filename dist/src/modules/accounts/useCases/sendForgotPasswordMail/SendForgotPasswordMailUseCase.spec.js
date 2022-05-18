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
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("../../../../shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("../../repositories/in-memory/UsersRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("should be able to send a forgot password mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        yield usersRepositoryInMemory.create({
            driver_license: "837434",
            email: "haji@siswabez.is",
            name: "Essie Warren",
            password: "1234",
        });
        yield sendForgotPasswordMailUseCase.execute("haji@siswabez.is");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send a email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("ruchebra@epcubhun.sy")).rejects.toEqual(new AppError_1.AppError("User does not exists!"));
    }));
    it("should be able to create an user token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
        usersRepositoryInMemory.create({
            driver_license: "369117",
            email: "ujci@lugfidew.si",
            name: "Lenora Schneider",
            password: "1234",
        });
        yield sendForgotPasswordMailUseCase.execute("ujci@lugfidew.si");
        expect(generateTokenMail).toBeCalled();
    }));
});
