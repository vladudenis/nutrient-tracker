import Link from 'next/link'
import SignInModal from '@/components/modals/SignInModal'

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
                    <SignInModal text="Sign In" />
                </li>
            </ul>
        </nav>
    )
}
