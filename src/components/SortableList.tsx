import { list } from 'postcss'

export default function SortableList({
    title,
    entries,
}: {
    title: string
    entries: string[][]
}) {
    // TODO: Sort entries asc or desc by numeric value column
    // TODO: History card: add columns for progress towards targets

    return (
        <div className="h-full self-center flex flex-col items-between justify-center px-4 py-3 rounded-lg">
            <span className="text-xl text-center font-semibold pb-1">
                {title}
            </span>
            <div className="overflow-auto no-scrollbar">
                <div className="flex flex-col justify-center">
                    {entries.map((row, i) => (
                        <div
                            key={i}
                            className={`flex justify-between gap-16 py-1 px-2 border-b-[1px] border-x-[1px] ${
                                i == 0 ? 'border-t-[1px]' : ''
                            }`}
                        >
                            {row.map((col, j) => (
                                <span
                                    key={j}
                                    className={`${
                                        j != 0 ? 'text-right' : ''
                                    } block ${i == 0 ? 'text-gray-400' : ''}`}
                                >
                                    {col}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
