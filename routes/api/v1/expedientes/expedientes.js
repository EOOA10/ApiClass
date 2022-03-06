const express = require('express');
const router = express.Router();

const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) =>{
    res.status(200).json(
        {
            endpoint:'Expedientes',
            updates:new Date(2022,0,19,18,41,0),
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
        const row = await expedienteModel.getById((id));
        res.status(200).json({status:'OK', expediente: row});
    }
    catch (ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILES'});
    }
});//GET INDIVIDUAL

const allowedItemsNumber = [10, 15, 20];

router.get('/facet/:page/:items', async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items))
    {
        try
        {
            const expedientes = await expedienteModel.getFaceted(page, items);
            res.status(200).json({docs: expedientes});
        }
        catch(ex)
        {
            console.log(ex);
            res.status(500).json({status: 'Failed'});
        }
    }
    else
    {
        return res.status(404).json({status: 'error', msg: 'Not a valid item value(10,15,20)'});
    }
});//Facet Search

router.get('/byidentidad/:identidad/:page/:items', async(req, res) => {
    const identidad = req.params.identidad;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items))
    {
        try
        {
            const expedientes = await expedienteModel.getFaceted(page, items, {identidad: identidad});
            res.status(200).json({docs: expedientes});
        }
        catch(ex)
        {
            console.log(ex);
            res.status(500).json({status: 'Failed'});
        }
    }
    else
    {
        return res.status(403).json({status: 'error', msg:'Not a valid item value(10,15,20)'});
    }
});//Facet Search Identidad

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
        const ultimaActualizacion = new Date();
        const { descripcion, observacion, registro } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, descripcion, observacion, registro, ultimaActualizacion.toISOString());
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

router.put('/addtag/:id', async(req, res) =>{
    try
    {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateAddTag(id, tag);
        res.status(200).json({
            status:'OK',
            result
        });
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// PUT /addtag/:id

router.put('/addtagset/:id', async(req, res) =>{
    try
    {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateAddTagSet(id, tag);
        res.status(200).json({
            status:'OK',
            result
        });
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// PUT /addtagset/:id

router.put('/removetag/:id', async(req, res) =>{
    try
    {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updatePopTag(id, tag);
        res.status(200).json({
            status:'OK',
            result
        });
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// PUT /removetag/:id

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