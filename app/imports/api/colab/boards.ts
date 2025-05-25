import { Mongo } from 'meteor/mongo';

export interface Board {
  _id?: string;
  title: string;
  ownerId: string;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const BoardsCollection = new Mongo.Collection<Board>('boards');
