require('dotenv').config();
const getDB = require('../dao/mongodb');

const names = [
    'Yuji',
    'Megumi',
    'Nobara',
    'Yuta',
    'Maki',
    'Aoi',
    'Kasumi',
    'Satoru'
];

const surnames = [
    'Itadori',
    'Fushiguro',
    'Kugisaki',
    'Okkotsu',
    'Zenin',
    'Todo',
    'Miwa',
    'Gojo'
];

const pacientes = 50;
const pacientesArr = [];

for(var i = 0; i < pacientes; i++) 
{
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20): 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5,'0');


    const nombre = names[Math.floor(Math.random() * 8)];
    const apellido = surnames[Math.floor(Math.random() * 8)];
    const email = (`${nombre}.${apellido}@unmail.com`).toLowerCase();
    const telefono = `${20000000 + Math.floor(Math.random() * 10000000)}`;
    
    const doc = {
        nombre, 
        apellido, 
        identidad: `0801${anio}${secuencia}`, 
        telefono, 
        email
    }

    pacientesArr.push(doc);
}

getDB().then(
    (db) => {
        const pacientes = db.collection('Pacientes');
        pacientes.insertMany(pacientesArr, (err, rslts)=>{
            if (err) 
            {
                console.log(err);
                return;
            }

            console.log(rslts);
            return;
        });
    }
);