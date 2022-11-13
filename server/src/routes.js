const routes = require("express").Router();
const { authUser } = require("./auth");
const { login } = require("./login");
const { searchMovies } = require("./search");

module.exports = () => 
    routes
        .post("/login", login)
        .use("*", authUser)
        .get("/search", searchMovies)
        .all('*', (req, res) => {
            res.status(404).json({
                message: "Sorry! This address doesn't exist",
                status: 404
            })
        })