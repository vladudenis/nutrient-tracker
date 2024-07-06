'use client' // Server Side Solution: https://next-auth.js.org/tutorials/creating-a-database-adapter

// import { getServerSession } from 'next-auth'

import {
    Notebook,
    PieChart,
    History,
    Target,
    UserCircle,
    Star,
    Apple,
    TextCursorInput,
    Menu,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function SideNavbar() {
    const { data: session } = useSession()
    const pathname = usePathname()

    return (
        <>
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <Menu />
            </button>

            <aside
                id="logo-sidebar"
                className="h-screen fixed top-0 left-0 z-40 w-60 transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <Link
                        href="/"
                        className="flex items-center gap-2 ps-2.5 mb-5"
                    >
                        <Apple />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            NutrientTracker
                        </span>
                    </Link>

                    <div className="h-full font-medium flex flex-col justify-between">
                        <ul className="space-y-2">
                            <li>
                                <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Target />
                                    <span className="ms-3">Set Targets</span>
                                </button>
                            </li>

                            <span className="flex items-center ps-2.5">
                                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 w-[90%]" />
                            </span>

                            <li
                                className={
                                    pathname == '/tracker' ? 'bg-gray-100' : ''
                                }
                            >
                                <Link
                                    href="/tracker"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <TextCursorInput />
                                    <span className="ms-3">
                                        Track Nutrient Intake
                                    </span>
                                </Link>
                            </li>

                            <span className="flex items-center ps-2.5">
                                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 w-[90%]" />
                            </span>

                            <li
                                className={
                                    pathname == '/dashboard'
                                        ? 'bg-gray-100'
                                        : ''
                                }
                            >
                                <Link
                                    href="/dashboard"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <PieChart />
                                    <span className="ms-3">Dashboard</span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathname == '/planner' ? 'bg-gray-100' : ''
                                }
                            >
                                <Link
                                    href="/planner"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <Notebook />
                                    <span className="ms-3">Planner</span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathname == '/history' ? 'bg-gray-100' : ''
                                }
                            >
                                <Link
                                    href="/history"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <History />
                                    <span className="ms-3">History</span>
                                </Link>
                            </li>

                            <span className="flex items-center ps-2.5">
                                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 w-[90%]" />
                            </span>

                            <li
                                className={
                                    pathname == '/favorites'
                                        ? 'bg-gray-100'
                                        : ''
                                }
                            >
                                <Link
                                    href="/favorites"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <Star />
                                    <span className="ms-3">Favorite Meals</span>
                                </Link>
                            </li>
                        </ul>

                        <ul className="space-y-2">
                            <span className="flex items-center ps-2.5">
                                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 w-[90%]" />
                            </span>

                            <li className="dropdown dropdown-top">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="h-10 w-10">
                                        {session && session.user?.image ? (
                                            <Image
                                                alt="User Image"
                                                src={session.user.image}
                                                height={128}
                                                width={128}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <UserCircle />
                                        )}
                                    </span>
                                    <span className="ms-3">
                                        {session && session.user?.name}
                                    </span>

                                    <div
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        <ul>
                                            <li onClick={() => signOut()}>
                                                Sign Out
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}
