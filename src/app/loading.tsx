import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="flex justify-center items-center gap-24 h-[90vh]">
            <Loader2 className="animate-spin h-12 w-12" />
        </div>
    )
}
