import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router';
import { Button } from 'antd';

export default () => {
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email', 'profile'],
    }, (err) => {
      if (err) console.error(err);
      else navigate('/');
    });
  };

  return (
    <Button
      onClick={loginWithGoogle}
      variant='dashed'
    >
      Sign in With Google
    </Button>
  );
};
