import { NextFunctionComponent, NextContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { useInput } from '../hook_utils/useInput';
import { E_userAction } from '../actionTypes/userType';
import LoginForm from '../components/LoginForm';

interface Props {
  id: string;
}

const User: NextFunctionComponent<Props> = props => {
  const { myInfo } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: E_userAction.USER_LOGOUT_REQUEST
    });
  };

  return (
    <div style={{ height: '500px' }}>
      {myInfo ? (
        <>
          <h1>{myInfo}</h1>
          <label>
            <button onClick={onLogout}>logout</button>
          </label>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

User.getInitialProps = async (context: NextContext) => {
  const id = context.query.id as string;

  const test = { id };

  return test;
};

export default User;
