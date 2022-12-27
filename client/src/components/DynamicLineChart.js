import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

const DynamicLineChart = () => {
    const [page, setPage] = useState(1);
    const [chartData, setChartData]  = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:4000/api/pump?start=${page}`)
        .then(res => {
            const {Data: pumpData} = res.data;
            setChartData({
                    labels: pumpData.map((_, i) => i + 1),
                    datasets: [
                      {
                        label: "Pump Data",
                        data: pumpData.map((data) => data.avgvalue),
                        backgroundColor: [
                          "rgba(75,192,192,1)",
                          "#ecf0f1",
                          "#f0331a",
                          "#f3ba2f",
                          "#2a71d0"
                        ],
                        borderColor: "black",
                        borderWidth: 2
                      }
                    ]
                  
                });
        })
    }, [page]);

    const hasData = chartData.datasets && 
      chartData.datasets[0].data.length !== 0 ? true : false;

    if(hasData === false){
        return (<div>Loading</div>);
    }
     
    return (
        <div className='app-Chart'>
            <div>
                <button onClick={() => setPage(previousVal => previousVal - 1) }>Previous</button>
                <span>&nbsp;</span>
                <button onClick={() => setPage(nextVal => nextVal + 1) }>Next</button>
            </div>
            Page - {page}
            {hasData && <Line data={chartData} />}
        </div>);
}

export default DynamicLineChart;