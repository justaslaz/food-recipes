import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="mx-auto flex max-w-xl items-center justify-center p-16">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
