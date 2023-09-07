<script setup lang="ts">
import { TimelinePost } from "../posts.ts";
import { ref, onMounted, watch } from "vue";
import { marked } from "marked";
import highlightjs from "highlight.js/lib/common"
import {assert} from "../helper.js";

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();

//same as watch, but less explicit:
// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult;
//     console.log(parseResult, err);
//   })
// })

watch(content, (newContent) => {
  marked.parse(newContent, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    }
  },(_err, parseResult) => {
    html.value = parseResult;
  })
}, {
  immediate: true
})

onMounted(() => {
  assert(contentEditable.value, 'ContentEditable DOM node was not found')
  contentEditable.value.innerText = content.value
})

function handleInput () {
  assert(contentEditable.value, 'ContentEditable DOM node was not found')
  content.value = contentEditable.value.innerText
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>
