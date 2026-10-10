export const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return ""
    return new Intl.DateTimeFormat("ar-EG", { dateStyle: "long" }).format(new Date(dateString))
}
