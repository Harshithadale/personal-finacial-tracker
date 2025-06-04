import React from 'react'
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

function ChartComponent({sortedTransactions}) {
  console.log(sortedTransactions)
    const data = sortedTransactions.map((item) =>{
      return {date:item.date,amount:item.amount}
    })
    let spendingData = sortedTransactions
  .filter((transaction) => transaction.type === "expense")
  .map((transaction) => ({
    tag: transaction.tag,
    amount: transaction.amount,
  }))
    let finalSpendings = spendingData.reduce((acc,obj) =>{
      let key = obj.tag;
      if(!acc[key]){
        acc[key] = {tag:obj.tag,amount:obj.amount}
      }
      else{
        acc[key].amount += obj.amount
      }
      return acc
    },{})

    finalSpendings = Object.values(finalSpendings); 
    console.log(finalSpendings)
  const config = {
    data:data,
    width:650,
    xField: 'date',
    yField: 'amount',
  };
   const spendingConfig = {
    data: finalSpendings,
    width:400,
    angleField: 'amount',
    colorField: 'tag',
  };
  let chart;
  let pieChart;
  return (  
    <div className='charts-wrapper'>
      <div>
        <h2>Your Analytics</h2>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      </div>
       <div>
        <h2>Your Spendings</h2>
        {finalSpendings.length !==0 ?<Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />:<p style={{color:"grey",textAlign:'center',fontWeight:"1.2rem"}}>You don't Have any Spenings Till Now</p>}
      </div>
    </div>
  )
}

export default ChartComponent