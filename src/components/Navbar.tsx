import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="w-full px-48 py-4 border-b">
      <ul className="flex justify-between">
        <li className="h-10 px-4 py-2">
          <span>LOGO</span>
        </li>
        <li className="flex gap-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-lg">
              Dashboard
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="ghost" className="text-lg">
              History
            </Button>
          </Link>
        </li>
        <li>
          <Button variant="outline">Sign In</Button>
        </li>
      </ul>
    </nav>
  );
}
