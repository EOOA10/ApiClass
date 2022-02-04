const app = require('../../app');
const supertest = require("supertest");

describe('Test Suite de api V1 Pacientes endpoint', () =>{
    it("GET /api/v1/pacientes/", async () =>{
        await supertest(app).get('/api/v1/pacientes')
        .set({ apitoken:'a1006ff3-9f11-4954-8855-50573e16dfba' })
        .expect(200);
    });
});