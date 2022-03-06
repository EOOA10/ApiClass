const express = require('express');
const router = express.Router();

const { VerifyApiHeaderToken } = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');

const PacientesRoutes = require('./pacientes/pacientes');
const ExpendientesRoutes = require('./expedientes/expedientes');
const SeguridadRoutes = require('./seguridad/seguridad');

router.use(passport.initialize());
//PUBLIC
router.use('/seguridad', VerifyApiHeaderToken,
                         SeguridadRoutes);

//MIDDLEWARE
router.use('/pacientes',
            VerifyApiHeaderToken,
            jwtMiddleware,
            PacientesRoutes);

router.use('/expedientes',
            VerifyApiHeaderToken, 
            jwtMiddleware,
            ExpendientesRoutes);

module.exports = router;