/**
 * These modules are automatically imported by jorgenvatle:vite.
 * You can commit these to your project or move them elsewhere if you'd like,
 * but they must be imported somewhere in your Meteor mainModule.
 *
 * More info: https://github.com/JorgenVatle/meteor-vite#lazy-loaded-meteor-packages
 **/
import '../_vite-bundle/server/_entry.mjs';

import { Meteor } from 'meteor/meteor';
import './api/module';
import { registerGoogleUsersService } from './users';

Meteor.startup(async () => {
  registerGoogleUsersService();
  console.log('Server has started!');
});

