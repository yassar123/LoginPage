const axios = require('axios');

const searchMovies = async (req, res) => {
    try{
        const {title} = req.query;
        const { data } = await axios.get(`https://api.tvmaze.com/search/shows?q=${title}`);
        res.json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {
    searchMovies
}