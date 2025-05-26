import React from 'react'
import './style.css'
import { Card,Row,Col } from 'antd'
import Button from '../Button'
function Cards({income,expense,totalBalance,showIncomeModal,showExpenseModal,}) {
  return (
    <div>
      <Row className='my-row'>
        <Card className="my-card" bordered={true}>
          <h2>Current Balance</h2>
          <p><span>&#8377;</span>{totalBalance}</p>
          <Button text={"Reset Button"} blue={true}/>
        </Card>
        <Card className="my-card" bordered={true}>
          <h2>Total Income</h2>
          <p><span>&#8377;</span>{income}</p>
          <Button text={"Add Income"} blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card  bordered={true} className="my-card" >
          <h2>Total Expenses</h2>
          <p><span>&#8377;</span>{expense}</p>
          <Button text={"Add Expense"} blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  )
}

export default Cards