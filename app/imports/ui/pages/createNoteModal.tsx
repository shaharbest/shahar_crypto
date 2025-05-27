import { Form, Modal, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { client } from '@/api/client';

interface Values {
  title?: string;
}

interface CreateNoteModalProps {
  boardId: string;
  notes: any[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateNoteModal = ({ boardId, notes, open, setOpen }: CreateNoteModalProps) => {
  const [form] = useForm();

  const onCreate = (values: Values) => {
    client.notes.create({ boardId, title: values.title });
    setOpen(false);
  };

  return (
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
        rules={[{ required: true, message: 'Please input the note title' }]}
      >
        <Input />
      </Form.Item>
    </Modal>
  );
};
