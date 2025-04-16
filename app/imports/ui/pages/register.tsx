import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router';
import { Form, Input, Button, Typography } from 'antd';
import { useUser, useLoggingIn } from '@/ui/hooks/users';

const { Title } = Typography;

export default () => {
  const navigate = useNavigate();
  const user = useUser();
  const loggingIn = useLoggingIn();

  if (loggingIn) return <p>Loading...</p>;

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <Form
      style={{ maxWidth: '30rem', marginInline: 'auto' }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={({ email, password }) => {
        Meteor.call('createUser', { email, password }, (err) => {
          if (err) {
            console.error(err);
          } else {
            navigate('/');
          }
        });
      }}
    >
      <Form.Item label={null}>
        <Title level={2}>Register</Title>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
