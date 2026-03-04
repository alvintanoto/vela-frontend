import { defineStore } from "pinia";

export interface Post {
  target: string;
  title: string;
  value: string;
}

export const usePostStore = defineStore("post", {
  state: () => ({
    post: [] as Post[],
  }),
  actions: {
    addPost(post: Post) {
      this.post.push({
        target: post.target,
        title: post.title,
        value: post.value,
      });
    },
  },
});
