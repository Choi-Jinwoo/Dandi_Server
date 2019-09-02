const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const port = require("./config/server").port;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors())
app.use('/static', express.static(__dirname + '/public'));
app.use("/auth", require('./router/auth'));
app.use("/adminpage", require('./router/adminPage'));
app.use("/channel", require("./router/channel"));
app.use("/channelAdmin", require("./router/channelAdmin"));
app.use("/school", require("./router/school"));
app.use("/channelevent", require("./router/channelEvent"));
app.use("/profile", require("./router/profile"));
app.use("/image" , require("./router/image"));

models.sequelizeInit();

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})