import { createModule } from 'meteor-rpc';
import TodosModule from './todos';
import BoardsModule from './colab/boards';
import NotesModule from './colab/notes';

export const apiModule =
  createModule()
    .addSubmodule(BoardsModule)
    .addSubmodule(NotesModule)
    .addSubmodule(TodosModule)
    .build();
export type ApiModule = typeof apiModule;
