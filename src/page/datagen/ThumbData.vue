<script>
import { randomHex,copyToClipboard } from '../../oneliners'

export default {
    name: "ThumbData",
    data() {
        return {
            id:"",
            title:"",
            authorId:"",
            authorName:"",
            originalTimeUploaded:"",
            views:0,
            active:false
        }
    },
    methods:{
        randomHex,
        copyToClipboard,
        datagen(){
            return `INSERT INTO "thumbData" ("id","title","authorId","authorName","time","views","active") VALUES ('${this.id}','${this.title}','${this.authorId}','${this.authorName}','${this.originalTimeUploaded}',${this.views},${this.active});`
        }
    }
}
</script>
<template>
    <div class="m-[10%] bg-slate-300">
        <form class="h grid grid-cols-1">
            <div class="authorTriGrid">
                <p>Artwork ID</p>
                <input v-model="id" maxlength="8" minlength="8" class="border-2 shadow-md" />
                <button @click="() => { id = randomHex(8) }">Random</button>
            </div>
            <div class="authorTriGrid">
                <p>Artwork Title</p>
                <input v-model="title" class="border-2 shadow-md" maxlength="50" />
            </div>
            <div class="authorTriGrid">
                <p>Author ID</p>
                <input v-model="authorId" class="border-2 shadow-md" maxlength="8" minlength="8" />
                <button @click="() => { authorId = randomHex(8) }">Random</button>
            </div>
            <div class="authorTriGrid">
                <p>Author Name</p>
                <input v-model="authorName" class="border-2 shadow-md" maxlength="50"/>
            </div>
            <div class="authorTriGrid">
                <p>Original Time Uploaded</p>
                <input v-model="originalTimeUploaded" class="border-2 shadow-md" type="datetime-local" />
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