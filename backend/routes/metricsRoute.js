const express = require("express")
const fs = require("fs")

const router = express.Router();
const Metric = require("../models/metricModel");
//we don't need a create method but just for debug purposes :D
router.route("/create").post((req, res) => {

    const measure = req.body.measure;
    const dimensions = req.body.dimensions;
    const newMetric = new Metric({
        measure, dimensions
    });

    newMetric.save().then(() => { console.log("entered") }).catch(console.error());
})

router.route("/Metrics").get((req, res) => {
    Metric.find()
        .then(foundMetrics => res.json(foundMetrics))
})

router.route("/lists/:filename").get((req, res) => {
    fs.readFile("./api/assignment_data/" + req.params.filename + ".json", "utf8", function read(err, data) {
        // fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data;
        res.status(200).send(data)
        console.log("hello in hereee")
    })
})
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function timeSeries(obj) {
    data = [
        {
            original_value: [],
            forecasted_value: [],
            min_band: [],
            max_band: [],
            line_status: [],
            timestamp: []
        }
    ]
    var com = []
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
            // console.log("writting")
            fs.writeFileSync("./api/timeseries.json", JSON.stringify(data), { encoding: 'utf8', flag: 'w' })

        } catch (error) {
            console.log(error)
        }
    }, 500);

}

// router.route("/lists/custom/:num").get((req, res) => {

//     // console.log(typeof parseInt(req.params.num))
//     fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
//         // fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
//         if (err) {
//             console.log(err);
//         }
//         const objdata = JSON.parse(data)
//         // Promise.all([timeSeries(objdata[req.params.num])]).then((values) => {
//         //     console.log(values);
//         // });
//         timeSeries(objdata[req.params.num])


//     })

//     fs.readFile("./api/timeseries.json", "utf8", function read(err, data) {
//         if (err) {
//             console.log(err);
//         }
//         const objdata = JSON.parse(data)
//         res.json(data)
//     })
// })



router.route("/debug/:num").get((req, res) => {

    // console.log(typeof parseInt(req.params.num))
    fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
        // fs.readFile("./api/assignment_data/metrics.json", "utf8", function read(err, data) {
        if (err) {
            console.log(err);
        }
        const objdata = JSON.parse(data)
        // Promise.all([timeSeries(objdata[req.params.num])]).then((values) => {
        //     console.log(values);
        // });
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
