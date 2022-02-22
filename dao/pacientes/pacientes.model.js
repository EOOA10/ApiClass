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

    async getFaceted(page, items, filter = {})
    {
        const cursor = this.collection.find(filter);
        const totalItems = await cursor.count();

        cursor.skip((page - 1) * items);
        cursor.limit(items);

        const resultados = await cursor.toArray();
        return {
            totalItems, 
            page, 
            items, 
            totalPages: (Math.ceil(totalItems / items)), 
            resultados};
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

    async updateAddTag(id, tagEntry)
    {
        const updateCmd = 
        {
            "$push":{
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
    }

    async updateAddTagSet(id, tagEntry)
    {
        const updateCmd = 
        {
            "$addToSet":{
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
    }

    async updatePopTag(id, tagEntry) {
        //console.log(tagEntry);
        const updateCmd = [{
          '$set': {
            'tags': {
              '$let': {
                'vars': { 'ix': { '$indexOfArray': ['$tags', tagEntry] } },
                'in': {
                  '$concatArrays': [
                    { '$slice': ['$tags', 0, {'$add':[1,'$$ix']}]},
                    [],
                    { '$slice': ['$tags', { '$add': [2, '$$ix'] }, { '$size': '$tags' }] }
                  ]
                }
              }
            }
          }
        }];

        const filter = { _id: new ObjectId(id) };
        return await this.collection.updateOne(filter, updateCmd);
      }

    async deleteOne(id)
    {
        const filter = {_id: new ObjectId(id)};

        return await this.collection.deleteOne(filter);
    }
}

module.exports = Pacientes;