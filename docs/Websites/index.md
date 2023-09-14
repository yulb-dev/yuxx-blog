# 实用网站收集

<script setup>
import { ref } from 'vue'
import cardList from './card-list.vue'
import webList from './webList.js'
function goDestination(data){
    window.open(data.href)
}
</script>

## {{webList[0].name}}

<card-list :data-list="webList[0].item" />
## {{webList[1].name}}
<card-list :data-list="webList[1].item" />
## {{webList[2].name}}
<card-list :data-list="webList[2].item" />

<style scoped lang="scss">
/* *{
    margin:0 !important;
    padding:0 !important;
} */
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
.classification {
    .title{
        font-weight: bold;
        font-size:17px;
        position: relative;
        padding-left:8px !important;
        margin-bottom:0 !important;
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
    /* display: flex; */
    .card-list {
        margin-top:10px;
        display: flex;
        flex-wrap: wrap;
        .card-item{
            border-radius: 4px;
            box-shadow: 0px 0px 10px -3px rgb(201, 201, 201);
            margin:10px 10px;
            padding:10px 14px;
            transition: all 0.2s;
            cursor: pointer;
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0px 0px 10px 0px rgb(201, 201, 201);
            }
            .name{
                color:var(--vp-c-brand-1);
                margin: 0 !important;
            }
            .details{
                font-size: 12px;
                color: var(--vp-c-text-2);
                margin: 0 !important;
            }
        }
    }
}
</style>
