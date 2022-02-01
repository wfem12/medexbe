const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } =
require('./headerVerifyMiddleware');

//const midlewar = require('./headerVerifyMiddleware');

//*****routes*****
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');

// const expedientesRoutes = require('./expedientes/expedientes);
//middlewares

// *****LLAMADA*****
//router.use('/pacientes', pacientesRoutes);

router.use(
    '/pacientes',
    verifyApiHeaderToken,
    pacientesRoutes);


router.use('/expedientes', expedientesRoutes);
// router.use('/expedientes', expedientesRoutes);

module.exports = router;