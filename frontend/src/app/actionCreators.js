import { bindActionCreators } from 'redux';
import * as userDataAction from './userData';

import { store } from './store';

const {dispatch} = store;

// 각각의 생산자들을 dispatch로 감싸서 바로 호출 가능하게 만든 객체로 바꿔준다.
export const UserDataAction = bindActionCreators(userDataAction, dispatch);