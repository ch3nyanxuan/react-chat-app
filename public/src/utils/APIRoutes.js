//在这里定义所有的api
export const host = "http://localhost:5000";
export const registerRoute= `${host}/api/auth/register`;
export const loginRoute= `${host}/api/auth/login`;
export const setAvatarRoute= `${host}/api/auth/setAvatar`;
export const allUserRoute=`${host}/api/auth/allUsers`;
export const sendMessageRoute=`${host}/api/msg/addmsg`;
export const getAllMessageRoute=`${host}/api/msg/getmsg`;