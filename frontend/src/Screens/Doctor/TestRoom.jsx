import * as React from 'react';
// import './style.css';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// get token
function generateToken(tokenServerUrl, userID) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

generateToken()


export default function App() {
  const roomID =  randomID(5);
  const userID = "12345"
  
  const userName = randomID(5);
  let myMeeting = async (element) => {
    // generate token
    const token = "04AAAAAGVu2ikAEHRjNWx6anlpZnhiaGJiZzIAoCHw3Dtklf03YDJETNn0Uk4qsGbgpdqcyTx97QAI9ULWlBBTgXyEcEDSkVBMRbfVmDFXflSmio4EkCJwupt4nL5060Giite7tNMBDZ+Sad5Vb9958NtC8JEzYt51sOwg3kQmfFDHHfK6QbFTcFH8Jhe2myZXr+XFk9Fpon7Q5xL6RjIF48vahiY0BDQxmY2U9Gz5yqTlAoE1mFVCrIjA1RY="
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      1884366205,
      token,
      roomID,
      userID,
      userName
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.origin +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
