import Sequelize, { Model, DataTypes } from "sequelize";

class Epi extends Model {
  static init(sequelize) {
    super.init(
        {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      ca: DataTypes.STRING,
    },
    {
        sequelize
    }
);

return this
  }
}

export default Epi;
 