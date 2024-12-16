import axios from 'axios';

const createNotification = async (data: { userId: string; notificationMessage: string; notificationTypeId: string; }) => axios.post('/api/notification', data).then((res) => res.data);
const getNotificationsList = async () => axios.get('/notification').then(async (res) => res.data);

const readAllNotifications = async () => axios.patch('/notification/read').then(async (res) => res.data);
const deleteNotification = async (id: string) => {
  const response = await axios.delete(`/notification/${id}`).then((res) => res.data);
  return response;
};

const notificationService = {
  getNotificationsList,
  readAllNotifications,
  deleteNotification,
  createNotification,
};
export default notificationService;
