"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _Category = require("../entities/Category");

var _typeorm = require("typeorm");

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create({
    description,
    name
  }) {
    const category = this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name) {
    // Select * from categories where name = "name" limit 1
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;