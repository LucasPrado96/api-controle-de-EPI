import { Model, DataTypes } from "sequelize";


class FichaEpi extends Model{
static init(sequelize){
    super.init(
        {
        data_entrega: DataTypes.DATE,
        observacao: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'fichaepi'
    }
  )
  return this
}

static associate(models){
    this.belongsTo(models.Funcionario, {
        foreignKey: 'funcionario_id',
        as: 'funcionario'
    });

    this.hasMany(models.EpiEntregue, {
        foreignKey: 'ficha_id',
        as: 'episEntregue'
    });
}

}

export default FichaEpi

//verificar se os models de funcionarios e EpiEntregue estão configurado com associations
//corretamente