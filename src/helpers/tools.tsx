// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...args: any[]) => void, wait: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const emailPattern =
  /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;

export const phonePattern = /^[0-9]{8,10}$/;

export const ciPattern = /^(\d{1}\.\d{3}\.\d{3}-\d{1}|\d{7}-\d{1}|\d{8})$/;
