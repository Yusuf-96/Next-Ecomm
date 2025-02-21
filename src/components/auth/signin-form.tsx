import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function SignInForm() {
  return (
    <form>
      <div className=" mb-4">
        <Input
          variant="underlined"
          type="string"
          label="Username"
          isClearable
          name="username"
        />
      </div>

      <div className="mb-6">
        <Input
          variant="underlined"
          type="password"
          label="Password"
          isClearable
          name="password"
        />
      </div>

      <Button
        variant="flat"
        size="md"
        className="w-full text-center text-sm font-semibold text-orange-50 bg-red-500"
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
}
