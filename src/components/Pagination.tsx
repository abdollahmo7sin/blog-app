import { getPageNumbers } from "../utils/pagination"


type PaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const baseBtn = "px-4 py-2 rounded-xl mx-1 border transition-colors enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
const idleBtn = "bg-white text-ink border-line enabled:hover:border-primary enabled:hover:text-primary"

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {


    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center mt-10">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className={`${baseBtn} ${idleBtn}`}
            >
                السابق
            </button>

            {getPageNumbers(page, totalPages).map((item, i) =>
                item === "..." ? (
                    <span key={`dots-${i}`} className="mx-1 text-gray-500">...</span>
                ) : (
                    <button
                        key={item}
                        onClick={() => onChange(item)}
                        aria-current={page === item ? "page" : undefined}
                        className={`${baseBtn} ${page === item ? "bg-primary text-white border-primary" : idleBtn}`}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className={`${baseBtn} ${idleBtn}`}
            >
                التالي
            </button>
        </div>
    )
}
