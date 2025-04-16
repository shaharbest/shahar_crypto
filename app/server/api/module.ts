import { createModule } from 'meteor-rpc';
import { TodosModule } from './todos';
import './users';

export const apiModule = createModule().addSubmodule(TodosModule).build();

export type ApiModule = typeof apiModule;
