import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router';
import { Button, Form, Input, Space, Typography } from 'antd';

const { Title } = Typography;

export default () => {
  const navigate = useNavigate();

  return (
    <Form
      style={{ maxWidth: '30rem', marginInline: 'auto' }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => {
        Meteor.loginWithPassword(values.email, values.password, (err) => {
          if (err) {
            console.error(err);
          } else {
            navigate('/');
          }
        });
      }}
      autoComplete="off"
    >
      <Form.Item label={null}>
        <Title level={2}>Login</Title>
      </Form.Item>
      <Form.Item name="email" label="Email" required>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" required>
        <Input.Password />
      </Form.Item>
      <Form.Item label={null}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => navigate('/register')}>Register</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
