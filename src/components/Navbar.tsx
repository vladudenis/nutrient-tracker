'use client'

import Link from 'next/link'
import SignInDialog from './dialogs/SignInDialog'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, UserCircle, MenuIcon } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    const { data: session, status } = useSession()

    return (
        <nav className="w-full px-12 xl:px-48 2xl:px-64 py-4 border-b">
            <ul className="flex justify-between items-center">
                <li className="flex gap-4 items-center">
                    <Link className="hidden md:inline" href="/">
                        <span className="font-semibold text-lg">
                            NutrientTracker
                        </span>
                    </Link>
                    {status == 'loading' ? (
                        <>
                            <div className="hidden md:inline divider divider-horizontal" />
                            <span className="h-10 flex gap-8 items-center">
                                <div className="skeleton h-5 w-[75px]" />
                                <div className="skeleton h-5 w-[75px]" />
                                <div className="skeleton h-5 w-[75px]" />
                            </span>
                        </>
                    ) : session ? (
                        <>
                            <div className="hidden md:inline h-10 divider divider-horizontal" />
                            <span className="h-10 flex gap-8 md:flex items-center">
                                <Link href="/dashboard">
                                    <span className="font-semibold text-md p-2 rounded-lg hover:bg-gray-200 transition-colors">
                                        Dashboard
                                    </span>
                                </Link>
                                <Link href="/planner">
                                    <span className="font-semibold text-md p-2 rounded-lg hover:bg-gray-200 transition-colors">
                                        Planner
                                    </span>
                                </Link>
                                <Link href="/history">
                                    <span className="font-semibold text-md p-2 rounded-lg hover:bg-gray-200 transition-colors">
                                        History
                                    </span>
                                </Link>
                            </span>
                        </>
                    ) : (
                        <></>
                    )}
                </li>
                <li className="flex gap-4">
                    {status == 'loading' ? (
                        <div className="h-10 flex gap-4 items-center">
                            <div className="skeleton h-5 w-[125px]" />
                            <div className="skeleton h-8 w-8 rounded-full" />
                        </div>
                    ) : session ? (
                        <>
                            <span className="flex items-center">
                                {session.user?.name}
                            </span>
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
                                                height={100}
                                                width={100}
                                            />
                                        ) : (
                                            <UserCircle />
                                        )}
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-1 z-[1] p-1 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a onClick={() => signOut()}>
                                            <LogOut />
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div>
                            <SignInDialog text="Sign In" />
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    )
}
