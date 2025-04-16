import { Meteor } from 'meteor/meteor';
import { useTracker } from '@meteor-vite/react-meteor-data';

export const useUser = (): Meteor.User | null =>
  useTracker(() => Meteor.user(), []);

export const useUserId = (): string | null =>
  useTracker(() => Meteor.userId(), []);

export const useLoggingIn = (): boolean =>
  useTracker(() => Meteor.loggingIn(), []);
