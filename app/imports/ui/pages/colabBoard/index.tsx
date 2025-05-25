import { Link, useParams } from 'react-router';
import { client } from '@/api/client';
import { Result, Typography, Layout, Flex, Form, Modal, Input, Button } from 'antd';
import { useState } from 'react';
import { Menu } from 'antd';
import ReactMarkdown from "react-markdown";

const { Title } = Typography;
const { Content, Sider, Header } = Layout;
const { TextArea } = Input;

interface Values {
  title?: string;
};

export default () => {
  const { id, noteId } = useParams<{ id: string; noteId?: string }>();
  const { data: boards } = client.boards.single.usePublication(id);
  const { data: notes } = client.notes.byBoard.usePublication(id);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!boards?.length) return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this colab board doesn't exist."
    />
  );

  const board = boards[0];

  const currentNote = notes?.find(note => note._id === noteId) ?? notes?.[0];

  const onCreate = (values: Values) => {
    client.notes.create({ boardId: id, title: values.title });
    setOpen(false);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width="25%">
          <Button onClick={() => setOpen(true)}>
            Create Note
          </Button>
          {
            notes?.length && (
              <Button onClick={() => client.boards.clearAllNotes(id)}>
                Clear All Notes
              </Button>
            ) || null
          }
          {
            notes?.length &&
            <Menu
              mode="inline"
              items={notes?.map(note => ({
                key: note._id,
                label: (
                  <Link to={`/boards/${id}/notes/${note._id}`}>
                    {note.title}
                  </Link>
                ),
              })) ?? []}
              selectedKeys={[noteId || notes?.[0]?._id]}
              style={{ height: '100%', borderRight: 0 }}
            /> || <div style={{ padding: '1rem' }}>Empty Board</div>
          }
        </Sider>
        <Layout>
          <Header>
            <Flex justify="space-between" align="middle">
              <Title level={2} style={{ margin: 0 }}>
                {board.title}
              </Title>
              <Link to="/boards">
                Back to Boards
              </Link>
            </Flex>
          </Header>
          <Content style={{ padding: '1rem' }}>
            {
              currentNote && !isEditing && (
                <Flex justify='space-between'>
                  <div>
                    <ReactMarkdown>
                      {currentNote.content || 'Empty Note'}
                    </ReactMarkdown>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </Flex>
              )
            }
            {
              currentNote && isEditing && (
                <Form
                  layout="vertical"
                  initialValues={{ content: currentNote.content }}
                  onFinish={(values) => {
                    client.notes.updateContent({ id: currentNote._id, content: values.content });
                    setIsEditing(false);
                  }}
                >
                  <Form.Item name="content">
                    <Input.TextArea autoSize />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button type="secondary" htmlType="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              )
            }
          </Content>
        </Layout>
      </Layout>
      <Modal
        open={open}
        title="Create a new note"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ title: `note ${notes.length + 1}` }}
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
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};
