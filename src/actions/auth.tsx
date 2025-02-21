"use server";

import { FormState } from "@/type/signin.type";
import { signIn } from "../../auth";

export async function signin(state: FormState, formdata: FormData) {
  await signIn("credentials", formdata);
}
