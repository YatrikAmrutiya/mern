const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

//connect to mongoose
mongoose.connect("mongodb+srv://yatrik:1234@cluster0.fdqmq.mongodb.net/greendeck?retryWrites=true&w=majority");

//require routes
app.use("/", require("./routes/metricsRoute"))

app.listen(3001, function () {
    console.log("up and running")
})


