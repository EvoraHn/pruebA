var conn = require('../../../utils/dao');
var ObjectID = require('mongodb').ObjectId;
var _db;
class Ad{
  adColl =null;
  constructor(){
    this.initModel();
  }
  async initModel(){
     try {
      _db = await conn.getDB();
       this.adColl = await _db.collection("TEST");
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
  }
  

  //agregar un nuevo diagnostico (Registro)
  async addNew(Paciente,Sexo,Edad,Descripcion,Pregunta1,Pregunta2,Pregunta3,Pregunta4,Pregunta5,id){
    let newAd = {
      Paciente:Paciente,
      Sexo:Sexo,
      Edad:Edad,
      Descripcion:Descripcion,
      Pregunta1:0,
      Pregunta2:0,
      Pregunta3:0,
      Pregunta4:0,
      Pregunta5:0,
      Pregunta6:0,
      Pregunta7:0,
      Pregunta8:0,
      Pregunta9:0,
      Pregunta10:0,
      Pregunta11:0,
      Pregunta12:0,
      Pregunta13:0,
      Pregunta14:0,
      Pregunta15:0,
      Pregunta16:0,
      Pregunta17:0,
      Pregunta18:0,
      Pregunta19:0,
      Pregunta20:0,
      adDate: new Date().getTime(),
      user_id: new ObjectID(id) 
    }
    let result = await this.adColl.insertOne(newAd);
    return result;
  }


  //Editar el Diagnostico, agregar las respuestas dadas
  async addPregunta1ToPaciente(id,Pregunta1) {
    let filter = {"_id": new ObjectID(id)};
    let updateJson = {
      "$set" : {"Pregunta1":Pregunta1}
      //push para los arreglos
    };
    let result = await this.adColl.updateOne(filter, updateJson);
    return result;
  }

  //Borrar un registro
  async deleteById(id) {
    let filter = { "_id": new ObjectID(id) };
    let result = await this.adColl.deleteOne(filter);
    return result;
  }

  //Obtener un registro por id 
  async getResultadoById(id){
    const filter = { "_id": new ObjectID(id)};
    let adDocument = await this.adColl.findOne(filter);
    const Resultado = parseInt(adDocument.Pregunta1)+parseInt(adDocument.Pregunta2)+parseInt(adDocument.Pregunta3)+parseInt(adDocument.Pregunta4)+parseInt(adDocument.Pregunta5);
    return Resultado;
  }

  //Obtener todos los registros
  async getAll(id){
    const filter = {"user_id": new ObjectID(id)}
    let ads = await this.adColl.find(filter);
    return ads.toArray();
  }

  //Obtener el Resultado
  async getById(id){
    const filter = { "_id": new ObjectID(id)};
    let adDocument = await this.adColl.findOne(filter);
    return adDocument;
  }
/*
  //Editar Diagnostico con parametro de pregunta
  async EditarPreguntaConParametro(id,Pregunta1,Pregunta) {
    let filter = {"_id": new ObjectID(id)};
    let updateJson = {
      "$set" : {"?":Pregunta1}
      //push para los arreglos
    };
    let result = await this.adColl.updateOne(filter, updateJson);
    return result;
  }*/

  /* Codigo para front 

<div class="grid grid-flow-col grid-rows-2 grid-cols-3 gap-4">
  <div class="transform scale-110 -rotate-6">
    1
  </div>
  <div class="col-start-3 transform scale-75 rotate-6 translate-x-2 translate-y-15">
    2
  </div>
  <div class="transform scale-150 translate-y-11">
    3
  </div>
  <div class="transform translate-y-24">
    4
  </div>
  <div class="row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4">
    5
  </div>
</div>


  <div class="bg-gradient-to-br from-pink-500 to-rose-500"></div>*/

}
module.exports = Ad;