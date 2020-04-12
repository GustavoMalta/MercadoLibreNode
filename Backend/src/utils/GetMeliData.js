
const connection = require('../database/connection');

const Meli = require('mercadolibre-nodejs');
const axios = require('axios');

module.exports = {
    
    async GetAnuncios(req,res){
            const {config, empresa} = await Getconfig();

            var meliObject = new Meli(config.client_id, config.client_secret, empresa.Access_Token, empresa.Refresh_Token);

            const url = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${config.client_id}&client_secret=${config.client_secret}&refresh_token=${empresa.Refresh_Token}`
            var novotoken = await axios.post(url)
            //console.log(novotoken);
            await connection('empresas')
                .where({id: novotoken.data.user_id})
                .update({
                    Access_Token:novotoken.data.access_token
                });
            var itemCode = await meliObject.get(`/users/${empresa.id}/items/search`,empresa.Access_Token);
            
            const itemsSalvos = await connection('anuncios')
                .whereIn('Id_Anuncio', itemCode.results)
                .select('Id_Anuncio');
            
            var codesToInsert='';
            var codesToUpdate='';
            var fieldsToInsert=[];
            var fieldsToUpdate =[];
            itemCode.results.forEach(item => {
                    if(itemsSalvos.filter(x => x.Id_Anuncio == item).length > 0){
                        codesToUpdate+=item+',';
                    }else{
                        codesToInsert+=item+',';
                    };
            });
            /*
            console.log(itemCode);
            console.log(codesToUpdate);
            console.log(codesToInsert);*/
            itemCode = JSON.stringify(itemCode.results);
            itemCode = itemCode
            .replace('[','')
            .replace(']','')
            .replace(/"/g,'')

    if(codesToInsert.length>0){
        var insert = await axios.get("https://api.mercadolibre.com/items?ids=" + codesToInsert);
                fieldsToInsert = insert.data.map(item =>({
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
    }
    
    if(codesToUpdate.length>0){
        var update = await axios.get("https://api.mercadolibre.com/items?ids=" + codesToUpdate);
                    fieldsToUpdate = update.data.map(item =>({
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
    }
        return {fieldsToInsert, fieldsToUpdate};
    } 
};

async function Getconfig(){

    const [config] = await connection('config').where('id',1).select('*');

    const [empresa] = await connection('empresas')
    .where('id',"489980023")
    .select('*');

    return {config,empresa}
}