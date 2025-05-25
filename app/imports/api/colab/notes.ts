export interface Note {
  _id?: string;
  boardId: string;
  title: string;
  content: string; // markdown
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const NotesCollection = new Mongo.Collection<Note>('notes');
