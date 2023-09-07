import {defineStore} from "pinia";
import {Post, TimelinePost} from "../posts.ts";
import {Period} from "../constants.ts";
import {DateTime} from "luxon";

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay () {
  return new Promise<void>(res => setTimeout(res, 1500))
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => <PostsState>({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today"
  }),
  actions: {
    setSelectedPeriod (period: Period) {
      this.selectedPeriod = period
    },
    async fetchPosts () {
      const res = await window.fetch("http://localhost:8000/posts")
      const data = (await res.json()) as Post[]
      await delay();

      let ids: string[] = []
      let all = new Map<string, Post>()
      for (const post of data) {
        ids.push(post.id)
        all.set(post.id, post)
      }

      this.ids = ids;
      this.all = all;
    }
  },
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
      .reduce((acc: TimelinePost[], id) => {
        const post = state.all.get(id)

        if (!post) {
          throw Error(`This post with id of ${id} was expected but not found.`)
        }

        const timelinePost: TimelinePost = {
          ...post,
          created: DateTime.fromISO(post.created)
        };

        if ((state.selectedPeriod === 'Today' && timelinePost.created >= DateTime.now().minus({day: 1}))
        || (state.selectedPeriod === 'This Week' && timelinePost.created >= DateTime.now().minus({week: 1}))
        || (state.selectedPeriod === 'This Month' && timelinePost.created >= DateTime.now().minus({month: 1}))) {
          acc.push(timelinePost)
        }

        // if (filterPostByPeriod(timelinePost, state.selectedPeriod)) {
        //   acc.push(timelinePost)
        // }

        return acc
      }, [])
    }
  }
})

// import { reactive, readonly } from "vue";<
// self-made store with state and use functions
// interface PostsState {
//   foo: string
// }
//
// export class PostsStore {
//   #state: PostsState
//
//   constructor() {
//     this.#state = reactive<PostsState>({
//       foo: 'foo'
//     })
//   }
//
//   getState() {
//     return readonly(this.#state);
//   }
//
//   updateFoo (foo: string) {
//     this.#state.foo = foo;
//   }
// }
//
// const store = new PostsStore()
//
// export function usePosts () {
//   return store
// }

// return state.ids
//   .map(id => {
//     const post = state.all.get(id)
//
//     if (!post) {
//       throw Error(`This post with id of ${id} was expected but not found.`)
//     }
//     return {
//       ...post,
//       created: DateTime.fromISO(post.created)
//     }
//   })
//   .filter(post => {
//     if (state.selectedPeriod === 'Today') {
//       return post.created >= DateTime.now().minus({day: 1})
//     }
//     if (state.selectedPeriod === 'This Week') {
//       return post.created >= DateTime.now().minus({week: 1})
//     }
//     if (state.selectedPeriod === 'This Month') {
//       return post.created >= DateTime.now().minus({month: 1})
//     }
//
//     return post
//   })
