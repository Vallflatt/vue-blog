<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import {TimelinePost} from "../posts.ts";
import {DateTime} from "luxon";

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title"
}
</script>

<template>
  New post page
  <PostWriter :post="post"></PostWriter>
</template>
