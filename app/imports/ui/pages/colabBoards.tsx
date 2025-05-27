import { Button, Form, List, Input, Card, Modal } from 'antd';
import { client } from '@/api/client';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { Link } from 'react-router';
import { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const { data: userBoards } = client.boards.mine.usePublication();
  const [open, setOpen] = useState(false);

  const onCreate = (values: Values) => {
    client.boards.create(values.title);
    setOpen(false);
  };

  const shareBoard = (id, email) => {
    client.boards.shareWith({ id, email });
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        style={{ marginBottom: '1rem' }}
      />
      <List
        locale={{ emptyText: 'No Boards' }}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
        dataSource={userBoards}
        renderItem={b => (
          <List.Item>
            <Card
              title={<Link to={`/boards/${b._id}`}>{b.title}</Link>}
              extra={
                <>
                  <Button
                    onClick={() => client.boards.delete(b._id)}
                    danger
                    icon={<CloseOutlined />}
                  />
                  {/* <Button */}
                  {/*   onClick={() => shareBoard(b._id, 'bestshahar9@gmail.com')} */}
                  {/*   style={{ marginBottom: '1rem' }} */}
                  {/* > */}
                  {/*   Test */}
                  {/* </Button> */}
                </>
              }
            >
              Board Details...
            </Card>
          </List.Item>
        )}
      />
      <Modal
        open={open}
        title="Create a new board"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ title: `board ${userBoards.length + 1}` }}
            clearOnDestroy
            onFinish={values => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the new board!' }]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};
