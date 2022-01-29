const { get } = require('express/lib/response');
const getDb = require('../db');
let db = null;
class Expedientes{

    constructor(){
        this.initdb();
    }
    async initdb(){
        try {
            db = await getDb();
            if (process.env.MIGRATE === 'true') {
                        const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registro TEXT, ultimoActualizacion TEXT);';
                        db.run(createStatement);
            }
        } catch (ex) {
            console.error(err);
        }
    }

    // constructor() {
    //     getDb()
    //     .then( (database) => {
    //         //console.log(database);
    //     db = database;
    //     if (process.env.MIGRATE === 'true') {
    //         const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registro TEXT, ultimoActualizacion TEXT);';
    //         console.log('createStatement');
    //         db.run(createStatement);
    //     }
    //     })
    //     .catch((err) => { console.error(err)});
    // }

    new ( identidad, fecha, descripcion, observacion, registro, ultimoActualizacion) {
        return new Promise( (accept, reject)=> {
        db.run(
            'INSERT INTO expedientes (identidad, fecha, descripcion, observacion, registro, ultimoActualizacion) VALUES (?, ?, ?, ?, ?, ?);',
            [identidad, fecha, descripcion, observacion, registro, ultimoActualizacion],
            (err, rslt)=>{
            if(err) {
                console.error(err);
                reject(err);
            }
            accept(rslt);
            }
        );
        });
    }
//******************************METODO GET
        getAll() {
            return new Promise((accept, reject) =>{
                db.all('SELECT * from expedientes;', (err, rows) =>{
                    if (err) {
                        console.error(err);
                    } else {
                        accept(rows);
                    }
                });
            });
        }

        //***********************METODO BUSCAR
        getById(id) {
            return new Promise((accept, reject)=>{
                db.get(
                    'SELECT * from expedientes where id=?;',
                    [id],
                    (err, row) =>{
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            accept(row);
                        }
                    }
                );
            });
        }

        //*****************************METODO DE ACTUALIZAR
    updateOne (id, ) {
        return new Promise(
            (accept, reject) =>{
                const sqlUpdate = 'UPDATE expedientes set identidad=?, fecha=?, descripcion=?, observacion=?, registro=?, ultimoActualizacion=? where id =?;';
                db.run(
                    sqlUpdate,
                    [identidad, fecha, descripcion, observacion, registro, ultimoActualizacion, id],
                    (err) =>{
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }
        );
    }

    //*********************METODO DELETE(ELIMINAR)
    deleteOne(id) {
        return new Promise(
            (accept, reject) => {
                const sqlDelete = 'DELETE FROM expedientes where id = ?;';
                db.run(
                    sqlDelete,
                    [id],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }
        );
    }
}

    

module.exports = Expedientes;