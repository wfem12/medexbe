const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const Pacientes = require('../../../../dao/pacientes/pacientes.model');
const PacienteModel = new Pacientes();

//*****GET*****
// router.get('/', (req, res)=>{
//     res.status(200).json(
//         {
//             endpoint: 'Pacientes',
//             updates: new Date(2022,0,19,18,41,00)
//         }
//     );
// });
router.get('/', (req, res)=>{
    res.status(200).json(
        {
            endpoint: 'Pacientes',
            updates: new Date(2022,0,19,18,41,0)
        }
    );
});


//************GET ALL

router.get('/all', async (req, res) =>{
    try {
        const rows = await PacienteModel.getAll();
        res.status(200).json({status:'ok', pacientes: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//***********GET DE BUSQUEDA(METODO BUSCAR)
//***********byid/1
//***********byid/1:{id}
router.get('/byid/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const row = await PacienteModel.getById(parseInt(id));
        res.status(200).json({status:'ok', pacientes: row});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//*****POST*****
router.post('/new', async (req, res) =>{
    const {nombres, apellidos, identidad, email, telefono} = req.body;
    try {
        rslt = await PacienteModel.new(nombres, apellidos, identidad, telefono, email);
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
//     const { nombres, apellidos, identidad, email, telefono } = req.body;
//     rslt = await PacienteModel.new(nombres, apellidos, identidad, telefono, email);

//     res.status(200).json(
//         {
//             status:'ok',
//             recieved: {
//                 nombres,
//                 apellidos,
//                 identidad,
//                 //nombreCompleto: `${nombres} ${apellidos}`,
//                 email,
//                 telefono
//             }
//         });
// });

//*****ACTUALIZAR
router.put('/update/:id', async (req, res) =>{
    try {
        const { nombres, apellidos, identidad, email, telefono } = req.body;
        const {id} = req.params;
        const result = await PacienteModel.updateOne(id, nombres, apellidos, identidad, telefono, email);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});


//*****BORRAR
router.delete('/delete/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await PacienteModel.deleteOne(id);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});


// OBTENER
// router.post(); // ENVIAR
// router.put(); // MODIFICAR
// router.delete(); // BORRAR


module.exports = router;