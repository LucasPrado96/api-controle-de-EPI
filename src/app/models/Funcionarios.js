import { Model, DataTypes } from "sequelize";

class Funcionario extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            cargo: DataTypes.STRING,
            data_admissao: DataTypes.DATE,

        },{
            sequelize,
            tableName: 'funcionarios'
         });

         return this
    }

    static associate(models){
        this.hasOne(models.FichaEpi, {
            foreignKey: 'funcionario_id',
            as: 'ficha'
        })
    }
}

export default Funcionario