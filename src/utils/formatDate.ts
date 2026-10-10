export const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("ar-EG", { dateStyle: "long" }).format(new Date(dateString))
}
