const getDB = require('../db');

let db = null;

class Pacientes{
    constructor()
    {
        getDB()
        .then((database) =>{
            db = database;

            if(process.env.MIGRATE === 'true')
            {
                const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellido TEXT, email TEXT, telefono TEXT);';
                db.run(createStatement);
            }
        })

        .catch((err) =>{
            console.error(err)
        });
    }

    new(nombre, apellido, identidad, telefono, email)
    {
        return new Promise((accept, reject)=> {
            db.run(
                'INSERT INTO pacientes (identidad, nombre, apellido, email, telefono) VALUES (?, ?, ?, ?, ?);',
                [identidad, nombre, apellido, email, telefono],
                (err, rslt) =>{
                    if(err)
                    {
                        console.error(err);
                        reject(err);
                    }

                    accept(rslt);
                }
            );
        });
    }

    getAll()
    {
        return new Promise((accept, reject) =>{
            db.all('SELECT * from pacientes;', (err, rows) =>{
                if(err)
                {
                    console.error(err);
                    reject(err);
                }
                else
                {
                    accept(rows);
                }
            });
        });
    }

    getById(id)
    {
        return new Promise((accept, reject) =>{
            db.get('SELECT * from pacientes where id=?;', [id],
            (err, row) =>{
                if(err)
                {
                    console.error(err);
                    reject(err);
                }
                else
                {
                    accept(row);
                }
            });
        });
    }

    updateOne(id, nombre, apellido, identidad, telefono, email)
    {
        return new Promise((accept, reject) =>{
            const sqlUpdate = 'UPDATE pacientes set nombre = ?, apellido = ?, identidad = ?, email = ?, telefono = ? where id = ?;';
            db.run(
                sqlUpdate,[nombre, apellido, identidad,telefono, email, id],
                function (err)
                {
                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(this);
                    }
                }
            );
        });
    }

    deleteOne(id)
    {
        return new Promise((accept, reject) =>{
            const sqlDelete = 'DELETE from pacientes where id = ?;';
            db.run(
                sqlDelete,[id],
                function (err)
                {
                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        accept(this);
                    }
                }
            );
        });
    }
}

module.exports = Pacientes;