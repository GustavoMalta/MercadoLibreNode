const connection = require('../database/connection');

module.exports = {
    async index(req,res) {
        const {page = 1} = req.query;

        const [count] = await connection('vendas')
            .count();
        res.header('X-Total-Count', count['count(*)']);

        const test = await connection('vendas')
        .limit(5)
        .offset((page-1)*5)
        console.log(test);
        return res.json(test);

        },

    async search(req,res) {

        const orders = await connection('vendas')
        .where('Id_Venda',req.body.Id_Venda)
        .select('*');

        console.log(orders);
        return res.json(orders);

        },

    async create(req,res) {
        /*

            "Id_Venda":"",
            "Id_Seller":"",
            "Status":"",
            "Date_created":"",
            "Total_amount":"",
            "Total_paid_amount":"",
            "Shipping_cost":"",
            "Marketplace_fee":"",
            "Payment_method_id":"",
            "Refunded":"",
            "List_cost":"",
            "Total_custo":"",
       
        
        */
        //*******************************teste********************* */

        var meliObject = new Meli(client_id, client_secret, access_token, refresh_token);
        console.log("teste Orders");
        var itemCode = await meliObject.get(`orders`,access_token);

        itemCode = JSON.stringify(itemCode.results);
        itemCode = itemCode
        .replace('[','')
        .replace(']','')
        .split('"').join(',')
        console.log(itemCode);
        try {
            var items = await axios.get("https://api.mercadolibre.com/items?ids=" + itemCode);
        //var items = await meliObject.request("https://api.mercadolibre.com/items\\?ids="+itemCode); // so com o axios para funcionar
        } catch (error) {
            console.log(error);
        }
        console.log(items.data.body);
        
        //*******************************/teste********************* */
    

                console.log(req.body);
        const {Id_Venda, Id_Seller, Status, Date_created, Total_amount ,Total_paid_amount, Shipping_cost, Marketplace_fee, Payment_method_id, RefundedList_cost, Total_custo}= req.body;

            try {
                await connection('vendas').insert({
                    Id_Venda, Id_Seller, Status, Date_created, Total_amount ,Total_paid_amount, Shipping_cost, Marketplace_fee, Payment_method_id, RefundedList_cost, Total_custo
                });
                return res.json({Id_Venda, Date_created});
    
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