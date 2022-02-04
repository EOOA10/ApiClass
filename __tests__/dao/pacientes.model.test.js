const Pacientes = require('../../dao/pacientes/pacientes.model');

describe('Testing Pacientes Model', ()=>{
    let pacientesModel = undefined;
    let lastId = 0;

    beforeAll((done) =>{
        pacientesModel = new Pacientes();
        setTimeout(()=>{
            done();
        },3000);
    });

    it('PacientesModel Esta Definido', () =>{
        return expect(pacientesModel).toBeDefined();
    });

    it('getAll Devuelve un array', async () =>{
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('New Guardado de dato', async () =>{
        const resultado = await pacientesModel.new(
            'Primera',
            'Prueba',
            '000000001',
            '12345678',
            'Prueba1@gmail.com'
        );
        lastId = resultado;
        return expect(resultado).toBeDefined();
    });

    it('Obtener dato', async () =>{
        const resultado = await pacientesModel.getById(lastId);
        
        console.log(resultado);
        return expect(resultado.nombre).toBe('Primera');
    });

    it('Eliminar dato', async () =>{
        const resultado = await pacientesModel.deleteOne(lastId);
        
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });
});