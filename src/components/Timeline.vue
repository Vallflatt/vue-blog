<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import {usePosts} from "../stores/posts.ts";
import {periods} from "../constants.ts";

const postsStore = usePosts();

await postsStore.fetchPosts();
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods"
         :key="period"
         @click="postsStore.setSelectedPeriod(period)"
         :class="{'is-active': postsStore.selectedPeriod === period}"
      >
        {{period}}
      </a>
    </span>
    <TimelineItem v-for="post of postsStore.filteredPosts"
                  :key="post.id"
                  :post="post">
    </TimelineItem>
  </nav>
</template>
