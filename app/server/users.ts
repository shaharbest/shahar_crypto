import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

export const registerGoogleUsersService = () => {
  const google = Meteor.settings?.private?.google;

  if (google?.clientId && google?.secret) {
    ServiceConfiguration.configurations.upsertAsync(
      { service: 'google' },
      {
        $set: {
          clientId: google.clientId,
          secret: google.secret,
          loginStyle: 'popup', // or 'redirect'
        },
      }
    );
  } else {
    console.warn('⚠️ Missing Google OAuth credentials in Meteor.settings');
  }
};
