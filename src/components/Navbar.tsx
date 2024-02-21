'use client'

import Link from 'next/link'
import SignInDialog from './dialogs/SignInDialog'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, Bug, UserCircle, MenuIcon } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    const { data: session, status } = useSession()

    return (
        <nav className="w-full px-12 xl:px-48 2xl:px-64 py-4 border-b">
            <ul className="flex justify-between">
                <li className="flex gap-4 h-10 py-2">
                    <Link className="hidden md:inline" href="/">
                        <span className="font-semibold text-lg">
                            NutriTracker
                        </span>
                    </Link>
                    {status == 'loading' ? (
                        <span className="flex items-center gap-8 pt-2">
                            <div className="skeleton h-5 w-[150px]" />
                            <div className="skeleton h-5 w-[100px]" />
                            <div className="skeleton h-5 w-[50px]" />
                            <div className="skeleton h-5 w-[75px]" />
                        </span>
                    ) : session ? (
                        <>
                            <div className="hidden md:inline divider divider-horizontal" />
                            <span className="h-10 flex gap-8 hidden md:flex">
                                <Link href="/params">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        Physical Parameters
                                    </span>
                                </Link>
                                <Link href="/history">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        Nutrition History
                                    </span>
                                </Link>
                                <Link href="/plan">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        Planner
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
                <li className="flex gap-4 items-center">
                    {status == 'loading' ? (
                        <div className="flex items-center gap-4 pt-1">
                            <div className="skeleton h-8 w-8 rounded-full" />
                            <div className="skeleton h-5 w-[125px]" />
                            <div className="skeleton h-6 w-6" />
                        </div>
                    ) : session ? (
                        <>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="h-8 w-8 rounded-full">
                                        {session.user?.image ? (
                                            <Image
                                                alt="User Image"
                                                src={session.user.image}
                                                height={10}
                                                width={10}
                                            />
                                        ) : (
                                            <UserCircle />
                                        )}
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Settings</a>
                                    </li>
                                    <li>
                                        <a onClick={() => signOut()}>
                                            <LogOut className="mr-2" />
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <Link href="https://github.com/vladudenis/nutrient-tracker/issues/new">
                                <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                    <Bug />
                                </span>
                            </Link>
                        </>
                    ) : (
                        <SignInDialog text="Sign In" />
                    )}
                </li>
            </ul>
        </nav>
    )
}
