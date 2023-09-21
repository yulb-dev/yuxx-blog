<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import info from './information.js'
const birthday = dayjs(info.birthday)
</script>
<template>
    <div class="content"></div>
</template>

<style lang="scss"></style>