
<script setup>
import { ref } from 'vue'

const count = ref(0)
const webList = ref([
    {
        name: 'HTML + CSS',
        item: [
            { name: 'HTML教程', href: 'https://wangdoc.com/html/', details: '网道 HTML 教程' },
            { name: 'HTML + CSS 教程', href: 'https://developer.mozilla.org', details: 'MDN' },
            {
                name: 'CSS教程',
                href: 'https://www.w3school.com.cn/css/index.asp',
                details: 'w3school CSS 教程'
            },
            {
                name: 'viewport',
                href: 'https://www.cnblogs.com/2050/p/3877280.html',
                details: '移动前端开发之viewport的深入理解'
            }
        ]
    }
])
</script>

<template>
    <div v-for="classification in webList" :key="classification.name" class="classification">
        <h1>{{ classification.name }}</h1>
        <div class="card-list">
            <div v-for="cardItem in classification.item" class="card-item">
                <p>{{ cardItem.name }}</p>
                <p>{{ cardItem.details }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.classification {
    display: flex;
    font-weight: bold;
    position: relative;
    transform: translateY(50%);
    flex-wrap: wrap;
    border-radius: 4px;
    box-shadow: 0px 0px 9px 3px rgb(201, 201, 201);
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 0px 10px 0px rgb(201, 201, 201);
    }

    &::before {}

    .card-list {
        display: flex;
    }
}
</style>
