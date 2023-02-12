
const MODIFY_MYFOLLOWINGLIST = 'myFollowingList/MODIFY_MYFOLLOWINGLIST';
const INIT_MYFOLLOWINGLIST = 'myFollowingList/INIT_MYFOLLOWINGLIST';

// 액션 생성함수를 만든다.
export const modifyMyFollowingList = (data) => ({data:data, type:MODIFY_MYFOLLOWINGLIST});
export const initMyFollowingList = () => ({type:INIT_MYFOLLOWINGLIST});

// 초기값 제작
const initialState = []

/* 리듀서 선언 */
export default function myFollowingList(state = initialState, action) {
  
  switch (action.type) {
    case MODIFY_MYFOLLOWINGLIST:
      return  action.data;
    case INIT_MYFOLLOWINGLIST:
      return initialState;
    default:
      return state;
    }
  }