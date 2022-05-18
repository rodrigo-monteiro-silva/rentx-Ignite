"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const EtherealMailProvider_1 = require("./implementations/EtherealMailProvider");
const SesMailProvider_1 = require("./implementations/SesMailProvider");
const mailProvider = {
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.EtherealMailProvider),
    ses: tsyringe_1.container.resolve(SesMailProvider_1.SESMailProvider),
};
tsyringe_1.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
