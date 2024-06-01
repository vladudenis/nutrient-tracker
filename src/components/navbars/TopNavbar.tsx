import Link from 'next/link'
import SignInDialog from '../dialogs/SignInDialog'

export default function TopNavbar() {
    return (
        <nav className="w-full py-3 border-b">
            <ul className="flex justify-around items-center">
                <li>
                    <Link href="/">
                        <span className="text-2xl font-semibold whitespace-nowrap">
                            NutrientTracker
                        </span>
                    </Link>
                </li>
                <li>
                    <SignInDialog text="Sign In" />
                </li>
            </ul>
        </nav>
    )
}
