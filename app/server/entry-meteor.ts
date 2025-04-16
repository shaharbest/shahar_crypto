/**
 * These modules are automatically imported by jorgenvatle:vite.
 * You can commit these to your project or move them elsewhere if you'd like,
 * but they must be imported somewhere in your Meteor mainModule.
 *
 * More info: https://github.com/JorgenVatle/meteor-vite#lazy-loaded-meteor-packages
 **/
import '../_vite-bundle/server/_entry.mjs';

import { Meteor } from 'meteor/meteor';
import { Roles } from "meteor/roles";
import './api/module';

Meteor.startup(async () => {
  console.log('Server has started!');
  await createRoles();
});

const createRoles = async () => {
  const roles = await Roles.getAllRoles().fetchAsync();
  if (!roles.length) {
    await Roles.createRoleAsync("admin");
  }
};

