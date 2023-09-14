<script setup>
defineProps(['dataList'])

function goDestination(data) {
    window.open(data.href)
}
</script>

<template>
    <div class="card-list">
        <div v-for="cardItem in dataList" class="card-item" @click="goDestination(cardItem)">
            <p class="name">{{ cardItem.name }}</p>
            <p class="details">{{ cardItem.details }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.card-list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .card-item {
        border-radius: 4px;
        box-shadow: 0px 0px 10px -3px rgb(201, 201, 201);
        margin: 10px 10px;
        padding: 10px 14px;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0px 0px 10px 0px rgb(201, 201, 201);
        }

        .name {
            color: var(--vp-c-brand-1);
            margin: 0 !important;
        }

        .details {
            font-size: 12px;
            color: var(--vp-c-text-2);
            margin: 0 !important;
        }
    }
}
</style>