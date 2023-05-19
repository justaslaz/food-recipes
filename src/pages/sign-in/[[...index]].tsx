import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="mx-auto flex max-w-xl items-center justify-center p-16">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
