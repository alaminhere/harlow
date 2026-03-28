export const sendResponse = (success, message, data = undefined) => {
  return {
    success,
    message,
    ...(data !== undefined && { data: JSON.parse(JSON.stringify(data)) }),
  };
};
