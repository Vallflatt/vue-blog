import { DateTime} from "luxon";

export interface Post {
    id: string
    title: string
    created: string
}

export const today: Post = {
    id: "1",
    title: "Today",
    created: DateTime.now().toISO()
}