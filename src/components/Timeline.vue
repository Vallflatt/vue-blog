<script setup lang="ts">
import { ref } from "vue";
  const periods = ['Today', 'This Week', 'This Month'] as const;

  type Period = typeof periods[number];

  const selectedPeriod = ref<Period>('Today');

  function selectPeriod (period: Period): void {
    selectedPeriod.value = period;
  }
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods"
         :key="period"
         @click="selectPeriod(period)"
         :class="{'is-active': selectedPeriod === period}"
      >
        {{period}}
      </a>
    </span>
  </nav>
</template>
