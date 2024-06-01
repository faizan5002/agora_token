// controllers.js
const { RtcTokenBuilder, RtcRole } = require('agora-token');
require('dotenv').config();

const generateRTCToken = (req, resp) => {
  console.log('Request received:', req.params);

  resp.header('Access-Control-Allow-Origin', '*');

  const channelName = req.params.channel;
  if (!channelName) {
    return resp.status(500).json({ 'error': 'channel is required' });
  }

  let uid = req.params.uid;
  if (!uid || uid === '') {
    return resp.status(500).json({ 'error': 'uid is required' });
  }

  let role;
  if (req.params.role === 'publisher') {
    role = RtcRole.PUBLISHER;
  } else if (req.params.role === 'audience') {
    role = RtcRole.SUBSCRIBER;
  } else {
    return resp.status(500).json({ 'error': 'role is incorrect' });
  }

  let expireTime = req.query.expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  let token;
  if (req.params.tokentype === 'userAccount') {
    token = RtcTokenBuilder.buildTokenWithAccount(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else if (req.params.tokentype === 'uid') {
    token = RtcTokenBuilder.buildTokenWithUid(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else {
    return resp.status(500).json({ 'error': 'token type is invalid' });
  }

  return resp.json({ 'rtcToken': token });
};

module.exports = {
  generateRTCToken,
};
