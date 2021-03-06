"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = require("express");
const CraeteRentalController_1 = require("../../../../modules/rentals/useCases/createRental/CraeteRentalController");
const devolutionRentalController_1 = require("../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController");
const ListRentalByUserController_1 = require("../../../../modules/rentals/useCases/listRentalUser/ListRentalByUserController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const rentalRoutes = (0, express_1.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new CraeteRentalController_1.CreateRentalController();
const devolutionRentalController = new devolutionRentalController_1.DevolutionRentalController();
const listRentalsByUserrController = new ListRentalByUserController_1.ListRentalByUserController();
rentalRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated_1.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", ensureAuthenticated_1.ensureAuthenticated, listRentalsByUserrController.handle);
