// Local storage

export const getLocalItems = (itemName) => {
  return localStorage.getItem(itemName);
};
export const setLocalItems = (itemName, data) => {
  return localStorage.setItem(itemName, data);
};
