"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUseAddAvatar1647474489033 = void 0;

var _typeorm = require("typeorm");

class AlterUseAddAvatar1647474489033 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }

}

exports.AlterUseAddAvatar1647474489033 = AlterUseAddAvatar1647474489033;