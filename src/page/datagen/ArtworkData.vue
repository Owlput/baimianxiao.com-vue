<script>
import { copyToClipboard, randomHex } from "../../oneliners";
import { computed, ref } from "@vue/reactivity";

let sourceOther = ref([["", ""]]);
let maxSourceOtherLength = computed(() => {
  return sourceOther.value.length;
});
let tags = ref([""]);
let maxTagsLength = computed(() => {
  return tags.value.length;
});

export default {
  name: "ArtworkData",
  data() {
    return {
      id: "",
      title: "",
      authorId: "",
      permitId: "",
      license: "",
      timeOrigin: "",
      timeThis: "",
      views: 0,
      active: false,
    };
  },
  setup() {
    return {
      sourceOther,
      maxSourceOtherLength,
      tags,
      maxTagsLength,
    };
  },
  methods: {
    newSourceOther() {
      sourceOther.value.push(["", ""]);
    },
    delSourceOther(index) {
      if (index == 0 && maxSourceOtherLength.value == 1) return;
      sourceOther.value.splice(index, 1);
    },
    newTag() {
      tags.value.push("");
    },
    delTag(index) {
      if (index == 0 && maxTagsLength.value == 1) return;
      tags.value.splice(index, 1);
    },
    copyToClipboard,
    randomHex,
    datagen() {
      let sourceOth = `{`;
      sourceOther.value.map((src) => {
        sourceOth += `{"${src[0]}","${src[1]}"},`;
      });
      sourceOth = sourceOth.slice(0, sourceOth.length - 1);
      sourceOth += `}`;
      let tag = `{`;
      tags.value.map((t) => {
        tag += `"${t}",`;
      });
      tag = tag.slice(0, tag.length - 1);
      tag += `}`;
      return `INSERT INTO "artworkData" ("id","title","authorId","permitId","tags","sourceOther","license","timeOrigin","timeThis","views","active") VALUES ('${this.id}','${this.title}','${this.authorId}','${this.permitId}','${tag}','${sourceOth}','${this.license}','${this.timeOrigin}','${this.timeThis}','${this.views}','${this.active}');`;
    },
  },
};
</script>
<template>
  <div class="m-[10%] bg-slate-300">
    <form class="h grid grid-cols-1">
      <div class="authorTriGrid">
        <p>Artwork ID</p>
        <input
          v-model="id"
          maxlength="8"
          minlength="8"
          class="border-2 shadow-md"
        />
        <button
          @click="
            () => {
              id = randomHex(8);
            }
          "
        >
          Random
        </button>
      </div>
      <div class="authorTriGrid">
        <p>Artwork Title</p>
        <input v-model="title" class="border-2 shadow-md" maxlength="50" />
      </div>
      <div class="authorTriGrid">
        <p>Author ID</p>
        <input
          v-model="authorId"
          class="border-2 shadow-md"
          maxlength="8"
          minlength="8"
        />
        <button
          @click="
            () => {
              authorId = randomHex(8);
            }
          "
        >
          Random
        </button>
      </div>
      <div class="authorTriGrid">
        <p>Permit ID</p>
        <input
          v-model="permitId"
          class="border-2 shadow-md"
          maxlength="8"
          minlength="8"
        />
        <button
          @click="
            () => {
              permitId = randomHex(8);
            }
          "
        >
          Random
        </button>
      </div>
      <div>
        <p>Tags</p>
        <div v-for="(tag, index) in tags" class="recentGrid">
          <input v-model="tags[index]" />
          <button
            @click="delTag(index)"
            v-show="!(index == 0 && maxTagsLength == 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              style="display: block; margin: auto"
              fill="rgb(200,50,50)"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <button v-show="index + 1 == maxTagsLength" @click="newTag()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              style="display: block; margin: auto"
              fill="rgb(90,170,250)"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p>Other Sources</p>
        <div class="contactGrid">
          <p>Platform</p>
          <p>Address</p>
        </div>
        <div v-for="(source, index) in sourceOther" class="contactGrid">
          <input v-model="source[0]" class="m-1" />
          <input v-model="source[1]" class="m-1" />
          <button
            @click="delSourceOther(index)"
            v-show="!(index == 0 && maxSourceOtherLength == 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              style="display: block; margin: auto"
              fill="rgb(200,50,50)"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <button
            v-show="index + 1 == maxSourceOtherLength"
            @click="newSourceOther()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              style="display: block; margin: auto"
              fill="rgb(90,170,250)"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="authorTriGrid">
        <p>Original Time Uploaded</p>
        <input
          v-model="timeOrigin"
          class="border-2 shadow-md"
          type="datetime-local"
        />
      </div>
      <div class="authorTriGrid">
        <p>Time Uploaded on This Site</p>
        <input
          v-model="timeThis"
          class="border-2 shadow-md"
          type="datetime-local"
        />
      </div>
      <div class="authorTriGrid">
        <p>Views</p>
        <input v-model="views" class="border-2 shadow-md" />
      </div>
      <div class="authorTriGrid">
        <p>Active</p>
        <input v-model="active" class="border-2 shadow-md" type="checkbox" />
      </div>
    </form>
    <p>{{ datagen() }}</p>
    <button @click="copyToClipboard(datagen())">Copy to Clipboard</button>
  </div>
</template>
