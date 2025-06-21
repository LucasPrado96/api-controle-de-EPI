import * as Yup from "yup";
import { Sequelize } from "sequelize";
import Epi from "../models/Epis";

class EpiController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      code: Yup.string().required(),
      quantity: Yup.number().required(),
      ca: Yup.string().nullable(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ Error: err.errors });
    }

    const { name, code, quantity, ca } = request.body;

    const epiExists = await Epi.findOne({
      where: { code },
    });

    if (epiExists) {
      response.status(401).json({ error: "Já existe um Epi com esse " });
    }

    const epi = await Epi.create({
      name,
      code,
      quantity,
      ca,
    });

    return response.status(201).json(epi);
  }

  async addstock(request, response) {
    const schema = Yup.object({
      code: Yup.string().required(),
      quantity: Yup.number().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ Error: err.errors });
    }

    const { code, quantity } = request.body;

    const epi = await Epi.findOne({
      where: { code },
    });

    if (!epi) {
      return response.status(404).json({ error: "Epi não encontrado." });
    }

    epi.quantity += quantity;
    await epi.save();

    return response.status(200).json(epi);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      code: Yup.string().required(),
      quantity: Yup.number().required(),
      ca: Yup.string().nullable(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ Error: err.errors });
    }

    const {id} = request.params

    const {name, code, quantity, ca} = request.body
    
    await Epi.update(
      {
      name,
      code,
      quantity,
      ca
      },
      {
        where:{
          id,
        },
      }
  )

    return response.status(200).json();
  }

  async index(request, response) {
    const epis = await Epi.findAll();
    return response.status(200).json(epis);
  }

  async delete(request, response) {
    const { id } = request.params;

    const epis = await Epi.findByPk(id);

    if (!epis) {
      return response
        .status(404)
        .json({ erro: "nao foi possivel excluir esse Epi" });
    }

    await epis.destroy();
    return response.status(202).json({ Message: "Epi deletado com sucesso" });
  }
}

export default new EpiController();
