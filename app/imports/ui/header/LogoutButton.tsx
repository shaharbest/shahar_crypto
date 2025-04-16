import { Meteor } from 'meteor/meteor';
import { useNavigate, Link } from 'react-router';

export default () => {
  const navigate = useNavigate();
  const logout = () => Meteor.logout(() => navigate('/login'));

  return <Link onClick={logout}>Logout</Link>;
};
