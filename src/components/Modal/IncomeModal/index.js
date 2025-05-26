import React from 'react'
import {Button,Modal,Form,Input,DatePicker,Select, message} from 'antd'
function IncomeModal({isIncomeModalVisible,hideIncomeModal,onFinish}) {
  const [form] = Form.useForm()
  return (
    <div> 
    <Modal style={{fontWeight:600}}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={hideIncomeModal}
      footer={null}
      >
        <Form form={form} layout="vertical" onFinish={(values)=>{
            onFinish(values,"income");
            form.resetFields();
        }}>
          <Form.Item
            style={{fontWeight:600}}
            label ="Name"
            name="name"
            rules={[
              {
                required:true,
                message:"Please input the name of the transation"
              }
            ]}
          >
            <Input type='text' className='custom-input'/>
          </Form.Item>
          <Form.Item
            style={{fontWeight:600}}
             label ="Amount"
            name ="amount"
            rules={[
              {
                required:true,
                message:"Please input the  income amount!"
              }
            ]}
          >
            <Input type='text' className='custom-input'/>
          </Form.Item>
          <Form.Item
            style={{fontWeight:600}}
           label ="Date"
            name ="date"
            rules={[
              {
                required:true,
                message:"Please select income date!"
              }
            ]}
          >
            <DatePicker format="YYYY-MM-DD" className='custom-input'/>
          </Form.Item>
          <Form.Item
            style={{fontWeight:600}}
            label="Tag"
            name="tag"
            rules={[
              {
                required:true,
                message:"Please select a tag!"
              }
            ]}
          >
          <Select className='select-input-2'>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item  
          style={{fontWeight:600}}>
            <Button htmlType='submit' type="primary">Add Income</Button>
          </Form.Item>
        </Form>
    </Modal>
    </div>
  )
}

export default IncomeModal