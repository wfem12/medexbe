const app = require('../../app');
const supertest = require("supertest");
describe ('Test suite de api v1 pacientes endpoint', ()=> {
  it("GET /api/v1/pacientes/", async ()=> {
    await supertest(app).get('/api/v1/pacientes')
      .set({ apitoken:'2365eff0-d649-40da-abbf-ea3122ab5e48'})
      .expect(200);
  });
});
