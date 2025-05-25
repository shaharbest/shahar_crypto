import { Form, Input, Button } from "antd";

type Values = {
  noteId: string;
  content: string;
};

export default ({ content }: Values) => {
  return (
    <Form
      layout="vertical"
      initialValues={{ content }}
      onFinish={(values) => {
        console.log("Form submitted with values:", JSON.stringify(values, null, 2));
      }}
    >
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input your note!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
