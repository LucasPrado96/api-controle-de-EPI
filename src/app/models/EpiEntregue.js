import { Model, DataTypes } from 'sequelize';

class EpiEntregue extends Model{
    static init(sequelize) {
        super.init(
            {
            ficha_id: DataTypes.INTEGER,
            epi_id: DataTypes.INTEGER,
            quantidade: DataTypes.INTEGER,
            data_entrega: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'episentregue'
        });
 }

 static associate(models){
    this.belongsTo(models.FichaEpi, {
        foreignKey: 'ficha_id',
        as: 'ficha'
    });

    this.belongsTo(models.Epi, {
        foreignKey: 'epi_id',
        as: 'epi'
    });
 }
}

export default EpiEntregue