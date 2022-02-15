const ObjectId = require('mongodb').ObjectId;
const getDB = require('../mongodb');

let db = null;

class Pacientes{
    collection = null;
    constructor()
    {
        getDB()
        .then((database) =>{
            db = database;
            this.collection = db.collection('Pacientes');

            if(process.env.MIGRATE === 'true')
            {}
        })

        .catch((err) =>{
            console.error(err)
        });
    }

    async new(nombre, apellido, identidad, telefono, email)
    {
        const newPaciente = {
            nombre, 
            apellido, 
            identidad, 
            telefono, 
            email
        };

        const rslt = await this.collection.insertOne(newPaciente);
        return rslt;
    }

    async getAll()
    {
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getById(id)
    {
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    async updateOne(id, nombre, apellido, identidad, telefono, email)
    {
        const filter = {_id: new ObjectId(id)};
        const updateCmd = {
            '$set':{
                nombre, 
                apellido, 
                identidad, 
                telefono, 
                email
            }
        };

        return await this.collection.updateOne(filter, updateCmd);
    }

    async deleteOne(id)
    {
        const filter = {_id: new ObjectId(id)};

        return await this.collection.deleteOne(filter);
    }
}

module.exports = Pacientes;