export type PageItem = number | "..."

export const getPageNumbers = (current: number, total: number): PageItem[] => {
    // 1) الأرقام المهمة: الأولى، اللي قبل الحالية، الحالية، اللي بعدها، الأخيرة
    const important = [1, current - 1, current, current + 1, total]

    // 2) نضّفها: نشيل التكرار، ونشيل الأرقام اللي بره الحدود، ونرتّب
    const pages = [...new Set(important)]
        .filter((page) => page >= 1 && page <= total)
        .sort((a, b) => a - b)

    // 3) نمشي عليها ونحط "..." مكان الفجوات
    const result: PageItem[] = []
    pages.forEach((page, i) => {
        const prev = pages[i - 1]

        if (prev !== undefined) {
            const gap = page - prev
            if (gap === 2) result.push(prev + 1)
            else if (gap > 2) result.push("...")
        }

        result.push(page)
    })

    return result
}
