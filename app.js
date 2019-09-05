const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const origin = require("./middleware/origin"); //middleware
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
app.use(origin);
app.use('/static', express.static(__dirname + '/public'));
app.use("/auth", require('./router/auth'));
app.use("/admin-page", require('./router/adminPage'));
app.use("/channel", require("./router/channel"));
app.use("/channel-admin", require("./router/channelAdmin"));
app.use("/school", require("./router/school"));
app.use("/channel-event", require("./router/channelEvent"));
app.use("/profile", require("./router/profile"));
app.use("/image" , require("./router/image"));

models.sequelizeInit();

app.listen(5000, () => {
    console.log(`Server is running at port 5000`);
})