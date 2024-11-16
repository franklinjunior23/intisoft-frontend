export function PostCategory(category: Array<{ id: number; name: string }>) {
    return category.map((cat) => cat.name)
}
