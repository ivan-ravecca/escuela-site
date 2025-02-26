const VITE_API_URL = import.meta.env.VITE_API_URL;

export const sendContact = async (
  fromName: string,
  fromEmail: string,
  fromMessage: string,
) => {
  return await fetch(VITE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: fromName,
      email: fromEmail,
      message: fromMessage,
    }),
  });
};
