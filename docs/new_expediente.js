require('dotenv').config();
const getDb = require('../dao/mogodb');
console.log(process.env.MONGOURI);

const mydate = [
    '2/1/2022',
    '2/2/2022',
    '2/3/2022',
    '2/4/2022',
    '2/5/2022'
];

const description = [
    'Tomar acetaminofen',
    'Beber tosan',
    'Agua ardiente tome chiqui',
    'Tomar 2 amoxicilina',
    'No beber'
    ];

const observation = [
        'Estaba grave',
        'Herida leve',
        'Muerto',
        'Tiene que ir a emergencia',
        'falta de calcio'
];

const Registration = [
    'No. 2',
    'No. 3',
    'No. 4',
    'No. 5',
    'No. 6'
];

const endupdate = [
    '5/1/2022',
    '5/2/2022',
    '5/3/2022',
    '5/4/2022',
    '5/5/2022'
];

    const expedientes = 20;
    const expedientesArr = [];


for (var i = 0; i < expedientes; i++){

    const anio = ((new Date().getTime() % 2) == 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random * 23);
    const secuencia = String(Math.floor(Math.random() *99999)).padStart(5, '0');
    const fecha = mydate[Math.ceil(Math.random()*8)];
    const descripcion = description[Math.ceil(Math.random()*8)];
    const observacion = observation[Math.ceil(Math.random()*8)];
    const registro = Registration[Math.ceil(Math.random()*8)];
    const ultimoActualizacion = endupdate[Math.ceil(Math.random()*8)];

    const doc = {
        identidad: `0401${anio}${secuencia}`,
        fecha,
        descripcion,
        observacion,
        registro,
        ultimoActualizacion
    }
    expedientesArr.push(doc);
}

getDb().then(
    (db)=>{
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedientesArr, (err, reslts)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(reslts);
            return;
        });
    }
);
