import { createModule } from 'meteor-rpc';
import { NotesCollection } from '@/api/colab/notes';
import { Meteor } from 'meteor/meteor';
import { z } from 'zod';

const NotesModule = createModule('notes')
  .addMethod(
    'create',
    z.object({ boardId: z.string(), title: z.string() }),
    // async (boardId) => {
    async ({ boardId, title }) => {
      const now = new Date();
      return NotesCollection.insertAsync({
        boardId,
        title,
        content: '',
        createdBy: Meteor.userId(),
        createdAt: now,
        updatedAt: now,
      });
    }
  )

  .addMethod(
    'updateContent',
    z.object({ id: z.string(), content: z.string() }),
    async ({ id, content }) => {
      const now = new Date();
      return NotesCollection.updateAsync({ _id: id }, { $set: { content, updatedAt: now } });
    }
  )

  .addMethod('delete', z.string(), async (id) => {
    return NotesCollection.removeAsync({ _id: id });
  })

  .addPublication('byBoard', z.string(), (boardId) => {
    return NotesCollection.find({ boardId });
  })

  .buildSubmodule();

export default NotesModule;
