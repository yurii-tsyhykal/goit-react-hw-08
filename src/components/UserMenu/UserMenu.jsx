import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';
import { userLogout } from '../../redux/auth/operation';
import Loader from '../Loader/Loader';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectAuthUser);
    return (
      <div>
        <p>Welcome, {userName.name}</p>
        <button type="button" onClick={() => dispatch(userLogout())}>
          Logout
        </button>
      </div>
    );
};

export default UserMenu;
