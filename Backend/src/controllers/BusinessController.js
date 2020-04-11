const connection = require('../database/connection');
const Meli = require('mercadolibre-nodejs');

const Meli2 = require('mercadolibre');
const axios = require('axios');
//var meli = new Meli


module.exports = {
    async teste(req,res){
        const [config] = await connection('config').where('id',1).select('*');

        const [empresa] = await connection('empresas')
        .where('id',"489980023")
        .select('*');
        //console.log(empresa);

     
        var meliObject = new Meli(config.client_id, config.client_secret, empresa.Access_Token, empresa.Refresh_Token);
        //console.log(empresa);

        const url = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${config.client_id}&client_secret=${config.client_secret}&refresh_token=${empresa.Refresh_Token}`
        var novotoken = await axios.post(url)
        //console.log(novotoken);
        await connection('empresas')
            .where({id: novotoken.data.user_id})
            .update({
                Access_Token:novotoken.data.access_token
            });
        var itemCode = await meliObject.get(`/users/${empresa.id}/items/search`,empresa.Access_Token);
        itemCode = JSON.stringify(itemCode.results);
        itemCode = itemCode
        .replace('[','')
        .replace(']','')
        .replace(/"/g,'')
        
        var items = await axios.get("https://api.mercadolibre.com/items?ids=" + itemCode);
        /*var anuns ={};
        var anun ={};
        items.data.forEach(item => {
            anun = {Id_Anuncio: item.body.id,
                SellerId_Empresa: empresa.id,
                Title: item.body.title,
                status: ((item.body.status == "active") ? true : false),
                Price: item.body.price,
                Listing_type_id: item.body.listing_type_id,
                Available_quantity:0,
                Free_shipping: "NA",
                Shipping_mode: "NA"
            };
            

            try {
                console.log(anun.Title)
            } catch (error) {
                return res.json(error);
            }
            
            anuns += anun;
        }); */
        
    const fieldsToInsert = items.data.map(item =>({
            Id_Anuncio: item.body.id,   
            SellerId_Empresa: empresa.id,
            Title: item.body.title,
            status: ((item.body.status == "active") ? true : false),
            Price: item.body.price,
            Listing_type_id: item.body.listing_type_id,
            Available_quantity:0,
            Free_shipping: "NA",
            Shipping_mode: "NA",

            Free_shipping: ((item.body.status == "active") ?  item.body.shipping.free_shipping : ''),
            Shipping_mode: ((item.body.status == "active") ?  item.body.shipping.mode : '')
                  
            }));
            
            await connection('anuncios').insert(fieldsToInsert)
            .then(() => { console.log("handle success")})
            .catch((error) => { console.log(error)});
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