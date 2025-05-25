import { createModule } from 'meteor-rpc';
import { BoardsCollection } from '@/api/colab/boards';
import { NotesCollection } from '@/api/colab/notes';
import { Meteor } from 'meteor/meteor';
import { z } from 'zod';

const BoardsModule = createModule('boards')
  .addMethod('create', z.string().min(1), async (title) => {
    const userId = Meteor.userId();
    const now = new Date();

    return BoardsCollection.insertAsync({
      title,
      ownerId: userId,
      sharedWith: [userId],
      createdAt: now,
      updatedAt: now,
    });
  })

  .addMethod('updateTitle', z.object({ id: z.string(), title: z.string() }), async ({ id, title }) => {
    const now = new Date();
    return BoardsCollection.updateAsync({ _id: id }, { $set: { title, updatedAt: now } });
  })

  .addMethod('delete', z.string(), async (id) => {
    const userId = Meteor.userId();

    // check if the user is the owner of the board
    const board = await BoardsCollection.findOneAsync({ _id: id });

    if (!board) {
      throw new Meteor.Error('Board not found');
    }

    if (board.ownerId !== userId) {
      throw new Meteor.Error('Not authorized');
    }

    // return BoardsCollection.removeAsync({ _id: id, ownerId: Meteor.userId() });
    // also remove all notes
    
    return await Promise.all([
      BoardsCollection.removeAsync({ _id: id }),
      NotesCollection.removeAsync({ boardId: id }),
    ]);
  })

  .addMethod('clearAllNotes', z.string(), async (id) => {
    // return BoardsCollection.removeAsync({ _id: id, ownerId: Meteor.userId() });
    await NotesCollection.removeAsync({ boardId: id });
  })

  .addMethod('shareWith', z.object({ id: z.string(), userId: z.string() }), async ({ id, userId }) => {
    return BoardsCollection.updateAsync(
      { _id: id, ownerId: Meteor.userId() },
      { $addToSet: { sharedWith: userId }, $set: { updatedAt: new Date() } }
    );
  })

  .addPublication('mine', z.void(), () => {
    const userId = Meteor.userId();
    return BoardsCollection.find({ sharedWith: userId });
  })

  .addPublication('single', z.string(), (id) => {
    const userId = Meteor.userId();
    return BoardsCollection.find({ sharedWith: userId, _id: id });
  })

  .buildSubmodule();

export default BoardsModule;
