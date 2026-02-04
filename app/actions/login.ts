"use server";

import { redirect } from "next/navigation";
import { Result } from "../types";

const USER_NAME = process.env.ADMIN_USER_NAME;
const PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.LOGIN_SECRET; // define this in .env

export async function loginUser(data: FormData): Promise<Result<undefined>> {
  const userName = data.get("userName") as string | null;
  const password = data.get("password") as string | null;


  if (!userName || !password) {
    return { success: false, error: "Falten camps obligatoris" };
  }

  if (userName !== USER_NAME || password !== PASSWORD) {
    return { success: false, error: "Credencials incorrectes" };
  }

  if (!SECRET_KEY) {
    return { success: false, error: "Server misconfigured: missing secret key" };
  }

  // Redirect with query param
  redirect(`/play?key=${encodeURIComponent(SECRET_KEY)}`);
}
