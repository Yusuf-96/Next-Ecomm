import SignInForm from "@/components/auth/signin-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div>
      <div>
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
