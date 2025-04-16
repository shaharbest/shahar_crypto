import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import type { User } from '@/api/users';
import { Roles } from "meteor/roles";

Accounts.onCreateUser(async (_options, meteorUser: Meteor.User) => {
  const user = meteorUser as User;
  if (!user.profile) {
    user.profile = {
      name: '',
      avatar: '',
      email: '',
    };
  }

  if (user.services?.github) {
    user.profile.name = user.services.github.name;
    user.profile.avatar = user.services.github.avatar;
    user.profile.email = user.services.github.email;

    if (!user.username) {
      user.username = user.services.github.username;
    }
  }

  const usernameAdmins = Meteor.settings.adminUsernames;
  if (usernameAdmins && user.username && usernameAdmins.includes(user.username)) {
    await Roles.addUsersToRolesAsync(user._id, ["admin"]);
  }

  return user;
});

// Publish user's own roles
Meteor.publish(null, function () {
  const userId = Meteor.userId();
  if (userId) {
    return Meteor.roleAssignment.find({ "user._id": userId });
  }
  this.ready();
});
