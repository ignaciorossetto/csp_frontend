import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineChartPropsType = {
  suppliesDate: []; 
  suppliesPrice: number[]; 
  name: string;
};


const LineChart : React.FC<LineChartPropsType> = (props) => {

    const [labels, setLabels] = useState<[]>([])
    const [materialDataSet, setMaterialDataSet] = useState<number[]>([])

    useEffect(()=>{
        setLabels(props.suppliesDate)
    },[props.suppliesDate])

    useEffect(()=>{
        setMaterialDataSet(props.suppliesPrice)
    },[props.suppliesPrice])

    const options = {
        responsive: true,
        scales: {
          y: {
            min: Math.min(...materialDataSet) * 0.9,
            max: Math.max(...materialDataSet) * 1.1,
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: props?.name,
          },
        },
      };
    
    const data = {
      labels,
      datasets: [
        {
          label: `Precio ${props?.name} en us$`,
          data: materialDataSet,
          tension: 0.2,
          fill: true, 
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointRadius: 7
        }
      ],
    };
  return (
    <Line options={options} data={data} />
  )
}

export default LineChart