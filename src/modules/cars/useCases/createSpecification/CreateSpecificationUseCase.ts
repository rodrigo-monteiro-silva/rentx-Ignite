import { ISpecificationsRepository } from "../../repositories/ISpcecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specicationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specicationAlreadyExists) {
      throw new Error("Specification already Exists!");
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
