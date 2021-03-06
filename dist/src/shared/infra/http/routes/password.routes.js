"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRoutes = void 0;
const express_1 = require("express");
const ResetPasswordUserController_1 = require("../../../../modules/accounts/resetPasswordUser/ResetPasswordUserController");
const SendForgotPasswordMailController_1 = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");
const passwordRoutes = (0, express_1.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new SendForgotPasswordMailController_1.SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController_1.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);
