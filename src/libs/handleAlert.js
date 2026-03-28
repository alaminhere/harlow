import toast from 'react-hot-toast';

export const handleActionAlert = (success, message) => {
  toast.dismiss();
  if (success) {
    toast.success(message, {
      duration: 3000,
    });
  } else {
    toast.error(message, {
      duration: 4000,
    });
  }
};
