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
import { LogOut, Bug } from "lucide-react";

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
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[80px]" />
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
        <li className="pr-24 flex gap-4 items-center">
          {status == "loading" ? (
            <div className="flex items-center gap-4 pt-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-6 w-6" />
            </div>
          ) : session ? (
            <>
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
                      <div className="w-[200px]">
                        <div className="flex flex-col justify-center items-center gap-2 my-2">
                          <div className="flex justify-center items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={session.user?.image!} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="truncate text-xs w-32">
                              {session.user?.name}
                            </span>
                          </div>
                          <span className="truncate text-sm">
                            {session.user?.email}
                          </span>
                        </div>
                        <div className="my-2 px-4 flex flex-col gap-2">
                          <Separator orientation="horizontal" />
                          <Button
                            className="w-full border-none"
                            variant="outline"
                            onClick={() => signOut()}
                          >
                            <LogOut className="mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href="https://github.com/vladudenis/nutrient-tracker/issues/new">
                <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                  <Bug />
                </span>
              </Link>
            </>
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
