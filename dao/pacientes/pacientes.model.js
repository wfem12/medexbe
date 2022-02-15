const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mogodb');
let db = null;
class Pacientes{
    collection = null;

    constructor() {
        getDb()
        .then( (database) => {
            //console.log(database);
        db = database;
        this.collection = db.collection('Pacientes');
        if (process.env.MIGRATE === 'true') {
           // const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
            //db.run(createStatement);
        }
        })
        .catch((err) => { console.error(err)});
    }

    async new ( nombres, apellidos, identidad, telefono, correo) {
        const newPaciente = {
            nombres,
            apellidos,
            identidad,
            telefono,
            correo
        };
        const rslt = await this.collection.insertOne(newPaciente);
        return rslt;
        }
//******************************METODO GET
    async getAll() {
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

        //***********************METODO BUSCAR
    async getById(id) {
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = this.collection.findOne(filter);
        return myDocument
    }

        //*****************************METODO DE ACTUALIZAR
    async updateOne(id, nombres, apellidos, identidad, telefono, correo) {
    }

    //*********************METODO DELETE(ELIMINAR)
    async deleteOne(id) {
    }
}

module.exports = Pacientes;