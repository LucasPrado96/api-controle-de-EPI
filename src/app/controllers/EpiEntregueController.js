import Epi from "../models/Epis";
import FichaEpi from "../models/FichaEpi";
import EpiEntregue from "../models/EpiEntregue";
import * as Yup from "yup";

class EpiEntregueController {
  async store(request, response) {
    const schema = Yup.object({
      funcionario_id: Yup.number().required(),
      epi_id: Yup.string().required(),
      nome: Yup.string().required(),
      quantidade: Yup.number().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ Error: err.errors });
    }

    const { funcionario_id, epi_id, nome, quantidade } = request.body;

    try {
      const ficha = await FichaEpi.findOne({ where: { funcionario_id } });

      if (!ficha) {
        return response.status(404).json({ error: "Ficha não encontrada" });
      }

      const epi = await Epi.findByPk(epi_id);

      if (!epi) {
        return response.status(404).json({ error: "Epi não encontrado" });
      }

      if (epi.quantity < quantidade) {
       return response.status(400).json({ erro: "Saldo insuficiente" });
      }

      const entrega = await EpiEntregue.create({
        ficha_id: ficha.id,
        epi_id,
        nome,
        quantidade,
        data_entregue: new Date(),
      });

      epi.quantity -= quantidade;
      await epi.save();

      return response.status(201).json(entrega);
    } catch (err) {
      return response.status(500).json({ error: "Erro ao registrar entrega" });
    }
  }
}

export default new EpiEntregueController();
