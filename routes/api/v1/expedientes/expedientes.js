const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

//RUTA EXPEDIENTE
const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const ExpedienteModel = new Expedientes();

//*****GET*****
router.get('/', (req, res)=>{
    res.status(200).json(
        {
            endpoint: 'expedientes',
            updates: new Date(2022,0,19,18,41,00)
        }
    )
});

//*****METODO GET
router.get('/all', async (req, res) =>{
    try {
        const rows = await ExpedientesModel.getAll();
        res.status(200).json({status:'ok', expedientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});


//*****POST*****
router.post('/new', async (req, res) =>{
    const {identidad, fecha, descripcion, observacion, registro, ultimoActualizacion} = req.body;
    try {
        rslt = await ExpedienteModel.new(identidad, fecha, descripcion, observacion, registro,ultimoActualizacion);
        res.status(200).json(
            {
                status: 'ok',
                result: rslt
            }
        );
    } catch (ex) {
        console.log(ex);
        res.status(500).json(
            {
                status: 'failed',
                result: {}
            }
        );
    }
});
// router.post('/new', async (req, res)=>{
//     const { identidad, fecha, descripcion, observacion, registro, ultimoActualizacion } = req.body;

//     res.status(200).json(
//         {
//             status:'ok',
//             recieved: {
//                 identidad,
//                 fecha,
//                 descripcion,
//                 observacion,
//                 registro,
//                 ultimoActualizacion
//             }
//         });
// });

module.exports = router;