
const connection = require('../database/connection');

module.exports = {
    async create(req,res) {
    const {title, description, value} = req.body;
    const ong_id = req.headers.authorization;
        try {
            const [id] = await connection('incidents').insert({
                title, ong_id, description, value,
            });
  
        console.log(req.body);
        return res.json({id, title, ong_id});

        } catch (error) {
            return res.json(error)
        }
    },

    async list(req,res) {
        const {page = 1} = req.query;

        const [count] = await connection('incidents')
            .count();
        res.header('X-Total-Count', count['count(*)']);

        const test = await connection('incidents')
        .join('ongs', 'ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);
        console.log(test);
        return res.json(test);

        },

        async delete(req,res) {
            const { id } = req.params;
            const ong_id = req.headers.authorization;
            
            const incident = await connection('incidents')
                .where('id',id)
                .select('ong_id')
                .first();
            
            if (!incident){
                return res.status(400).json({error:'incident not found'});
            }
            if (incident.ong_id != ong_id || !incident){
                return res.status(401).json({error:'operation not permited'});
            }

            console.log(4);
            await connection('incidents').where('id', id).delete();
            
            return res.status(204).send();
    }
};