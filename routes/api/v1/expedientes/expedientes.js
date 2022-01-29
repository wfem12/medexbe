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
        const rows = await ExpedienteModel.getAll();
        res.status(200).json({status:'ok', expedientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//*******************GET DE BUSQUEDA(METODO BUSCAR)
//***********byid/1
//***********byid/1:{id}
router.get('/byid/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const row = await ExpedienteModel.getById(parseInt(id));
        res.status(200).json(
            {
                status: 'ok',
                expedientes: row
            }
        );
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status: 'failed'});
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

//********METODO ACTUALIZAR
router.put('/update/:id', async (req, res) =>{
    try {
        const { identidad, fecha, descripcion, observacion, registro, ultimoActualizacion } = req.body;
        const {id} = req.params;
        const result = await ExpedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimoActualizacion);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//******METODO ELIMINAR/
router.delete('/delete/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await ExpedienteModel.deleteOne(id);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
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