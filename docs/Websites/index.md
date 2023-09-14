# 实用网站收集

<script setup>
import { ref } from 'vue'
import cardList from './card-list.vue'
import webList from './webList.js'
</script>

## {{webList[0].name}}

<card-list :data-list="webList[0].item" />
## {{webList[1].name}}
<card-list :data-list="webList[1].item" />
## {{webList[2].name}}
<card-list :data-list="webList[2].item" />
## {{webList[3].name}}
<card-list :data-list="webList[3].item" />
## {{webList[4].name}}
<card-list :data-list="webList[4].item" />
## {{webList[5].name}}
<card-list :data-list="webList[5].item" />
## {{webList[6].name}}
<card-list :data-list="webList[6].item" />
## {{webList[7].name}}
<card-list :data-list="webList[7].item" />

<style scoped lang="scss">
h2{
    font-size:17px;
    padding:0 0 0 8px !important;
    border:none;
    margin-top:20px !important;
    a{
        top:0 !important;
    }
    &::before{
        content:'';
        width:2px;
        height:80%;
        position:absolute;
        left:0;
        top:50%;
        transform: translateY(-50%);
        background-color:red;
    }
}
</style>
