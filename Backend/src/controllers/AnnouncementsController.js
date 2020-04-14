const connection = require('../database/connection');

const {GetAnuncios} = require('../utils/GetMeliData');


module.exports = {
    async index(req,res) {
        const { page = 1 } = req.query;
        const { id_seller} = req.params;

        console.log("Page: " + page);
        if(id_seller){
            var [count] = await connection('anuncios')
                .where("SellerId_Empresa", id_seller)
                .count();        
            var anuns = await connection('anuncios')
                .where("SellerId_Empresa", id_seller)
                .limit(5)
                .offset((page-1)*5);
        }else{
            var [count] = await connection('anuncios')
                .count();        
            var anuns = await connection('anuncios')
                .limit(5)
                .offset((page-1)*5);
        }
        
        res.header('X-Total-Count',  count['count']);
        console.log(count);
        console.log(anuns);

        return res.json(anuns);

        },

    async getAnnoucements(req,res){
        const { id } = req.params;
        const {fieldsToInsert, fieldsToUpdate} = await GetAnuncios(id);  
        var MlAanuncios =[];
        if (fieldsToInsert && fieldsToUpdate){
            if (fieldsToInsert.length>0){
                await connection('anuncios').insert(fieldsToInsert)
                    .then(() => { console.log("Inseridos com sucesso")})
                    .catch((error) => { console.log('erro na inserção no banco de dados')})
            };

            if(fieldsToUpdate.length >0){
                try{
                    fieldsToUpdate.forEach(async item => {
                        await connection('anuncios')
                            .where({Id_Anuncio: item.Id_Anuncio})
                            .update(item)
                    });

                } catch (error) {
                    return res.json(error)
                }
                
            };
        
            return res.json(MlAanuncios);
        }
        return res.json({"erro":"Falha ao inserir os anuncios!!!"})
    },

    async edit(req,res) {
        console.log("asdadads")
        const { id } = req.params;
        console.log(id);

        const anuncios = await connection('anuncios')
        .where('Id_Anuncio', id)
        .select('*');

        const prod_anun = await connection('produtos_anuncios')
        .where('Id_Anuncio', id)
        .select('*');
        console.log(prod_anun)
        return res.json({anuncios,prod_anun});

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
        const Id_Anuncio = req.params.id;
        const {Id_Produto, Quantidade}= req.body;
        const Id_Prod_Anun = Id_Produto+Id_Anuncio;

        try {
            console.log("asdasd");
            
            await connection('produtos_anuncios').insert({
                Id_Prod_Anun, Id_Anuncio, Id_Produto, Quantidade
            });

            await connection('produtos_anuncios')
            .where({Id_Prod_Anun: Id_Prod_Anun})
            .update({
                    Quantidade:Quantidade
            });
            console.log("relação criada");
            return res.json({Id_Prod_Anun, Title});

        } catch (error) {
            try{
                
                console.log("relação atualizada");
                return res.json({Id_Anuncio, Title});
            } catch (error) {
                return res.json(error)
            }
        }
        
    }
    
}