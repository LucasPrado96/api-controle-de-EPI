import Sequelize from "sequelize";
import dbConfig from "../config/database.cjs"

import Epi from "../app/models/Epis.js";
import Users from "../app/models/User.js";
import Funcionario from "../app/models/Funcionarios.js";
import FichaEpi from "../app/models/FichaEpi.js";
import EpiEntregue from "../app/models/EpiEntregue.js";

const models = [ Users, Epi, Funcionario, EpiEntregue, FichaEpi ]


class Datebase{
    constructor(){
        this.init()
    }

    init(){
        this.connection = new Sequelize(dbConfig);

        models.map(model => model.init(this.connection));

        models.forEach(model => {
            if(typeof model.associate === 'function'){
                model.associate(this.connection.models)
            }
        })
    }

    // init(){
    //     this.connection = new Sequelize(dbConfig);
    //     models.map((model) => model.init(this.connection)).map(model => model.associate(this.connection.models))
        
    // }
}

export default new Datebase()
