import axios from 'axios';

// eslint-disable-next-line no-multi-assign
// const a = axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
// export default a;
// const a = axios.create({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
// });
// export default a;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
