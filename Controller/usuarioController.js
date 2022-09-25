import dbknex from "../Data/db_config.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const usuarioIndex = async (req, res) => {
  try {
    const usuario = await dbknex.select("*").from("usuario").orderBy("Nome");
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro:" } + error.message);
  }
};

export const insertUsuario = async (req, res) => {
  const { Nome, CPF, email, senha } = req.body;
  
  if (!Nome || !CPF || !email || !senha) {
    res.status(400).json({ id: 0, msg: "Erro! Por favor complete seu cadastro" });
    return;
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(senha, salt);
  try {
    const newUser = await dbknex("usuario").insert({ Nome, CPF, email, senha: hash });
    res.status(201).json({ id: newUser[0], msg: "okay novo paciente incluido " });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Error" + error.message});
  }
};
export const userUpdate = async (req, res) => {
  const { id } = req.params;

  const { Nome, CPF, email, senha } = req.body;

  if (!Nome || !CPF || !email ||  !senha) {
    res.json({ id: 0, msg: "informe todos os dados" });
    return;
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(senha, salt);
  try {
    const userAlterarado = await dbknex("usuario")
      .where({ id })
      .update({ Nome, CPF, email, senha: hash});
    res
      .status(203)
      .json({ id: userAlterarado[0], msg: "Okay, dados atulizados" });
  } catch (error) {
    res.status(400).json({msg:"Error"} + error.message);
  }
};

export const userDelete = async(req, res) => {
  const { id } = req.params;

  try {
      await dbknex("usuario").where({ id }).del()
      res.status(202).json({id, msg: "Ok! Usuario removido com sucesso "})
  } catch (error) {
      res.status(400).json({ msg: "Error"} + error.message)
  }
}

export const userPesq = async (req, res) =>{
  const { Nome } =req.params

  if (!Nome) {
      res.json({id:0 , msg: "Nome deve ser preenchido "})
      return
  }
  try {
      const userEncontrado = await dbknex.select("*").from("usuario").whereLike('nome', `${Nome}%`)
      res.status(200).json(userEncontrado)
  } catch (error) {
      res.status(400).json({id: 0 , msg: "ops! usuario não encontrado"})
  }
}
