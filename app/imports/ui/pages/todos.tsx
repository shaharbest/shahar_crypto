import { Button, Typography, Form, List, Input, Checkbox, Flex } from 'antd';
import { client } from '@/api/client';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const { Text } = Typography;

export default () => {
  const [form] = Form.useForm();
  const { data: todos } = client.todos.todos.usePublication('todos');

  const setIsDone = (id: string, isDone: boolean) => {
    client.todos.updateTodo({ id, isDone });
  };

  return (
    <Flex
      vertical
      gap="1rem"
      style={{
        maxWidth: '50rem',
        marginInline: 'auto',
      }}
    >
      <List
        locale={{ emptyText: 'No items' }}
        bordered
        dataSource={todos}
        renderItem={({ text, isDone, _id: id }) => (
          <List.Item>
            <Flex gap="1rem">
              <Checkbox
                checked={isDone}
                onChange={() => setIsDone(id, !isDone)}
              />
              <Text
                editable={{
                  onChange: (text) => client.todos.updateText({ id, text }),
                }}
                delete={isDone}
              >
                {text}
              </Text>
            </Flex>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => client.todos.deleteSingle(id)}
            />
          </List.Item>
        )}
      />
      <Form
        onFinish={({ title }) => {
          client.todos.createTodo(title);
          form.resetFields();
        }}
        layout="inline"
        form={form}
        size="large"
      >
        <Form.Item
          label="New Item"
          name="title"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                const exists = todos.some((todo) => todo.text === value);
                return exists
                  ? Promise.reject(new Error('Item already exists'))
                  : Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} />
        </Form.Item>
      </Form>
    </Flex>
  );
};
