
const connection = require('../database/connection');
const GenerateUniqueId = require('../utils/GenerateUniqueId');

module.exports = {
    async create(req,res) {
    const {name, email,	whatsapp, city,	uf} = req.body;

    const id = GenerateUniqueId();

    await connection('ongs').insert({
        id,name, email,	whatsapp, city,	uf,
    });

    console.log(req.body);
    return res.json({id, email,whatsapp});

    },

    async list(req,res) {

    const test = await connection('ongs').select('*');
    console.log(test);
    return res.json(test);

    }
}