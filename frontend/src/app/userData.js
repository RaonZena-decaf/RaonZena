
const MODIFY_USERDATA = 'userData/MODIFY_USERDATA';
const INIT_USERDATA = 'userData/INIT_USERDATA';

// 액션 생성함수를 만든다.
export const modifyUserData = (data) => ({data:data, type:MODIFY_USERDATA});
export const initUserData = () => ({type:INIT_USERDATA});

// 초기값 제작
const initialState = {
    user_no:"1",
    user_id:"eijf",
    user_name:"김찬빈",
    exp:23,
    level: 10,
    create_dtm:"2222-22-22",
    user_image_url: "data:image/jpeg;base64,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",
}

/* 리듀서 선언 */
export default function userData(state = initialState, action) {
  
  switch (action.type) {
    case MODIFY_USERDATA:
      return {...action.data};
    case INIT_USERDATA:
      return initialState;
    default:
      return state;
    }
  }