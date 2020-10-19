import { Request, Response } from "express"; // Define os tipos dos parâmetros de cada método do Controller
import { getRepository } from "typeorm";

import Orphanage from "../models/Orphanage";
import OrphanageView from "../views/orphanages_view";

import * as Yup from "yup";

// EXPORTA-SE PARA ESTABELECER UMA CONEXÃO, NÃO PODE ESQUECER DE IMPORTAR NAS ROUTES.
export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"], //Cria um retorno na tabela de orfanatos para a tabela de imagens relacionadas
    });

    return response.json(OrphanageView.renderMany(orphanages));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body; // Para pegar o obj a se salvar

    const orphanagesRepository = getRepository(Orphanage);

    // Define que o que é passado como request.files é um Array de Files
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    /////////////////////////////////////////////////////////////////////////////////////
                                  // VALIDAÇÃO DE CAMPOS
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      latitude: Yup.number().required("Latitude obrigatória"),
      longitude: Yup.number().required("Longitude obrigatório"),
      about: Yup.string().required("Sobre obrigatório").max(1000),
      instructions: Yup.string().required("Instrução obrigatória"),
      opening_hours: Yup.string().required("Horário de funcionamento obrigatório"),
      open_on_weekends: Yup.boolean().required("Campo Aberto de Fim de Semana obrigatório"),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required("Foto obrigatório"),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false // Coletar todos os erros antes de retornar, ao invés de retornar quando encontra um erro
    });
    /////////////////////////////////////////////////////////////////////////////////////

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    // Status(201) é opcional
    return response.status(201).json(orphanage);
  },

  async show(request: Request, response: Response) {
    // O mesmo nome que se coloca no routes.get('/orphanages/:id<-')
    const { id } = request.params; // Para pegar o id na URL

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(OrphanageView.render(orphanage));
  },
};
