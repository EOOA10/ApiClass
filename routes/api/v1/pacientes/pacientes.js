const express = require('express');
const router = express.Router();

const Pacientes = require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Pacientes();

router.get('/', (req, res) =>{
    res.status(200).json(
        {
            endpoint: 'Pacientes',
            updates: new Date(2022,0,19,18,41,0),
            author:'Edison Ordoñez'
        }
    );
}); //GET /

router.get('/all', async(req, res) =>{
    try
    {
        const rows = await pacienteModel.getAll();
        res.status(200).json({status:'OK', Pacientes: rows});
    }
    catch (ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// GET ALL

router.get('/byid/:id', async(req, res) =>{
    try
    {
        const {id} = req.params;
        const row = await pacienteModel.getById((id));
        res.status(200).json({status:'OK', paciente: row});
    }
    catch(ex)
    {
        console.log(ex);
        res.status(500).json({status:'FAILED'});
    }
});// GET INDIVIDUAL

const allowedItemsNumber = [10, 15, 20];

router.get('/facet/:page/:items', async(req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items))
    {
        try
        {
            const pacientes = await pacienteModel.getFaceted(page, items);
            res.status(200).json({docs: pacientes});
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
});//Facet Search

router.get('/byname/:name/:page/:items', async(req, res) => {
    const name = req.params.name;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items))
    {
        try
        {
            const pacientes = await pacienteModel.getFaceted(page, items, {nombre: name});
            res.status(200).json({docs: pacientes});
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
});//Facet Search

router.post('/new', async(req, res) =>{
    const { nombre, apellido, identidad, email, telefono } = req.body;

    rslt = await pacienteModel.new(nombre, apellido, identidad, telefono, email);

        res.status(200).json({status:'OK', recieved: {
            nombre, 
            apellido, 
            nombrecompleto: `${nombre} ${apellido}`,
            identidad, 
            email,
            telefono
        }});
}); //POST /new

router.put('/update/:id', async(req, res) =>{
    try
    {
        const { nombre, apellido, identidad, email, telefono } = req.body;
        const { id } = req.params;
        const result = await pacienteModel.updateOne(id, nombre, apellido, identidad, email, telefono);
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
});// PUT /update/:id

router.put('/addtag/:id', async(req, res) =>{
    try
    {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await pacienteModel.updateAddTag(id, tag);
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
        const result = await pacienteModel.updateAddTagSet(id, tag);
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
        const result = await pacienteModel.updatePopTag(id, tag);
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

router.delete('/delete/:id', async(req, res) =>{
    try
    {
        const { id } = req.params;
        const result = await pacienteModel.deleteOne(id);
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
});// DELETE /delete/id

module.exports = router;