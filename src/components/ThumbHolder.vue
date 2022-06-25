<script>
import Thumb from './card/Thumb.vue'
import axios from "axios";
import { apiAddr } from '../config'
import { ref, watchEffect, computed, onRenderTriggered } from 'vue';

const thumbs = ref([])
const page = ref([1, 1])
const timeOrd = ref(true)
const displayed = computed(() => {
    return thumbs.value ? thumbs.value.slice((page.value[0] - 1) * 10, page.value[0] * 10) : []
})

function timeSort(ord) {
    ord ? thumbs.value.sort((s, t) => {
        let a = s.date;
        let b = t.date;
        if (a >= b) return -1;
        else if (a < b) return 1;
        else return -1;
    }) : thumbs.value.sort((s, t) => {
        let a = s.date;
        let b = t.date;
        if (a >= b) return 1;
        else if (a < b) return -1;
        else return 1;
    })
}
watchEffect(async () => {
    thumbs.value = await (await axios.get(`${apiAddr}/baimianxiao/data/thumbData/all`)).data
    page.value = [1, Math.ceil(thumbs.value.length / 10)]
})
watchEffect(() => { timeSort(timeOrd.value) })


export default {
    name: 'ThumbHolder',
    components: {
        Thumb
    },
    setup() {
        onRenderTriggered((event) => {
            console.log(event)
        })
        return {
            displayed, page, timeOrd
        }
    },
    methods: {
        setTimeOrd(ord) {
            this.timeOrd = ord;
            console.log(`ord:${this.timeOrd}`)
        },
        setPage(page) {
            if (page <= 0) return;
            if (page >= this.page[1]) { this.page[0] = this.page[1]; return; };
            this.page[0] = page
        }
    }
}

</script>

<template>
    <div class="flex flex-wrap justify-around ml-24 mr-24 mb-4 mt-4">
        <div class="h-auto w-auto flex flex-col border-spacing-4 shadow-md m-2.5 rounded-md "
            v-for="thumbData in displayed" :key="thumbData.uri"> <!-- Please include the key prop to help update stale content -->
            <Thumb :thumb="thumbData"></Thumb>
        </div>

    </div>
    <button @click="setTimeOrd(true)">从新到旧</button>
    <button @click="setTimeOrd(false)">从旧到新</button>
    <button @click="setPage(page[0] + 1)">下一页</button>
    <button @click="setPage(page[0] - 1)">上一页</button>
</template>