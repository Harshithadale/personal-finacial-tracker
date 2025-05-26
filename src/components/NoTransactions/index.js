import React from 'react'
import notransaction from "../../assets/image.png"
import { Color } from 'antd/es/color-picker'

function NoTransactions() {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",alignItems:"center",marginBottom:"2rem"}}>
        <img src={notransaction} width="400px"/>
        <p style={{color:"grey",textAlign:'center',fontWeight:"1.2rem"}}>You Have No Transactions Currently</p>
    </div>
  )
}

export default  NoTransactions