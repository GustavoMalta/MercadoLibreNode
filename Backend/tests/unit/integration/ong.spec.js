 const request = require('supertest');
 const app = require('../../../src/app');
 const connection = require('../../../src/database/connection')

describe('ONG', ()=> {
    beforeEach(async ()=>{
        await connection.migrate.rollback() //para limapr o banco de dados
        await connection.migrate.latest(); //igual o executado por npx 
    });

    afterAll(async()=>{
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async ()=> {
        const response = await request(app).post('/ongs')
            //.set('authorization',asd) por exemplo
            .send({
            name:"teste",
            email:"teste@teste.com",
            whatsapp:"16123456789",
            city:"city",
            uf:"uf"            
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
})