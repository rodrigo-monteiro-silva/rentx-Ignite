"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CraeteRentalController = require("../../../../modules/rentals/useCases/createRental/CraeteRentalController");

var _devolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController");

var _ListRentalByUserController = require("../../../../modules/rentals/useCases/listRentalUser/ListRentalByUserController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CraeteRentalController.CreateRentalController();
const devolutionRentalController = new _devolutionRentalController.DevolutionRentalController();
const listRentalsByUserrController = new _ListRentalByUserController.ListRentalByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserrController.handle);