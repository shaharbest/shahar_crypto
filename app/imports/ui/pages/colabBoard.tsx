import { Link, useParams } from 'react-router';
import { client } from '@/api/client';
import { Result, Typography, Layout, Flex, Form, Button, Input } from 'antd';
import { useState } from 'react';
import { Menu } from 'antd';
import ReactMarkdown from 'react-markdown';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import { CreateNoteModal } from './createNoteModal';
import { useDark } from '../hooks/dark';
import { Card } from 'antd';
import { Space } from 'antd';

const { Title } = Typography;
const { Content, Sider, Header } = Layout;
const { TextArea } = Input;

export default () => {
  const { id, noteId } = useParams<{ id: string; noteId?: string }>();
  const { data: boards } = client.boards.single.usePublication(id);
  const { data: notes } = client.notes.byBoard.usePublication(id);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isDark } = useDark();

  if (!boards?.length) return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this colab board doesn't exist."
    />
  );

  const board = boards[0];
  const currentNote = notes?.find(note => note._id === noteId) ?? notes?.[0];
  const isBoardEmpty = !currentNote;
  const editButton = (
    <Button
      icon={<EditOutlined />}
      type='primary'
      onClick={() => setIsEditing(true)}
    />
  );

  return (
    <>
      <Layout style={{ flex: 1 }}>
        <Header>
          <Flex justify="space-between" align="middle">
            <Title level={2} style={{ paddingInline: '1.5rem' }}>
              {board.title}
            </Title>
            <Link to="/boards">
              Back to All Boards
            </Link>
          </Flex>
        </Header>
        <Layout hasSider={!isBoardEmpty}>
          {
            !isBoardEmpty && (
              <Sider
                theme={isDark ? 'dark' : 'light'}
              >
                <Flex
                  style={{ paddingBlock: '1rem', paddingInline: '1.5rem' }}
                  gap=".5rem"
                  justify='center'
                >
                  <Button
                    type='primary'
                    onClick={() => setOpen(true)}
                  >
                    New
                  </Button>
                </Flex>
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
                  onClick={() => setIsEditing(false)}
                />
              </Sider>
            )
          }

          {
            !currentNote && (
              <Result
                icon={<SmileOutlined />}
                title="No notes in this board"
                extra={<Button size='large' onClick={() => setOpen(true)} type="primary">Create New Note</Button>}
                style={{ marginInline: 'auto' }}
              />
            )
          }
          {
            currentNote && (
              <Content>
                <Card
                  title={currentNote.title}
                  {...(currentNote && !isEditing && {
                    extra: <Space>
                      {currentNote.content && editButton}
                      <Button
                        type='primary'
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => client.notes.delete(currentNote._id)}
                      />
                    </Space>
                  })}
                  style={{ marginInlineStart: '1rem' }}
                >
                  {currentNote && !isEditing && (

                    currentNote.content ? (
                      <ReactMarkdown>
                        {currentNote.content}
                      </ReactMarkdown>
                    ) : (

                      <Result
                        icon={<SmileOutlined />}
                        title="Empty Note"
                        extra={<Button size='large' onClick={() => setIsEditing(true)} type="primary">Insert Content</Button>}
                      // style={{ marginInline: 'auto' }}
                      />
                    )
                  )}
                  {currentNote && isEditing && (
                    <Form
                      layout="vertical"
                      initialValues={{ content: currentNote.content }}
                      onFinish={(values) => {
                        client.notes.updateContent({ id: currentNote._id, content: values.content });
                        setIsEditing(false);
                      }}
                    >
                      <Form.Item name="content">
                        <TextArea
                          autoSize={{ minRows: 5 }}
                          placeholder="insert your note in markdown"
                          autoFocus
                        />
                      </Form.Item>
                      <Form.Item style={{ marginBlockEnd: 0 }}>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button type="secondary" htmlType="button" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </Card>
              </Content>
            )
          }
        </Layout>
      </Layout >
      <CreateNoteModal
        boardId={id}
        notes={notes || []}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
