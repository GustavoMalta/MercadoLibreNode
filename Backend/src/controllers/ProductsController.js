const connection = require('../database/connection');

module.exports = {
    async index(req,res) {
        const {page = 1} = req.query;

        const [count] = await connection('produtos')
            .count();
        res.header('X-Total-Count', count['count']);

        const test = await connection('produtos')
        .limit(5)
        .offset((page-1)*5)
        console.log(test);
        return res.json(test);

        },

    async search(req,res) {

        const businness = await connection('produtos')
        .where('Id_Produto',req.body.Id_Produto)
        .select('*');

        console.log(businness);
        return res.json(businness);

        },

    async create(req,res) {
        /*
            "Id_Produto": "123",
            "Title": "bolsa",
            "Custo": "50.00",
            "Obs": "obs"
        */
       
        const {Id_Produto, Title, Custo, Obs} = req.body;
        
            try {
                await connection('produtos').insert({
                    Id_Produto, Title, Custo, Obs
                });
                console.log(req.body);
                return res.json({Id_Produto, Title});
    
            } catch (error) {
                return res.json(error)
            }
        },
    
}