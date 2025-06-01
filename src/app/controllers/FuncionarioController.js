import * as Yup from 'yup'
import Funcionario from '../models/Funcionarios'
import FichaEpi from '../models/FichaEpi';


class FuncionarioController {
    async store(request, response){
        const schema = Yup.object({
            nome: Yup.string().required(),
            cargo: Yup.string().required(),
            data_admissao: Yup.date().required(),
        })

        try {
            schema.validateSync(request.body, { abortEarly: false });
          } catch (err) {
            return response.status(400).json({ Error: err.errors });
            
          }

          const { nome, cargo, data_admissao} = request.body

          try{
            const funcionario = await Funcionario.create({
              nome,
              cargo,
              data_admissao
              })
    
              const ficha = await FichaEpi.create({
                funcionario_id: funcionario.id,
                data_entrega: new Date(),
                observacao:  '' //esse campo será usado no futuro depois que criar o funcionario
              })
    
              return response.status(201).json({funcionario, ficha})
          } catch(err){
            console.error('Erro ao criar ficha:', err); 
            return response.status(500).json({ error: 'Erro ao cadastrar funcionário e ficha' });
          }

         
    }

    async index( request, response){
      const funcionarios = await Funcionario.findAll();
      return response.status(200).json(funcionarios)
    }

    async delete(request, response){
      const {id} = request.params

      const funcio = await Funcionario.findByPk(id)

      if(!funcio){
        return response.status(404).json({message: "funcionario não encontrado"})
      }

      await funcio.destroy();
      return response.status(202).json({Message: "Funcionario deletado"})
    }
}

export default new FuncionarioController()