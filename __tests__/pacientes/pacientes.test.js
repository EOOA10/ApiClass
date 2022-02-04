const app = require('../../app');
const supertest = require("supertest");

describe('Test Suite de api V1 Pacientes endpoint', () =>{
    it("GET /api/v1/pacientes/", async () =>{
        await supertest(app).get('/api/v1/pacientes')
        .set({ apitoken:'97ed6ddb-aeb4-4f3b-aac3-bf3bf0202d17' })
        .expect(200);
    });
});