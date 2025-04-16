import { createModule } from 'meteor-rpc';
import { TodosCollection } from '@/api/todos';
import { z } from 'zod';
import { Meteor } from 'meteor/meteor';

const TodosModule = createModule('todos')
  .addMethod('deleteAll', z.void(), async () => {
    return await TodosCollection.removeAsync({ userId: Meteor.userId() });
  })
  .addMethod('createTodo', z.string(), async (text) => {
    return TodosCollection.insertAsync({
      text,
      isDone: false,
      userId: Meteor.userId(),
    });
  })
  .addMethod(
    'updateTodo',
    z.object({ id: z.string(), isDone: z.boolean() }),
    async ({ id, isDone }) => {
      return TodosCollection.updateAsync({ _id: id }, { $set: { isDone } });
    },
  )
  .addMethod(
    'updateText',
    z.object({ id: z.string(), text: z.string() }),
    async ({ id, text }) => {
      return TodosCollection.updateAsync({ _id: id }, { $set: { text } });
    },
  )
  .addMethod('deleteSingle', z.string(), async (id) => {
    return TodosCollection.removeAsync({ _id: id });
  })
  .addPublication('todos', z.string(), () => {
    return TodosCollection.find({ userId: Meteor.userId() });
  })
  .buildSubmodule();

export default TodosModule;
