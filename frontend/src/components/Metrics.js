import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Line } from 'react-chartjs-2'
import '../styles/Metrics.css'
export default function Metrics() {
    //get id passed as paramater to route
    let { id } = useParams();
    //state to populate metrics
    const [metrics, setMetrics] = useState(
        [
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
    )

    //api call
    useEffect(() => {
        fetch(`/api/debug/${id}`).then(res => {
            if (res.ok) {
                console.log("all ok")
                setTimeout(() => { }, 2000);
                return res.json()
            } else {
                console.log("not ok")
            }
        }).then(
            (jsonRes) => {
                setMetrics(JSON.parse(jsonRes))
            },
            (message) => {
                document.write("Then failure:" + message);
            })
    }, [metrics])

    //get original value points 
    //return original value if lock true else return anomaly data points
    function genOriginalvalue(lock) {
        var value
        if (lock) {
            value = metrics[0].original_value.slice()
            metrics[0].line_status.forEach((item, index) => {
                if (item == 1 || item == 2) {
                    value[index] = null
                }
            })
        } else {
            value = metrics[0].original_value.slice()
            metrics[0].line_status.forEach((item, index) => {
                if (item == 1 || item == 2 || item == 3) {
                } else {
                    value[index] = null
                }
            })
        }
        return value
    }
    //return Max band data points
    function genMaxBand() {
        return metrics[0].max_band
    }
    //return Min band data points
    function genMinBand() {
        return metrics[0].min_band
    }
    //return Forcasted values
    function geForcastedValue() {
        return metrics[0].forecasted_value
    }
    //return Labels (timestamps) for chart 
    function generateLabels() {
        return metrics[0].timestamp
    }

    // const arr = ['min_band']
    const data = {
        labels: generateLabels(),
        datasets: [
            {
                label: 'Max band',
                data: genMaxBand(),
                borderColor: 'black',
                backgroundColor: 'rgb(128,128,128,0.5)',
                fill: false,
                hidden: false,
                borderWidth: 1,
                tension: 0.1

            },
            {
                label: 'Real value',
                data: genOriginalvalue(true),
                borderColor: 'rgb(0,0,179,1)',
                backgroundColor: 'rgb(108,108,108,1)',
                fill: '-1',
                hidden: false,
                borderWidth: 1,
                tension: 0.1
            },
            {
                label: 'Min band',
                data: genMinBand(),
                borderColor: 'black',
                backgroundColor: 'rgb(108,108,108,1)',
                fill: '-1',
                hidden: false,
                borderWidth: 1,
                tension: 0.1
            },
            {
                label: 'Forcasted value',
                borderDash: [3],
                data: geForcastedValue(),
                borderColor: '#40e0d0',
                backgroundColor: 'rgb(192,192,192,0.5)',
                hidden: false,
                borderWidth: 1,
                tension: 0.1
            },
            {
                label: 'Anomaly',
                data: genOriginalvalue(false),
                borderColor: 'red',
                backgroundColor: 'red',
                hidden: false,
                borderWidth: 1,
                tension: 0.1
            },

        ]
    };


    return (
        <div className="container">
            <h1> Metrics page {id}</h1>
            <h4>Measures </h4>
            <span className="badge bg-dark" id="zero">{metrics[0].measure.toUpperCase()}    </span>
            <br />
            <h4 id="dim">Dimensions </h4>
            <div className="chips">
                {metrics[0].dimensions.map((dimensionname) => (
                    <>
                        <span className="badge bg-dark zero" >{dimensionname.name.toUpperCase() + " : "}<span style={{ color: '#50c878' }}>  {dimensionname.value}</span></span>
                    </>
                ))}
            </div>
            <br />
            {genOriginalvalue(false).some(el => el !== null) ? <h3 style={{ color: '#ff2121' }}>Anomaly detected !</h3> : <h3 style={{ color: '#50c878' }}>All OK !</h3>}
            <Line
                data={data}
                options={{
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: true,
                            color: '#d8d3cd',
                            text: 'Metrics visualization'
                        }
                    },
                    scaleFontColor: 'red',
                    scales: {
                        x: {
                            ticks: {
                                color: '#d8d3cd'
                                //for ratation 
                                // maxRotation: 180,
                                // minRotation: 90
                            },

                        },
                        y: {
                            ticks: {
                                color: '#d8d3cd'
                            },
                            grid: {
                                drawBorder: false,
                                color: function (context) {

                                    return 'black';
                                },
                            },
                        },
                    }
                }}

            />
            <br />

            <nav aria-label="...">
                <ul class="pagination pagination-md justify-content-center">
                    <li class="page-item page" onClick={event => window.location.href = '/'} > <a class="page-link" >Home</a></li>
                    {
                        //pagination map
                        Array.from(Array(24)).map((e, i) => i).map((item, index) => {
                            return <li class="page-item page" onClick={event => window.location.href = `/metrics/${item}`} > <a class="page-link" >{item}</a></li>
                        })
                    }
                </ul>
            </nav>
        </div >
    )
}
