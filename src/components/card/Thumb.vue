<script>
import { imgAddr, siteAddr } from '../../config'
import { roundNumber } from '../../oneliners'
import ViewCount from '../ViewCount.vue'
export default {
    name: "Thumb",
    props: ["thumb"],
    setup() {
        return {
            imgAddr,
            siteAddr
        };
    },
    methods: {
        roundNumber
    },
    components: { ViewCount }
}
</script>
<template >
    <img class="h-[200px] w-[200px] rounded-t-md hover:opacity-80"
        :src="this.imgAddr + '/thumbs/' + thumb.uri + '.jpg'" />
    <p class="ml-1.5">{{thumb.title}}</p>
    <div class="mt-1 mb-1 ml-1.5">
        <img class="rounded-full h-8 w-8 inline float-left"
            :src="this.imgAddr + '/authorProfile/' + thumb.author.image" />
        <p class="text-md ml-2 inline float-left mt-1">{{ thumb.author.name }}</p>
        <ViewCount :count="5247" class="inline float-right"></ViewCount>
    </div>
</template>