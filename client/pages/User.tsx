import { NextFunctionComponent, NextContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { E_userActionType } from '../actionTypes/userType';
import LoginForm from '../containers/LoginForm';

interface Props {
  id: string;
}

const User: NextFunctionComponent<Props> = props => {
  const myInfo = useSelector((state: any) => state.user.myInfo);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: E_userActionType.USER_LOGOUT_REQUEST
    });
  };

  return (
    <div style={{ height: '500px', margin: '2%' }}>
      {myInfo ? (
        <>
          <h1>{myInfo.userId}</h1>
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
