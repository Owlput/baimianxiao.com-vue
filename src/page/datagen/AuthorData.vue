<script setup>
import { computed, ref } from "@vue/reactivity";
import { randomHex, copyToClipboard } from "../../oneliners";

let authorId = "";
let authorName = "";

let contacts = ref([["", ""]]);
let maxContactLength = computed(() => {
  return contacts.value.length;
});
let recent = ref([""]);
let maxRecentLength = computed(() => {
  return recent.value.length;
});
function datagen() {
  let cont = `{`;
  contacts.value.map((con) => {
    cont += `{"${con[0]}","${con[1]}"},`;
  });
  cont = cont.slice(0, cont.length - 1);
  cont += `}`;
  let rec = `{`;
  recent.value.map((re) => {
    rec += `"${re}",`;
  });
  rec = rec.slice(0, rec.length - 1);
  rec += `}`;
  return `INSERT INTO "authorData" ("id","name","contact","recent") VALUES ('${this.authorId}','${this.authorName}','${cont}','${rec}');`;
}
function newContacts() {
  contacts.value.push(["", ""]);
}
function delContacts(index) {
  if (index == 0 && maxContactLength.value == 1) return;
  contacts.value.splice(index, 1);
}
function newRecent() {
  recent.value.push("");
}
function delRecent(index) {
  if (index == 0 && maxRecentLength.value == 1) return;
  recent.value.splice(index, 1);
}
//svg centering: https://stackoverflow.com/questions/8639383/how-do-i-center-an-svg-in-a-div
</script>
<template>
  <div class="m-[10%] bg-slate-300">
    <form class="h grid grid-cols-1">
      <div class="authorTriGrid">
        <p>Author ID</p>
        <input
          v-model="authorId"
          maxlength="8"
          minlength="8"
          class="border-2 shadow-md"
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
        <p>Author Name</p>
        <input v-model="authorName" class="border-2 shadow-md" maxlength="50" />
      </div>
      <div>
        <p>Contacts</p>
        <div class="contactGrid">
          <p>Platform</p>
          <p>Address</p>
        </div>
        <div v-for="(contact, index) in contacts" class="contactGrid">
          <input v-model="contact[0]" class="m-1" />
          <input v-model="contact[1]" class="m-1" />
          <button
            @click="delContacts(index)"
            v-show="!(index == 0 && maxContactLength == 1)"
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
          <button v-show="index + 1 == maxContactLength" @click="newContacts()">
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
        <p>Recent Works</p>
        <div v-for="(work, index) in recent" class="recentGrid">
          <input v-model="work[index]" />
          <button
            @click="delRecent(index)"
            v-show="!(index == 0 && maxRecentLength == 1)"
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
          <button v-show="index + 1 == maxRecentLength" @click="newRecent()">
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
    </form>
    <p>{{ datagen() }}</p>
    <button @click="copyToClipboard(datagen())">Copy to Clipboard</button>
  </div>
</template>

<style>
.contactGrid {
  display: grid;
  grid-template-columns: minmax(5rem, 25%) minmax(10rem, 65%) minmax(1.5rem, 5%) minmax(
      1.5rem,
      5%
    );
  margin: 0.5rem 15%;
}
.authorTriGrid {
  display: grid;
  grid-template-columns: minmax(5rem, 10rem) minmax(8rem, 12rem) auto;
  margin: 0.5rem 15%;
}
.recentGrid {
  display: grid;
  grid-template-columns:
    minmax(8rem, 12rem) minmax(1.5rem, 5%) minmax(1.5rem, 5%)
    auto;
  margin: 0.5rem 15%;
}
</style>
