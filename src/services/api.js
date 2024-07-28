import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
export const fetchPosts = () => axios.get(`${BASE_URL}/posts`);