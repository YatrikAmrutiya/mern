const express = require("express")
const fs = require("fs")
const router = express.Router();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//populate data points and return
async function timeSeries(obj) {
    data = [
        {
            original_value: [],
            forecasted_value: [],
            min_band: [],
            max_band: [],
            line_status: [],
            timestamp: [],
            measure: "",
            dimensions: []
        }
    ]

    data[0].measure = obj.measure
    data[0].dimensions = obj.dimensions
    //read file named as passed object's _id
    await fs.readFile("./api/assignment_data/" + obj._id + ".json", "utf-8", function read(err, datas) {
        if (err) {
            throw err;
        }
        const filedata = JSON.parse(datas)
        filedata.map(line => data[0].original_value.push(line.original_value))
        filedata.map(line => data[0].forecasted_value.push(line.forecasted_value))
        filedata.map(line => data[0].min_band.push(line.min_band))
        filedata.map(line => data[0].max_band.push(line.max_band))
        filedata.map(line => data[0].line_status.push(line.line_status))
        filedata.map(line => data[0].timestamp.push(line.timestamp))
    })

    setTimeout(() => {
        try {
            fs.writeFileSync("./api/timeseries.json", JSON.stringify(data), { encoding: 'utf8', flag: 'w' })
        } catch (error) {
            console.log(error)
        }
    }, 300);

}



//return the data to plot line chart 
router.route("/api/debug/:num").get((req, res) => {

    fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
        if (err) {
            console.log(err);
        }
        const objdata = JSON.parse(data)
        timeSeries(objdata[req.params.num])
    })

    fs.readFile("./api/timeseries.json", "utf8", function read(err, data) {
        if (err) {
            console.log(err);
        }
        const objdata = JSON.parse(data)
        res.json(data)
    })
})


module.exports = router;
