<script setup lang="ts">
import Timeline from "../components/Timeline.vue";
</script>

<template>
  <suspense>
    <template #default>
      <Timeline></Timeline>
    </template>
    <template #fallback>
      <progress class="progress is-primary is-small"></progress>
    </template>
  </suspense>
</template>
