<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";
import info from "./information.js";
import boyPng from "./images/boy.png";
import girlPng from "./images/girl.png";

const age = dayjs().diff(dayjs(info.birthday), "year");

const gender = computed(() => (info.gender ? boyPng : girlPng));
</script>

<template>
  <div class="content">
    <div class="detail">
      <div class="avatar">
        <img :src="info.avatar" alt="头像" />
      </div>
      <div class="detail-info">
        <div class="flex-box">
          <h1 class="name">{{ info.name }}</h1>
          <img :src="gender" alt="性别" width="28" />
          <p class="bold">{{ age }}</p>
        </div>
        <div class="flex-box">
          <img src="./images/habitation.png" width="25" />
          <p class="normal">{{ info.habitation }}</p>
        </div>
        <div class="flex-box">
          <img src="./images/school.png" width="25" />
          <p class="normal">{{ info.school }}</p>
        </div>
        <div class="flex-box">
          <img src="./images/email.png" width="25" />
          <p class="normal">{{ info.email }}</p>
        </div>
        <!-- <div class="flex-box">
                    <img src="./images/domicile.png" width="28">
                    <p class="normal">{{ info.domicile }}</p>
                </div> -->
      </div>
    </div>
    <div class="other-info">
      <div class="hobby">
        <img src="./images/post.png" width="35" />：
        <p>
          {{ info.workExperience.post
          }}<span class="small">{{ info.workExperience.experience }}</span>
        </p>
      </div>
      <div class="hobby">
        <img src="./images/hobby.png" width="35" />：
        <p>
          <span v-for="(item, i) in info.hobby" :key="i">{{ item }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.flex-box {
  display: flex;
  align-items: center;
}

.content {
  .detail {
    display: flex;

    .avatar {
      display: flex;
      align-items: center;
      width: 30%;

      img {
        width: 100%;
        border-radius: 6px;
        filter: blur(1px);
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          filter: blur(0);
        }
      }
    }

    .detail-info {
      flex: 1;
      padding: 10px 20px;

      .name {
        margin: 0 50px 0 0 !important;
        padding: 0 !important;
        color: var(--vp-home-hero-name-color);
      }

      .bold {
        margin-left: 20px;
        font-size: 22px;
        font-weight: bold;
      }

      .label {
        margin-left: 20px;
      }

      .normal {
        font-size: 20px;
        margin: 10px 20px;
        color: var(--vp-c-text-2);
      }

      .school {
        margin-left: 20px;
        font-size: 22px;
      }
    }
  }

  .other-info {
    padding: 40px 0;

    .hobby {
      @extend .flex-box;
      font-size: 20px;
      display: flex;
      align-items: center;

      .small {
        color: var(--vp-c-text-2);
        font-size: 14px;
        margin-left: 30px;
      }

      span {
        margin-right: 20px;
      }
    }
  }
}
</style>
