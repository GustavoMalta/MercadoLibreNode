const connection = require('../database/connection');



module.exports = {
    
    async index(req,res) {
        const {page = 1} = req.query;

        const [count] = await connection('empresas')
            .count();
        res.header('X-Total-Count', count['count(*)']);

        const test = await connection('empresas')
        .limit(5)
        .offset((page-1)*5)
        console.log(test);
        return res.json(test);

        },

    async search(req,res) {

        const businness = await connection('empresas')
        .where('id',req.body.id)
        .select('*');

        console.log(businness);
        return res.json(businness);

        },

    async create(req,res) {
        /*
        "id": "123",
        "name": "empresa",
        "Tg_Code": "tgcode",
        "Access_Token": "accsstoken",
        "Date_Expire": "2020-04-02T17:37:56.000Z"
        */
       
        const {id, name, Tg_Code, Access_Token, Date_Expire} = req.body;
        
                console.log(Access_Token);
            try {
                await connection('empresas').insert({
                    id, name, Tg_Code, Access_Token, Date_Expire
                });
                console.log(req.body);
                return res.json({id, name});
    
            } catch (error) {
                return res.json(error)
            }
        }
    
}