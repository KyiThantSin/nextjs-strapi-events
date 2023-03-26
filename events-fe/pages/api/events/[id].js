const {events} = require('./data.json');

export default (req,res) => {
    let evt = events.filter ( e => e.id === req.query.id )
    
    if(req.method === "GET") {
        res.status(200).json(evt)
    }
}