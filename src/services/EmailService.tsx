const VITE_API_URL = import.meta.env.VITE_API_URL;
import { InquireParams } from "../data/interfaces";

export const sendContact = async (
  fromName: string,
  fromEmail: string,
  fromMessage: string,
) => {
  return await fetch(`${VITE_API_URL}/send`, {
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

export const sendInquire = async ({
  name,
  email,
  phone,
  course,
  ci,
  year,
  inquire,
}: InquireParams) => {
  return await fetch(`${VITE_API_URL}/inquire`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      course,
      ci,
      year,
      inquire,
    }),
  });
};
