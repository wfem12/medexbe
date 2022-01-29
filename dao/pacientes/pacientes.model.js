const getDb = require('../db');
let db = null;
class Pacientes{

    constructor() {
        getDb()
        .then( (database) => {
            //console.log(database);
        db = database;
        if (process.env.MIGRATE === 'true') {
            const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
            db.run(createStatement);
        }
        })
        .catch((err) => { console.error(err)});
    }

    new ( nombres, apellidos, identidad, telefono, correo) {
        return new Promise( (accept, reject)=> {
        db.run(
            'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
            [identidad, nombres, apellidos, correo, telefono],
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
                db.all('SELECT * from pacientes;', (err, rows) =>{
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
                    'SELECT * from pacientes where id=?;',
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
    updateOne (id, nombres, apellidos, identidad, telefono, correo) {
        return new Promise(
            (accept, reject) =>{
                const sqlUpdate = 'UPDATE pacientes set nombre=?, apellidos=?, identidad=?, email=?, email=? where id =?;';
                db.run(
                    sqlUpdate,
                    [nombres, apellidos, telefono, identidad, correo, id],
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
                const sqlDelete = 'DELETE FROM pacientes where id = ?;';
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

    

module.exports = Pacientes;