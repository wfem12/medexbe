require('dotenv').config();
const getDb = require('../dao/mogodb');
console.log(process.env.MONGOURI);

const name = [
    'FULANITO',
    'MENGANITO',
    'SUTANITO',
    'LULU',
    'PACO',
    'HUGO',
    'LUIS',
    'DONALD'
];

const surnames = [
    'MkQUACK',
    'RICO',
    'DTAL',
    'DE LA SANTA CRUS',
    'MELGA',
    'CALDILLO',
    'CHE'
];

const pacientes = 20;
const pacientesArr = [];

for (var i = 0; i < pacientes; i++){

    const anio = ((new Date().getTime() % 2) == 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random*23);
    const secuencia = String(Math.floor(Math.random()*99999)).padStart(5, '0');
    const nombres =name[Math.ceil(Math.random()*8)];
    const apellidos = surnames[Math.floor(Math.random()*8)];
    const correo = (`${nombres}.${apellidos}@gmail.com`).toLowerCase();
    const telefono = `${(200000 + Math.floor(Math.random() * 100000000))}`

    const doc = {
        nombres,
        apellidos,
        identidad: `0801${anio}${secuencia}`,
        telefono,
        correo
    }
    pacientesArr.push(doc);
}

getDb().then(
    (db)=>{
        const pacientes = db.collection('Pacientes');
        pacientes.insertMany(pacientesArr, (err, reslts)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(reslts);
            return;
        });
    }
);