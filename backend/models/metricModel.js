const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const metricsSchema = new Schema({
    measure: { type: String },
    dimensions: [
        {
            name: { type: String },
            value: { type: String },
        }
    ]
})



// const timeSeriesSchema = new Schema({
//     original_value: {
//         type: Double
//     },
//     forecasted_value: {
//         type: Double
//     },
//     min_band: {
//         type: Double
//     },
//     max_band: {
//         type: Double
//     },
//     "line_status": {
//         type: Int32
//     },
//     "timestamp": {
//         type: String
//     }
// });



const Metric = mongoose.model("Metric", metricsSchema, 'metrics');
// const TimeSeries = mongoose.model("Timeseries", timeSeriesSchema, 'metrics');

module.exports = Metric;