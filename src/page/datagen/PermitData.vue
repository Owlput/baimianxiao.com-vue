<script>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { randomHex, copyToClipboard } from '../../oneliners'
const sources = ref([""])
const maxSourcesLength = computed(() => {
    return sources.value.length
})
export default {
    name: "PermitData",
    data() {
        return {
            id: ""
        }
    },
    setup() {
        return {
            sources,
            maxSourcesLength
        }
    },
    methods:{
        randomHex,
        copyToClipboard,
        datagen(){
             let source = `{`
            sources.value.map((t) => {
                source += `"${t}",`
            })
            source = source.slice(0, source.length - 1)
            source += `}`
            return `INSERT INTO "permitData" ("id","source") VALUES ('${this.id}','${source}');`
        },
        newSource() {
            sources.value.push("")
        },
        delSource(index) {
            if (index == 0 && maxSourcesLength.value == 1) return;
            sources.value.splice(index, 1)
        }
    }
}
</script>
<template>
    <div class="m-[10%] bg-slate-300">
        <form class="h grid grid-cols-1">
            <div class="authorTriGrid">
                <p>Author ID</p>
                <input v-model="id" maxlength="8" minlength="8" class="border-2 shadow-md" />
                <button @click="() => { id = randomHex(8) }">Random</button>
            </div>
            <div>
                <p>Sources</p>
                <div v-for="(source,index) in sources" class="recentGrid">
                    <input v-model="sources[index]" />
                    <button @click="delSource(index)" v-show="!(index == 0 && maxSourcesLength == 1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="display:block;margin:auto"
                            fill="rgb(200,50,50)" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                    <button v-show="(index + 1) == maxSourcesLength" @click="newSource()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="display:block;margin:auto"
                            fill="rgb(90,170,250)" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
        <p>{{ datagen() }}</p>
        <button @click="copyToClipboard(datagen())">Copy to Clipboard</button>
    </div>
</template>