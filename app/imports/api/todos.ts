import { Mongo } from "meteor/mongo";

export interface Todo {
  _id?: string;
  text: string;
  isDone: boolean;
  userId: string;
}

export const TodosCollection = new Mongo.Collection<Todo>("todos");
