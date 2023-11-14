const HOST = "http://localhost:8000";

const AUTH_ROUTE = `${HOST}/api/auth`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ADD_USER_ROUTE = `${AUTH_ROUTE}/add-user`;
export const GET_USERS_ROUTE = `${AUTH_ROUTE}/get-users`;