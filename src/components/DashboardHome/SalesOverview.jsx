import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Select, Spin } from 'antd'
import { useGetSalesProfitChartDataQuery } from '../../Redux/metaApis'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
)

const SalesOverview = () => {
  const [year, setYear] = useState(new Date().getFullYear())

  // Fetching sales and profit data for the selected year
  const {
    data: chartData,
    isLoading,
    isError,
  } = useGetSalesProfitChartDataQuery(year)

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading data..." />
      </div>
    )
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load data. Please try again later.</p>
      </div>
    )
  }

  // Prepare months data
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Extracting data for sales and profit
  const salesData = chartData?.data?.data.map((month) => month.totalSales)
  const profitData = chartData?.data?.data.map((month) => month.totalProfit)

  // Chart data setup
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total Sales (€)',
        data: salesData,
        borderColor: '#007bff',
        borderWidth: 2,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          )
          gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)')
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

          return gradient
        },
        tension: 0.4,
        pointBackgroundColor: '#007bff',
        pointHoverRadius: 6,
        pointRadius: 3,
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Profit (€)',
        data: profitData,
        borderColor: '#00ff00',
        borderWidth: 2,
        fill: true,
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#00ff00',
        pointHoverRadius: 6,
        pointRadius: 3,
        pointHoverBorderWidth: 2,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        grid: {
          display: true,
        },
        ticks: {
          callback: (value) => `€${value}`,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       display: false,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     x: {
  //       display: false,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 3,
  //     },
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  // }

  return (
    <div className="w-full h-full bg-white rounded-md p-6 shadow-md">
      {/* Year Selection */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {year} year sales €{chartData?.data?.totalSales}
        </h2>
        <Select
          className="min-w-32"
          defaultValue={year}
          placeholder="Select year"
          onChange={(year) => setYear(year)}
          options={Array.from(
            { length: new Date().getFullYear() - 2022 },
            (_, i) => {
              const year = 2023 + i
              return { value: year, label: year }
            }
          )}
        />
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default SalesOverview

// import { useState } from 'react'
// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Filler,
//   Tooltip,
// } from 'chart.js'
// import { Select, Spin } from 'antd'
// import { useGetSalesProfitChartDataQuery } from '../../Redux/metaApis'

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Filler,
//   Tooltip
// )

// const SalesOverview = () => {
//   const {
//     data: chartData,
//     isLoading,
//     isError,
//   } = useGetSalesProfitChartDataQuery()

//   if (isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Spin tip="Loading data..." />
//       </div>
//     )
//   }

//   if (isError) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <p>Failed to load data. Please try again later.</p>
//       </div>
//     )
//   }

//   // States
//   const [year, setYear] = useState(new Date().getFullYear())
//   const {
//     January,
//     February,
//     March,
//     April,
//     May,
//     June,
//     July,
//     August,
//     September,
//     October,
//     November,
//     December,
//   } = {}

//   // Chart data
//   const data = {
//     labels: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         label: 'Total Sales',
//         data: [
//           January || 25000,
//           February || 30000,
//           March || 20000,
//           April || 15000,
//           May || 40000,
//           June || 30000,
//           July || 25000,
//           August || 35000,
//           September || 20000,
//           October || 15000,
//           November || 10000,
//           December || 5000,
//         ],
//         borderColor: '#007bff',
//         borderWidth: 2,
//         fill: true,
//         backgroundColor: (context) => {
//           const chart = context.chart
//           const { ctx, chartArea } = chart

//           if (!chartArea) {
//             return null
//           }

//           const gradient = ctx.createLinearGradient(
//             0,
//             chartArea.top,
//             0,
//             chartArea.bottom
//           )
//           gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)')
//           gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

//           return gradient
//         },
//         tension: 0.4,
//         pointBackgroundColor: '#007bff',
//         pointHoverRadius: 6,
//         pointRadius: 3,
//         pointHoverBorderWidth: 2,
//       },
//     ],
//   }

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 25000,
//           callback: (value) => `€${(value / 1000).toFixed(0)}k`,
//           color: '#B0B0B0',
//           font: {
//             size: 12,
//           },
//         },
//         grid: {
//           color: '#EDEDED',
//           drawBorder: false,
//         },
//       },
//       x: {
//         ticks: {
//           font: {
//             size: 12,
//             weight: 'bold',
//           },
//           color: '#B0B0B0',
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const sales = context.raw
//             const profit = sales * 0.28 // Assuming profit is 28% of sales
//             return [
//               `Total Sales: €${sales.toLocaleString()}`,
//               `Profit on Sales: €${profit.toLocaleString()}`,
//             ]
//           },
//         },
//         displayColors: false,
//         backgroundColor: '#ffffff',
//         borderColor: '#EDEDED',
//         borderWidth: 1,
//         titleColor: '#333',
//         bodyColor: '#333',
//         titleFont: {
//           weight: 'bold',
//           size: 14,
//         },
//         bodyFont: {
//           size: 12,
//         },
//         padding: 10,
//       },
//       legend: {
//         display: false,
//       },
//     },
//     elements: {
//       line: {
//         borderWidth: 3,
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   }

//   return (
//     <div className="w-full h-full bg-white rounded-md p-6 shadow-md">
//       {/* Year Selection */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {year} year sales
//         </h2>
//         <Select
//           className="min-w-32"
//           defaultValue={year}
//           placeholder="Select year"
//           onChange={(year) => setYear(year)}
//           options={Array.from(
//             { length: new Date().getFullYear() - 2022 },
//             (_, i) => {
//               const year = 2023 + i
//               return { value: year, label: year }
//             }
//           )}
//         />
//       </div>

//       {/* Chart */}
//       <div className="h-[400px]">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   )
// }

// export default SalesOverview
