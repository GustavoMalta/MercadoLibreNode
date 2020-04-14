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

    async edit(req,res) {
        const { id } = req.params;
        const produtos = await connection('produtos')
        .where('Id_Produto',id)
        .select('*');
        
        console.log(produtos);
        return res.json(produtos);

        },

    async create(req,res) {
        /*
            "Id_Produto": "123",  -- gerando automatico
            "Title": "bolsa",
            "Custo": "50.00",
            "Obs": "obs"
        */
       
        const {Title, Custo, Obs} = req.body;
        
            try {
                var [{count}] = await connection('produtos')
                    .count();
                res.header('X-Total-Count', ++count);
                Id_Produto = count;
                console.log("count: " + count);
                console.log("idproduto: " + Id_Produto);
                
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