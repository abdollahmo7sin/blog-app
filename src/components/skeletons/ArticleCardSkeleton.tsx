type ArticleCardSkeletonProps = {
    count?: number
}

export const ArticleCardSkeleton = ({ count = 5 }: ArticleCardSkeletonProps) => {
    return Array.from({ length: count }).map((_, index) => (
        <div
            key={index}
            className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col animate-pulse"
        >
            {/* Thumbnail */}
            <div className="aspect-video bg-line w-full" />

            <div className="p-5 flex flex-col gap-3 grow">
                {/* Category badge */}
                <div className="h-6 w-20 rounded-full bg-line" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-4/5 rounded-md bg-line" />
                    <div className="h-5 w-3/5 rounded-md bg-line" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3.5 w-full rounded bg-line" />
                    <div className="h-3.5 w-11/12 rounded bg-line" />
                    <div className="h-3.5 w-3/4 rounded bg-line" />
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-line" />
                        <div className="h-4 w-20 rounded bg-line" />
                    </div>
                    <div className="h-3.5 w-16 rounded bg-line" />
                </div>
            </div>
        </div>
    ))
}