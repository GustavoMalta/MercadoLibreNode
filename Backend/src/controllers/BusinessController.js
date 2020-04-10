const connection = require('../database/connection');
const Meli = require('mercadolibre-nodejs');
const axios = require('axios');
//var meli = new Meli

const client_id = "64791682
const client_secret = "5SrRnpfUt3
const access_token = "APP_USR-6479168213943
const refresh_token = "TG-5e8f86c34d9583000


module.exports = {
    async teste(req,res){
        var meliObject = new Meli(client_id, client_secret, access_token, refresh_token);
        console.log("teste abaixo");
        var itemCode = await meliObject.get(`/users/489980023/items/search`,access_token);

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
        
        return res.json(items.data);
    },
    
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
        },
    
}