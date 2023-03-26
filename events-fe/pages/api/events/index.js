const {events} = require('./data.json')

export default (req, res) => {
  if(req.method === "GET") { 
    res.status(200).json(events);
  }
}
