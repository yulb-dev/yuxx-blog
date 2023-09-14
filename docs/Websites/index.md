# 实用网站收集

<script setup>
import { ref } from 'vue'
import webList from './webList.js'
function goDestination(data){
    window.open(data.href)
}
</script>

## javasc

<div v-for="classification in webList" :key="classification.name" class="classification">
    <!-- <p class='title'>{{ classification.name }}</p> -->
    <div class="card-list">
        <div v-for="cardItem in classification.item" class="card-item" @click="goDestination(cardItem)">
            <p class="name">{{ cardItem.name }}</p>
            <p class="details">{{ cardItem.details }}</p>
        </div>
    </div>
</div>

<style scoped lang="scss">
/* *{
    margin:0 !important;
    padding:0 !important;
} */
h2{
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
