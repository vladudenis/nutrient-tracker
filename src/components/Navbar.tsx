'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import SignInDialog from './dialogs/SignInDialog'
import { Separator } from './ui/separator'
import { Avatar, AvatarImage } from './ui/avatar'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from './ui/navigation-menu'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from './ui/skeleton'
import { LogOut, Bug, UserCircle, MenuIcon } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import {
    calculateDailyTargetProgress,
    calculateTotalNutrients,
    round,
} from '@/lib/utilFuncs'
import React from 'react'

export default function Navbar() {
    const { data: session, status } = useSession()
    const todaysNutrition = useQuery(api.nutrientInfo.fetchTodaysNutrition, {
        user: session?.user?.email || '',
    })
    const healthParameters = useQuery(
        api.healthParameters.fetchHealthParameters,
        { user: session?.user?.email || '' }
    )

    const totalNutrientIntake = calculateTotalNutrients(todaysNutrition)
    const todaysCaloricIntake =
        totalNutrientIntake && totalNutrientIntake.calories
    const todaysFatIntake =
        totalNutrientIntake && totalNutrientIntake.totalNutrients.FAT?.quantity
    const todaysProteinIntake =
        totalNutrientIntake &&
        totalNutrientIntake.totalNutrients.PROCNT?.quantity
    const todaysCarbsIntake =
        totalNutrientIntake &&
        totalNutrientIntake.totalNutrients.CHOCDF?.quantity

    const fatIntake =
        healthParameters &&
        (healthParameters.fatIntake / 900) * healthParameters.caloricIntake
    const proteinIntake =
        healthParameters &&
        (healthParameters.proteinIntake / 400) * healthParameters.caloricIntake
    const carbsIntake =
        healthParameters &&
        (healthParameters.carbsIntake / 400) * healthParameters.caloricIntake

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
                            <Skeleton className="h-5 w-[125px]" />
                            <Skeleton className="h-5 w-[100px]" />
                            <Skeleton className="h-5 w-[80px]" />
                        </span>
                    ) : session ? (
                        <>
                            <Separator
                                className="hidden md:inline"
                                orientation="vertical"
                            />
                            <span className="h-10 flex gap-8 hidden md:flex">
                                <Link href="/history">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        History
                                    </span>
                                </Link>
                                <Link href="/plan">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        Plan
                                    </span>
                                </Link>
                                <Link href="/statistics">
                                    <span className="font-semibold text-sm hover:text-gray-500 transition-colors">
                                        Statistics
                                    </span>
                                </Link>
                            </span>

                            <NavigationMenu className="md:hidden">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="flex gap-4">
                                            <MenuIcon />
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-6 w-48 lg:grid-cols-[.75fr_1fr]">
                                                <li>
                                                    <Link href="/">
                                                        <span className="font-semibold">
                                                            Home
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/history/History">
                                                        <p className="font-semibold">
                                                            History
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/plan">
                                                        <p className="font-semibold">
                                                            Plan
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/statistics">
                                                        <p className="font-semibold">
                                                            Statistics
                                                        </p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </>
                    ) : (
                        <></>
                    )}
                </li>
                <li className="flex gap-4 items-center">
                    {status == 'loading' ? (
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
                                            {session.user?.image ? (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={
                                                            session.user?.image
                                                        }
                                                    />
                                                </Avatar>
                                            ) : (
                                                <UserCircle className="h-8 w-8" />
                                            )}
                                            <span className="py-2 hidden lg:inline">
                                                {session.user?.name}
                                            </span>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="sm:w-[200px]">
                                                <div className="flex flex-col justify-center items-center gap-2 my-2">
                                                    <div className="flex justify-center items-center gap-2">
                                                        {session.user?.image ? (
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage
                                                                    src={
                                                                        session
                                                                            .user
                                                                            ?.image
                                                                    }
                                                                />
                                                            </Avatar>
                                                        ) : (
                                                            <UserCircle className="h-10 w-10" />
                                                        )}
                                                        <span className="truncate text-xs w-32">
                                                            {session.user?.name}
                                                        </span>
                                                    </div>
                                                    <span className="truncate text-sm">
                                                        {session.user?.email}
                                                    </span>
                                                </div>
                                                <div className="my-2 px-4 flex flex-col gap-2">
                                                    {todaysNutrition &&
                                                        healthParameters && (
                                                            <>
                                                                <Separator orientation="horizontal" />
                                                                <p className="text-sm font-semibold self-center">
                                                                    Today&#39;s
                                                                    Nutrition
                                                                </p>
                                                                <div className="flex flex-col gap-1">
                                                                    <span
                                                                        className={`flex justify-between text-sm`}
                                                                    >
                                                                        <p>
                                                                            Calories
                                                                        </p>
                                                                        <p
                                                                            className={calculateDailyTargetProgress(
                                                                                todaysCaloricIntake,
                                                                                healthParameters.caloricIntake
                                                                            )}
                                                                        >
                                                                            {round(
                                                                                todaysCaloricIntake
                                                                            )}
                                                                            /
                                                                            {round(
                                                                                healthParameters.caloricIntake
                                                                            )}
                                                                            kcal
                                                                        </p>
                                                                    </span>
                                                                    <span
                                                                        className={`flex justify-between text-sm`}
                                                                    >
                                                                        <p>
                                                                            Fat
                                                                        </p>
                                                                        <p
                                                                            className={calculateDailyTargetProgress(
                                                                                todaysFatIntake,
                                                                                fatIntake
                                                                            )}
                                                                        >
                                                                            {round(
                                                                                todaysFatIntake
                                                                            )}
                                                                            /
                                                                            {round(
                                                                                fatIntake
                                                                            )}
                                                                            g
                                                                        </p>
                                                                    </span>
                                                                    <span
                                                                        className={`flex justify-between text-sm`}
                                                                    >
                                                                        <p>
                                                                            Protein
                                                                        </p>
                                                                        <p
                                                                            className={calculateDailyTargetProgress(
                                                                                todaysProteinIntake,
                                                                                proteinIntake
                                                                            )}
                                                                        >
                                                                            {round(
                                                                                todaysProteinIntake
                                                                            )}
                                                                            /
                                                                            {round(
                                                                                proteinIntake
                                                                            )}
                                                                            g
                                                                        </p>
                                                                    </span>
                                                                    <span
                                                                        className={`flex justify-between text-sm`}
                                                                    >
                                                                        <p>
                                                                            Carbs
                                                                        </p>
                                                                        <p
                                                                            className={calculateDailyTargetProgress(
                                                                                todaysCarbsIntake,
                                                                                carbsIntake
                                                                            )}
                                                                        >
                                                                            {round(
                                                                                todaysCarbsIntake
                                                                            )}
                                                                            /
                                                                            {round(
                                                                                carbsIntake
                                                                            )}
                                                                            g
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    <Separator orientation="horizontal" />
                                                    <Button
                                                        className="w-full border-none"
                                                        variant="outline"
                                                        onClick={() =>
                                                            signOut()
                                                        }
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
    )
}
