import { createModule } from 'meteor-rpc';
import TodosModule from './todos';

export const apiModule = createModule().addSubmodule(TodosModule).build();
export type ApiModule = typeof apiModule;
