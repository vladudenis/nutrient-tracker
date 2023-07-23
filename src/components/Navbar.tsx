import Link from "next/link";
import { Button } from "./ui/button";
import DialogComponent from "./Dialog";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <nav className="w-full px-64 py-4 border-b">
      <ul className="flex justify-between">
        <li className="flex gap-4 h-10 py-2">
          <Link href="/">
            <span className="font-semibold text-lg">NutriTracker</span>
          </Link>
          <Separator orientation="vertical" />
          <span className="h-10 flex gap-8">
            <Link href="/dashboard">
              <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                Dashboard
              </span>
            </Link>
            <Link href="/history">
              <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                History
              </span>
            </Link>
          </span>
        </li>
        <li className="pr-24">
          <DialogComponent>
            <Button variant="outline">Sign In</Button>
          </DialogComponent>
        </li>
      </ul>
    </nav>
  );
}
