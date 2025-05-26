import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import "./style.css";
function ExpenseModal({ isExpenseModalVisible, hideExpenseModal, onFinish }) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Income"
        visible={isExpenseModalVisible}
        onCancel={hideExpenseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
            form.resetFields();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the transation!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the expense amount!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select the expense date!",
              },
            ]}
          >
            <DatePicker className="custom-input" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "Please select a tag!",
              },
            ]}
          >
            <Select className="select-input-2" placeholder="Select a tag">
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="transport">Transport</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="health">Health</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ fontWeight: 600 }}>
            <Button htmlType="submit" type="primary">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ExpenseModal;
