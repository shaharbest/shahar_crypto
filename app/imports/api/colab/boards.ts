import { Mongo } from 'meteor/mongo';

export interface Invite {
  token: string;
  email: string;
  createdAt: Date;
}

export interface Board {
  _id?: string;
  title: string;
  ownerId: string;
  sharedWith: string[];
  invites?: Invite[];
  createdAt: Date;
  updatedAt: Date;
}

export const BoardsCollection = new Mongo.Collection<Board>('boards');
