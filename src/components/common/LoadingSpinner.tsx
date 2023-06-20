import { ArrowPathIcon } from "@heroicons/react/24/outline";

type ComponentProps = {
  size: "small" | "large";
};

export default function LoadingSpinner({ size }: ComponentProps) {
  // Default (small)
  let padding = 12;
  let spinnerSize = 8;

  if (size === "large") {
    padding = 16;
    spinnerSize = 12;
  }

  return (
    <div className={`flex items-center justify-center p-${padding}`}>
      <ArrowPathIcon
        className={`h-${spinnerSize} w-${spinnerSize} animate-spin`}
      />
    </div>
  );
}
