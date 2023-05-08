import Image from 'next/image';
import Link from 'next/link';

export default function LinkLogo() {
  return (
    <Link href="/">
      <span className="sr-only">Food Recipes</span>
      <Image
        className="h-16 w-auto"
        src="/Chef_Outline.svg"
        height={50}
        width={50}
        alt="Food Recipes Logo"
      />
    </Link>
  );
}
