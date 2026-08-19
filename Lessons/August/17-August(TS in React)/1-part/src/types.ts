export type Category = "news" | "sport" | "guides"

export type PostId = number

export interface Post {
    id: PostId
    title: string
    description: string
    category: Category
    createdAt: string
}
