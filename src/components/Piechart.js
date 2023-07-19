import React from 'react'
import ApexCharts from 'react-apexcharts';

export default function Piechart() {
  const chartOptions = {
    labels: ['Bitcoin', 'Ethereum', 'Luna', 'Tether'],
    series: [500000000000, 200000000000, 10000000000, 50000000000],
    colors: ['#F44336', '#9C27B0', '#03A9F4', '#4CAF50'],
    legend: {
      show: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="piechart" style={{ backgroundColor: 'white' }}>
        <h4
          style={{
            marginLeft: '25px',
            padding: '10px',
            fontWeight: 'bolder',
          }}
        >
          Portfolio
        </h4>
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <ApexCharts
            options={chartOptions}
            series={chartOptions.series}
            type="pie"
            width="100%"
          />
        </div>
      </div>
    </>
  );
}
// pie