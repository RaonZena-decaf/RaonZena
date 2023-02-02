// ovServer.js
// ov-server에 요청하는 토큰 및 세션 생성과정은 외부 모듈로 뺐다.
// SERVER_SIDE
import axios from "axios";

const OPENVIDU_SERVER_URL = 'https://localhost:4443'

// const OPENVIDU_SERVER_URL = 'https://helloworld.ssafy.io:8443'
// const OPENVIDU_SERVER_SECRET = 'wndlfdP1051'

export default async function getToken(mySessionId) {
  const sessionId = await createSession(mySessionId)
  const token = await createToken(sessionId)
  return token
}

function createSession(sessionId) {
  return new Promise(async (resolve, reject) => {
    let data = { customSessionId: sessionId }
    try {
      const response = await axios.post(
        OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
        data,
        {
          headers: {
            // Authorization:
            //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        },
      )

      // 에러 처리 (초기 요청이 제대로 안이루어지는 경우가 있다. 클라이언트 사이드를 통하)
      setTimeout(() => {
        console.log('개발자 설정을 통한 강제 리턴')
        console.log(sessionId)
        return resolve(sessionId)
      }, 1000)
      console.log(response)
      return response.data.id
    } catch (response) {
      console.log(response)
      let error = Object.assign({}, response)
      if (error?.response?.status === 409) {
        return resolve(sessionId)
      }
    }
  })
}

function createToken(sessionId) {
  return new Promise(async (resolve, reject) => {
    var data = {}
    try {
      const response = await axios.post(
        OPENVIDU_SERVER_URL +
          '/openvidu/api/sessions/' +
          sessionId +
          '/connection',
        data,
        {
          headers: {
            // Authorization:
            //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        },
      )
      return resolve(response.data.token)
    } catch (error) {
      return reject(error)
    }
  })
}
