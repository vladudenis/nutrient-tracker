"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import SignInDialog from "./SignInDialog";
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
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full px-64 py-4 border-b">
      <ul className="flex justify-between">
        <li className="flex gap-4 h-10 py-2">
          <Link href="/">
            <span className="font-semibold text-lg">NutriTracker</span>
          </Link>
          {status == "loading" ? (
            <span className="flex items-center gap-8 pt-2">
              <Skeleton className="h-5 w-[125px]" />
              <Skeleton className="h-5 w-[125px]" />
              <Skeleton className="h-5 w-[125px]" />
              <Skeleton className="h-5 w-[125px]" />
            </span>
          ) : session ? (
            <>
              <Separator orientation="vertical" />
              <span className="h-10 flex gap-8">
                <Link href="/history">
                  <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                    Nutrition History
                  </span>
                </Link>
                <Link href="/plan">
                  <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                    Nutrition Plan
                  </span>
                </Link>
                <Link href="/statistics">
                  <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                    Statistics
                  </span>
                </Link>
              </span>
            </>
          ) : (
            <></>
          )}
        </li>
        <li className="pr-24">
          {status == "loading" ? (
            <div className="flex items-center gap-4 pt-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-[200px]" />
            </div>
          ) : session ? (
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
                      <Button className="w-full" variant="outline">
                        <Link href="body">My Body</Link>
                      </Button>
                    </div>
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
            <SignInDialog>
              <Button variant="outline">Sign In</Button>
            </SignInDialog>
          )}
        </li>
      </ul>
    </nav>
  );
}
