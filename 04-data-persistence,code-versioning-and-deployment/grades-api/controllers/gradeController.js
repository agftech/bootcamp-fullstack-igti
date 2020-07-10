import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const gradeModel = db.grades;

const create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Dados de inserção vazio",
      });
    }
    const grades = new gradeModel(
      {
        ...req.body,
      },
      { new: true, useFindAndModify: false }
    );
    const data = await grades.save();
    res.send(data);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const data = await gradeModel.find(condition).exec();
    res.send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await gradeModel.findById(id).exec();
    res.send(data);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await gradeModel
      .findByIdAndUpdate(id, req.body, {
        new: true,
        useFindAndModify: false,
      })
      .exec();

    if (!data) {
      throw new Error(`Grade id ${id} nao encontrado`);
    } else {
      res.send({ message: "Grade atualizado com sucesso" });
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await gradeModel.findByIdAndDelete(id).exec();
    const data = await gradeModel.findById(id).exec();
    if (!data) {
      res.send({
        message: `Grades excluidos`,
      });
    } else {
      res.status(403).send("Grade nao encontrada na colecao");
    }
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_, res) => {
  try {
    await gradeModel.deleteMany({}).exec();
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
