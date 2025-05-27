import { createModule } from 'meteor-rpc';
import { BoardsCollection } from '@/api/colab/boards';
import { NotesCollection } from '@/api/colab/notes';
import { Meteor } from 'meteor/meteor';
import { z } from 'zod';

function generateInviteToken() {
  return Meteor.uuid?.() ?? Random.id(); // fallback for older Meteor setups
}

const BoardsModule = createModule('boards')
  .addMethod('create', z.string().min(1), async (title) => {
    const userId = Meteor.userId();
    const now = new Date();

    return BoardsCollection.insertAsync({
      title,
      ownerId: userId,
      sharedWith: [userId],
      invites: [],
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

    const board = await BoardsCollection.findOneAsync({ _id: id });
    if (!board) throw new Meteor.Error('Board not found');
    if (board.ownerId !== userId) throw new Meteor.Error('Not authorized');

    return Promise.all([
      BoardsCollection.removeAsync({ _id: id }),
      NotesCollection.removeAsync({ boardId: id }),
    ]);
  })

  .addMethod('clearAllNotes', z.string(), async (id) => {
    await NotesCollection.removeAsync({ boardId: id });
  })

  .addMethod(
    'shareWith',
    z.object({ id: z.string(), email: z.string().email() }),
    async ({ id, email }) => {
      const ownerId = Meteor.userId();

      const board = await BoardsCollection.findOneAsync({ _id: id });
      if (!board || board.ownerId !== ownerId) {
        throw new Meteor.Error('Not authorized');
      }

      const user = await Meteor.users.findOneAsync({
        'services.google.email': email,
      });

      if (user) {
        // User exists: add by userId
        return BoardsCollection.updateAsync(
          { _id: id },
          {
            $addToSet: { sharedWith: user._id },
            $set: { updatedAt: new Date() },
          }
        );
      } else {
        // User not found: create invite token
        const token = generateInviteToken();

        await BoardsCollection.updateAsync(
          { _id: id },
          {
            $addToSet: {
              invites: {
                token,
                email,
                createdAt: new Date(),
              },
            },
            $set: { updatedAt: new Date() },
          }
        );

        return { status: 'invited', token };
      }
    }
  )

  .addMethod(
    'revokeInvite',
    z.object({ boardId: z.string(), token: z.string() }),
    async ({ boardId, token }) => {
      const userId = Meteor.userId();
      const board = await BoardsCollection.findOneAsync({ _id: boardId });

      if (!board || board.ownerId !== userId) {
        throw new Meteor.Error('Not authorized');
      }

      return BoardsCollection.updateAsync(
        { _id: boardId },
        {
          $pull: { invites: { token } },
          $set: { updatedAt: new Date() },
        }
      );
    }
  )

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
