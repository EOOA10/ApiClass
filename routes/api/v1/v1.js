const express = require('express');
const router = express.Router();

const { VerifyApiHeaderToken } = require('./headerVerifyMiddleware');

const PacientesRoutes = require('./pacientes/pacientes');
const ExpendientesRoutes = require('./expedientes/expedientes');

router.use('/pacientes',
            VerifyApiHeaderToken,
             PacientesRoutes);
router.use('/expedientes', ExpendientesRoutes);

module.exports = router;