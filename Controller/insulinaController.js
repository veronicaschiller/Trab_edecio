import dbKnex from "../Data/db_config.js";

export const insulinaIndex = async (req, res) => {
  try {
    const insulina = await dbKnex.select("*").from("insulina");
    res.status(200).json(insulina);
  } catch (error) {
     res.status(400).json({ id: 0, msg: "Erro:" } + error.message);
  }
};
export const insulinaAdd = async (req, res) => {
  const { Glicose_momento, Nph, complemento, Rapida } = req.body;

  if (!Glicose_momento || !Nph || !complemento || !Rapida) {
    res.json({ id: 0, msg: "Erro informe as quantidades de insulina " });
    return;
  }
  try {
    const novaInsulina = await dbKnex("insulina").insert({ Glicose_momento, Nph, complemento, Rapida });
    res.status(201) .json({ id: novaInsulina[0], msg: "ok inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "ops esta faltando dados" });
  }
};

export const insulinaDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await dbKnex("insulina").where({ id }).del();
    res.json({ id,  msg: "Ok! Excluído com sucesso" });
  } catch (error){
      res.status(400).json({ msg:"Error" } + error.message)
  }
};

export const insuPesq = async (req, res) => {
  const { id } = req.params;
  try {
    const insuEncontrado = await dbKnex.select("*").from("insulina").where({ id })
    if(insuEncontrado.length == 0){
      res.status(400).json({ id: 0, msg:"Insulina não encontrada ou não existe"})
      return
    }
    res.status(200).json({ id: insuEncontrado[0]})
  } catch (error) { 
    res.status(400).json({ msg: "Error" } + error.message)
  }
};

export const insuUpdate = async (req, res) => {
  const { id } = req.params;
  const { Glicose_momento, Nph, complemento, Rapida } = req.body;

  if (!Glicose_momento || !Nph || !complemento || !Rapida) {
    res.json({ id: 0, msg: "informe todos os dados" });
    return;
  }
  try {
    const insulinaAlterada = await dbKnex("insulina").where({ id })
      .update({Glicose_momento,Nph, complemento, Rapida});
    res.status(200).json({ id: insulinaAlterada[0], msg: "okay dados atulizados" });
  } catch (error) {
    res.status(400).json({ msg:"Error" } + error.message);
  }
};