const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) =>{
    res.status(200).json(
        {
            endpoint:'Expedientes',
            updates:new Date(2022,0,19,18,41,00),
            author:'Edison Ordoñez'
        }
    );
}); //GET /

router.get('/all', async (req, res) =>{
    try
    {
        const rows = await expedienteModel.getAll();
        res.status(200).json({status:'OK', Expedientes: rows});
    }
    catch (ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILES'});
    }
});//GET ALL

router.get('/byid/:id', async (req, res) =>{
    try
    {
        const {id} = req.params;
        const row = await expedienteModel.getById(parseInt(id));
        res.status(200).json({status:'OK', expediente: row});
    }
    catch (ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILES'});
    }
});//GET INDIVIDUAL

router.post('/new', async(req, res) =>{
    const fecha = new Date();
    const ultimaActualizacion = new Date();
    const { identidad, descripcion, observacion, registro } = req.body;

    rslt = await expedienteModel.new(identidad, fecha.toISOString(), descripcion, observacion, registro, ultimaActualizacion.toISOString());

        res.status(200).json({status:'OK', recieved: {
            identidad, 
            fecha, 
            descripcion, 
            observacion,
            registro,
            ultimaActualizacion
        }});
}); //POST /new

router.put('/update/:id', async (req, res) => {
    try
    {
        const { identidad, fecha, descripcion, observacion, registro, ultimaActualizacion } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimaActualizacion);
        res.status(200).json({
            status: 'OK',
            result
        });
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// PUT /update/:id

router.delete('/delete/:id', async(req, res) => {
    try
    {
        const { id } = req.params;
        const result = await expedienteModel.deleteOne(id);
        res.status(200).json({
            status: 'OK',
            result
        });
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// DELETE /delete/id

module.exports = router;