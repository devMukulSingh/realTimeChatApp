export const HOST = "http://localhost:8000";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/message`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ADD_USER_ROUTE = `${AUTH_ROUTE}/add-user`;
export const GET_USERS_ROUTE = `${AUTH_ROUTE}/get-users`;
export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/get-messages`;
export const GET_CALL_TOKEN = `${AUTH_ROUTE}/generate-token`