"use strict";

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "837434",
      email: "haji@siswabez.is",
      name: "Essie Warren",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("haji@siswabez.is");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ruchebra@epcubhun.sy")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "369117",
      email: "ujci@lugfidew.si",
      name: "Lenora Schneider",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("ujci@lugfidew.si");
    expect(generateTokenMail).toBeCalled();
  });
});