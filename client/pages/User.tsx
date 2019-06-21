import { NextFunctionComponent, NextContext } from 'next';
import { useCallback } from 'react';

import { useInput } from '../hook_utils/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { E_userAction } from '../actionTypes/userType';

interface IuserData {
  userid: string;
  password: string;
}

interface Props {
  id: string;
}

const User: NextFunctionComponent<Props> = props => {
  const userid = useInput('');
  const password = useInput('');

  const { isLogin } = useSelector((state: any) => state.user);
  const myData = useSelector((state: any) => state.user.myInfo);

  const dispatch = useDispatch();

  const data: IuserData = {
    userid: userid.value,
    password: password.value
  };

  const onSignup = useCallback((): void => {
    if (!userid.value.trim() || !password.value.trim()) {
      console.log('input your id');
      return;
    }
    dispatch({
      type: E_userAction.USER_SIGNUP_REQUEST,
      data
    });
  }, [userid.value, password.value]);

  const onLogin = useCallback(() => {
    if (!userid.value.trim() || !password.value.trim()) {
      console.log('input your id');
      return;
    }
    dispatch({
      type: E_userAction.USER_LOGIN_REQUEST,
      data
    });
  }, [userid.value, password.value]);

  const checkLlogin = useCallback(() => {
    dispatch({
      type: E_userAction.LOAD_USER_INFO_REQUEST
    });
  }, []);

  return (
    <div style={{ height: '300px' }}>
      {isLogin ? (
        <h1>{myData}</h1>
      ) : (
        <div>
          <h1>Loading</h1>
          <label>
            userid: <input type='text' {...userid} />
          </label>
          <label>
            password: <input type='text' {...password} />
          </label>
          <label>
            <button onClick={onSignup}>signup</button>
          </label>
          <label>
            <button onClick={onLogin}>login</button>
          </label>
        </div>
      )}
      <button onClick={checkLlogin}>checkLlogin</button>
    </div>
  );
};

User.getInitialProps = async (context: NextContext) => {
  // context.store.dispatch({
  //   type: E_userAction.LOAD_USER_INFO_REQUEST
  // });

  const id = context.query.id as string;

  const test = { id };

  return test;
};

export default User;
