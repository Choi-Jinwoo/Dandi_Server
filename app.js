const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors())
app.use("/auth", require('./router/auth'));
app.use("/adminpage", require('./router/adminPage'));
app.use("/channel", require("./router/channel"));
app.use("/channelAdmin", require("./router/channelAdmin"));
app.use("/school", require("./router/school"));
app.use("/channelevent", require("./router/channelEvent"));
app.use("/profile", require("./router/profile"));
/*
cors회피
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "GET, POST");
    res.setHeader("Access-Contorl-Allow-Headers", "X-Requested-With,content-type, Authorization");
})
*/
models.sequelizeInit();

app.listen(5000, () => {
    console.log("Server is running at port 5000");
})