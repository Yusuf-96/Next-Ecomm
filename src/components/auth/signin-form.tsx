"use client";

import { signin } from "@/actions/auth.action";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, action, pending] = useActionState(signin, undefined);
  return (
    <form action={action}>
      {state?.message && (
        <div className="mb-4 text-red-500 text-sm">{state.message}</div>
      )}
      <div className=" mb-4">
        <Input
          variant="underlined"
          type="string"
          label="Username"
          isClearable
          name="username"
        />
      </div>
      {state?.errors?.username && (
        <p className="text-red-600 font-semibold text-sm bg-red-100 border-l-4 border-red-400 rounded p-2">
          {state.errors?.username}
        </p>
      )}

      <div className="mb-6">
        <Input
          variant="underlined"
          type="password"
          label="Password"
          isClearable
          name="password"
        />
      </div>
      {state?.errors?.password && (
        <div className="text-red-600 font-semibold text-sm bg-red-100 border-l-4 border-red-400 rounded p-2 mb-5">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        variant="flat"
        disabled={pending}
        size="md"
        className="w-full text-center text-sm font-semibold text-orange-50 bg-red-500 mb-4"
        type="submit"
        isLoading={pending}
      >
        Sign In
      </Button>
    </form>
  );
}
