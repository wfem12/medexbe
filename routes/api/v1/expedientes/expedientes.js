const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

//RUTA EXPEDIENTE
const Expedientes = require('../../../../dao/expedientes/expediente.model');
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

//______________________________________//

//************FACET SEARCH
const allowedItemsNumber = [10, 15, 20];
//facet search
router.get('/facet/:page/:items', async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const expedientes = await ExpedienteModel.getFaceted(page, items);
      res.status(200).json({docs:expedientes});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
  }

});

//______________________________________//

//*******************GET DE BUSQUEDA(METODO BUSCAR)
//***********byid/1
//***********byid/1:{id}
router.get('/byid/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const row = await ExpedienteModel.getById(id);
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

//______________________UPDATETAG_______________________________
router.put('/addtag/:id', async (req, res) =>{
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await PacienteModel.updateAddTag(id, tag );
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//ADDTAGSET UTILIZAR ESTE
router.put('/addtagset/:id', async (req, res) =>{
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await ExpedienteModel.updateAddTagSet(id, tag );
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});



module.exports = router;