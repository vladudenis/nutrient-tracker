"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import DialogComponent from "./Dialog";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-64 py-4 border-b">
      <ul className="flex justify-between">
        <li className="flex gap-4 h-10 py-2">
          <Link href="/">
            <span className="font-semibold text-lg">NutriTracker</span>
          </Link>
          {session ? (
            <>
              <Separator orientation="vertical" />
              <span className="h-10 flex gap-8">
                <Link href="/dashboard">
                  <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                    Dashboard
                  </span>
                </Link>
                <Link href="/history">
                  <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                    Nutrition History
                  </span>
                </Link>
              </span>
            </>
          ) : (
            <></>
          )}
        </li>
        <li className="pr-24">
          {session ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image!} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="py-2">{session.user?.name}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-32 h-10">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <DialogComponent>
              <Button variant="outline">Sign In</Button>
            </DialogComponent>
          )}
        </li>
      </ul>
    </nav>
  );
}
