const connection = require('../database/connection');

module.exports = {
    async index(req,res) {
        const {page = 1} = req.query;

        const [count] = await connection('anuncios')
            .count();
        res.header('X-Total-Count', count['count(*)']);

        const test = await connection('anuncios')
        .limit(5)
        .offset((page-1)*5)
        console.log(test);
        return res.json(test);

        },

    async search(req,res) {

        const businness = await connection('anuncios')
        .where('Id_Produto',req.body.Id_Produto)
        .select('*');

        console.log(businness);
        return res.json(businness);

        },

    async create(req,res) {
        /*

            "Id_Anuncio": "ml123456",
            "Title":"Bolsa Feminina",
            "Price": "50",
            "status": true,
            "Available_quantity": 5,
            "Listing_type_id": "0.00",
            "Free_shipping": "0",
            "Shipping_mode": "0",
            "Total_custo": "0.00",
            "List_cost": "0",
            "SellerId_Empresa": "123"
        
        */
       
                console.log(req.body);
        const {Id_Anuncio, Title, Price, status, Available_quantity ,Listing_type_id, Free_shipping, Shipping_mode, Total_custo, List_cost, SellerId_Empresa}= req.body;
        
            try {
                await connection('anuncios').insert({
                    Id_Anuncio, Title, Price, status, Available_quantity, Listing_type_id, Free_shipping, Shipping_mode, Total_custo, List_cost, SellerId_Empresa
                });
                return res.json({Id_Anuncio, Title});
    
            } catch (error) {
                return res.json(error)
            }
        },

    async update(req, res){
        const {Id_Anuncio, Id_Produto, Quantidade}= req.body;
        const Id_Prod_Anun = Id_Anuncio+Id_Produto;

        try {
            await connection('produtos_anuncios').insert({
                Id_Prod_Anun, Id_Anuncio, Id_Produto, Quantidade
            });
            console.log("relação criada");
            return res.json({Id_Prod_Anun, Title});

        } catch (error) {
            try{
                await connection('produtos_anuncios')
                .where({Id_Prod_Anun: Id_Prod_Anun})
                .update({
                     Quantidade:Quantidade
                });
                
                console.log("relação atualizada");
                return res.json({Id_Anuncio, Title});
            } catch (error) {
                return res.json(error)
            }
        }
        
    }
    
}