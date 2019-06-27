const SERVER_URL = "http://localhost/stickynotes";

//login endpoints
const LOGIN_ENDPOINT = `${SERVER_URL}/api/login.php`;
const REGISTER_ENDPOINT = `${SERVER_URL}/api/register.php`;
const RECOVER_ENDPOINT = `${SERVER_URL}/api/recover.php`;
const FILTER_NOTES_ENDPOINT = `${SERVER_URL}/api/filternotes.php`;
const UPDATE_NOTE_ENDPOINT = `${SERVER_URL}/api/updatenote.php`;
const DELETE_NOTE_ENDPOINT = `${SERVER_URL}/api/deletenote.php`;

//notes endpoints
const GETNOTES_ENDPOINT = `${SERVER_URL}/api/getnotes.php`;
export {
  SERVER_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  RECOVER_ENDPOINT,
  GETNOTES_ENDPOINT,
  FILTER_NOTES_ENDPOINT,
  UPDATE_NOTE_ENDPOINT,
  DELETE_NOTE_ENDPOINT
};
