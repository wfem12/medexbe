const Pacientes = require('../../dao/pacientes/pacientes.model');
describe('Testing Pacientes Model',()=>{
    let pacientesModel = undefined;
    beforeAll( (done)=>{
        pacientesModel = new Pacientes;
        setTimeout(()=>{
            done();
        },3000);
    });


    //TEST

    //TEST SI FUNCIONA EL ARCHIVO DE pacientesModel.js
    it('pacientesModel Esta definido', () =>{
        return expect(pacientesModel).toBeDefined();
    });

    //TEST DEL GET
    it('getAll Devuelve un array', async ()=>{
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    //TEST DEL POST
    it('new guardar un dato', async ()=>{
        const resultado = await pacientesModel.new(
            'Test Prueba',
            'Fulano',
            '00000001',
            'telefono',
            'correo@correo.com'
        );
        lastId = resultado;
        return expect(resultado).toBeDefined();
    });

    //TEST DE BUSCAR
    it('Obtener un dato', async () =>{
        const resultado = await pacientesModel.getById(
            lastId
        );
        console.log(resultado);
        return expect(resultado.nombre).toBe('Test Prueba');
    });

    //TEST DE ELIMINAR
    it('Eliminar un dato', async() =>{
        const resultado = await pacientesModel.deleteOne(
            lastId
        );
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });
});