import * as Yup from "yup";
import FichaEpi from "../models/FichaEpi.js";
import Funcionario from "../models/Funcionarios.js";
import EpiEntregue from "../models/EpiEntregue.js";
import Epi from "../models/Epis.js";

class FichaEpiControlle {
  async index(request, response){
    const fichas = await FichaEpi.findAll()
    return response.status(202).json(fichas)
  }

  async show(request, response) {
    const { funcionario_id } = request.params;

   try{
    const ficha = await FichaEpi.findOne({
        where: {
          funcionario_id,
        }, 
        include: [
          {
            model: Funcionario,
            as: "funcionario",
            attributes: ["id", "nome", "cargo", "data_admissao"],
          },
  
          {
            model: EpiEntregue,
            as: "episEntregue",
            include: [
              {
                model: Epi,
                as: "epi",
                attributes: ["id", "name", "code", "ca"],
              },
            ],
          },
        ],
      });

      if (!ficha) {
        return response
          .status(404)
          .json({ error: "Ficha nao encontrada para este funcionário" });
      }
      return response.json(ficha);
   } catch(err){
        return response.status(500).json({error: 'Erro ao buscar ficha.'})
   }

    

   
  }
}

export default new FichaEpiControlle();
