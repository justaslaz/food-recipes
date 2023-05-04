import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/Chef_Outline.svg';

export default function LinkLogo() {
  return (
    <Link href="/">
      <span className="sr-only">Food Recipes</span>
      <Image className="h-16 w-auto" src={logo} alt="Food Recipes Logo" />
    </Link>
  );
}
