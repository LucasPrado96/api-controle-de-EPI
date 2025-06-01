import Sequelize, { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"




class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (Users) => {
      if(Users.password){
        Users.password_hash = await bcrypt.hash(Users.password, 10)
      }
    });
 
    return this;

  }

  async checkPassword(password){
   return bcrypt.compare(password, this.password_hash);
  }
}

export default Users;
