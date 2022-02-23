const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mogodb');
let db = null;
class Expedientes{
    collection = null;

    constructor() {
        getDb()
        .then( (database) => {
            //console.log(database);
        db = database;
        this.collection = db.collection('Expedientes');
        if (process.env.MIGRATE === 'true') {
                //const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registro TEXT, ultimoActualizacion TEXT);';
                //db.run(createStatement);
        }
        })
        .catch((err) => { console.error(err)});
    }

    //**********************************METODOS POST
    async new ( identidad, fecha, descripcion, observacion, registro, ultimoActualizacion) {
        const newExpediente = {
            identidad,
            fecha,
            descripcion,
            observacion,
            registro,
            ultimoActualizacion
        };
        const rslt = await this.collection.insertOne(newExpediente);
        return rslt;
    }
//******************************METODO GET
        async getAll() {
            const cursor = this.collection.find({});
            const documents = await cursor.toArray();
            return documents;
        }

        //**********************METODO FACET
        async getFaceted(page, items, filter = {}) {
            const cursor = this.collection.find(filter);
            const totalItems = await cursor.count();
            cursor.skip((page -1) * items);
            cursor.limit(items);
            const resultados = await cursor.toArray();
            return {
            totalItems,
            page,
            items,
            totalPages: (Math.ceil(totalItems / items)),
            resultados
            };
        }

        //***********************METODO BUSCAR
        async getById(id) {
            const _id = new ObjectId(id);
            const filter = {_id};
            const myDocument = this.collection.findOne(filter);
            return myDocument;
        }

        //*****************************METODO DE ACTUALIZAR
    async updateOne (id, identidad, fecha, descripcion, observacion, registro, ultimoActualizacion ) {
        const filter = {_id: new ObjectId(id)};
        const updateCmd = {
            '$set':{
                identidad,
                fecha,
                descripcion,
                observacion,
                registro,
                ultimoActualizacion
            }
        };
        return await this.collection.updateOne(filter, updateCmd);
    }

    //ACTUALIZAR Y AGREGAR UN TAG Y SI YA EXISTE NO LO SOBRESCRIBE CREA UNO IDENTICO(NO UTILIZARLO)
    async updateAddTag(id, tagEntry){
        const updateCmd = {
            "$push": {
                tags: tagEntry
            }
        }
        const filter = {_id: new ObjectId(id)}
        return await this.collection.updateOne(filter, updateCmd);
    }

    //ACTUALIZA  EL TAG Y LO SOBRESCRIBE
    async updateAddTagSet(id, tagEntry){
        const updateCmd = {
            "$addToSet": {
                tags: tagEntry
            }
        }
        const filter = {_id: new ObjectId(id)}
        return await this.collection.updateOne(filter, updateCmd);
    }

    //ELIMINAR UN TAG
    async updatePopTag(id, tagEntry) {
        console.log(tagEntry);
        const updateCmd = [{
          '$set': {
            'tags': {
              '$let': {
                'vars': { 'ix': { '$indexOfArray': ['$tags', tagEntry] } },
                'in': {
                  '$concatArrays': [
                    { '$slice': ['$tags', 0, {'$add':[1,'$$ix']}]},
                    [],
                    { '$slice': ['$tags', { '$add': [2, '$$ix'] }, { '$size': '$tags' }] }
                  ]
                }
              }
            }
          }
        }];
        const filter = { _id: new ObjectId(id) };
        return await this.collection.updateOne(filter, updateCmd);
      }

    //*********************METODO DELETE(ELIMINAR)
    async deleteOne(id) {
        const filter = {_id: new ObjectId(id)};
        return await this.collection.deleteOne(filter);
    }
}

module.exports = Expedientes;