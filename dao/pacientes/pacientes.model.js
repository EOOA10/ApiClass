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
    {}

    async getById(id)
    {}

    async updateOne(id, nombre, apellido, identidad, telefono, email)
    {}

    async deleteOne(id)
    {}
}

module.exports = Pacientes;