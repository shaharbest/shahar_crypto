import { useNavigate, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default () => {
  const navigate = useNavigate();
  const logout = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent the "to" navigation
    Meteor.logout(() => navigate('/login'));
  };

  return (
    <Link to="#" onClick={logout}>
      Logout
    </Link>
  );
};
