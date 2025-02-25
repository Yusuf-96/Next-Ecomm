"use server";

import { FormState } from "@/type/signin.type";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { signInSchema } from "@/lib/definitions";

export async function signin(state: FormState, formData: FormData) {
  try {
    const validateFields = signInSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    //if any field are invalid, return early
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: `${error.cause?.err?.message}` };
    }
  }
}
