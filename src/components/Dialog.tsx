"use client";

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BsDiscord, BsGoogle, BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

export default function DialogComponent(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Please sign in using an authentication provider below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button className="flex gap-2" onClick={() => signIn("github")}>
            <BsGithub /> Sign in with GitHub
          </Button>
          <Button
            className="flex gap-2 bg-amber-500 hover:bg-amber-400"
            onClick={() => signIn("google")}
          >
            <BsGoogle /> Sign in with Google
          </Button>
          <Button
            className="flex gap-2 bg-blue-600 hover:bg-blue-500"
            onClick={() => signIn("discord")}
          >
            <BsDiscord /> Sign in with Discord
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
