import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CraeteRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalByUserController } from "../../../../modules/rentals/useCases/listRentalUser/ListRentalByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserrController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserrController.handle
);

export { rentalRoutes };
