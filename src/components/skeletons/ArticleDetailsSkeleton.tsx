import { ArticleCardSkeleton } from "./ArticleCardSkeleton"

export const ArticleDetailsSkeleton = () => {
    return (
        <>
            <article className="max-w-3xl mx-auto animate-pulse">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-4 w-12 rounded bg-line" />
                    <span className="text-line text-sm">/</span>
                    <div className="h-4 w-20 rounded bg-line" />
                </div>

                {/* Category badge */}
                <div className="h-6 w-20 rounded-full bg-line mb-4" />

                {/* Title */}
                <div className="space-y-3 mb-4">
                    <div className="h-8 md:h-10 w-full rounded-lg bg-line" />
                    <div className="h-8 md:h-10 w-3/4 rounded-lg bg-line" />
                </div>

                {/* Description */}
                <div className="space-y-2 mb-6">
                    <div className="h-5 w-full rounded bg-line" />
                    <div className="h-5 w-5/6 rounded bg-line" />
                </div>

                {/* Meta + owner actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-full bg-line shrink-0" />
                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-line" />
                            <div className="h-3 w-20 rounded bg-line" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-9 w-16 rounded-xl bg-line" />
                        <div className="h-9 w-16 rounded-xl bg-line" />
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="w-full aspect-video rounded-2xl my-8 bg-line" />

                {/* Content */}
                <div className="space-y-4">
                    <div className="h-4 w-full rounded bg-line" />
                    <div className="h-4 w-full rounded bg-line" />
                    <div className="h-4 w-11/12 rounded bg-line" />
                    <div className="h-4 w-4/5 rounded bg-line" />

                    <div className="pt-4 space-y-4">
                        <div className="h-4 w-full rounded bg-line" />
                        <div className="h-4 w-full rounded bg-line" />
                        <div className="h-4 w-5/6 rounded bg-line" />
                        <div className="h-4 w-2/3 rounded bg-line" />
                    </div>
                </div>
            </article>

            {/* Related articles */}
            <section className="mt-16">
                <div className="h-8 w-36 rounded-lg bg-line mb-6 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ArticleCardSkeleton count={3} />
                </div>
            </section>
        </>
    )
}
