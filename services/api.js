import request from "./asyncRequest.js"

export const wxLogin = (data, callback, hideLoading) => request('/api/wxLogin', data, 'POST');

export const updateUser = (data, callback, hideLoading) => request('/api/updateUser', data, 'POST');

export const addFriend = (data, callback, hideLoading) => request('/api/wxAddFriends', data, 'POST');

export const friendsList = (data, callback, hideLoading) => request('/api/getUserFriends', data, 'POST');

export const handleFriendApply = (data, callback, hideLoading) => request('/api/handleFriendApply', data, 'GET');

export const createConversation = (data, callback, hideLoading) => request('/massage/createConversation', data, 'POST');

export const sendMessage = (data, callback, hideLoading) => request('/massage/sendMessage', data, 'POST');

export const GetMessagesForConversation = (data, callback, hideLoading) => request(
	'/massage/getMessagesForConversation', data,
	'POST');

export const getConversationsWithUnreadCount = (data, callback, hideLoading) => request(
	'/massage/getConversationsWithUnreadCount', data,
	'POST');