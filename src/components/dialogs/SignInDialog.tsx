'use client'

import { BsDiscord, BsGoogle, BsGithub } from 'react-icons/bs'
import { signIn } from 'next-auth/react'

export default function SignInDialog({ text }: { text: string }) {
    return (
        <>
            <button
                className="btn bg-slate-500 hover:bg-slate-400 text-white"
                onClick={() =>
                    // @ts-ignore
                    document.getElementById('sign-in_modal').showModal()
                }
            >
                {text}
            </button>
            <dialog id="sign-in_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Sign In</h3>
                    <p className="py-4">
                        Please sign in using an authentication provider below.
                    </p>
                    <div className="grid gap-4 py-4">
                        <button
                            className="flex gap-2 btn bg-slate-500 hover:bg-slate-400 text-white"
                            onClick={() => signIn('github')}
                        >
                            <BsGithub /> Sign in with GitHub
                        </button>
                        <button
                            className="flex gap-2 bg-amber-500 hover:bg-amber-400 btn text-white"
                            onClick={() => signIn('google')}
                        >
                            <BsGoogle /> Sign in with Google
                        </button>
                        <button
                            className="flex gap-2 bg-blue-600 hover:bg-blue-500 btn text-white"
                            onClick={() => signIn('discord')}
                        >
                            <BsDiscord /> Sign in with Discord
                        </button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
