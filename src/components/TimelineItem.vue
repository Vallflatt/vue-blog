<script setup lang="ts">
import {TimelinePost} from "../posts.ts";

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a
     class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a>{{ post.title }}</a>
    <div>{{ post.created.setLocale('fr').toFormat("d MMM")}}</div>
  </a>
</template>
