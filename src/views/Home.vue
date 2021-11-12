<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">マギレコキャラソート</h1>
        <p>
          マギアレコードのキャラソートです。データは<a href="https://dic.pixiv.net/a/%E3%83%9E%E3%82%AE%E3%82%A2%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E4%B8%80%E8%A6%A7" target="_blank" rel="noopener noreferrer">pixiv百科事典</a>のものを手動で取得しています。データが古くなったら<a href="https://twitter.com/slime_suran" target="_blank" rel="noopener noreferrer">作者</a>に圧力をかけてください。<br/>
          途中経過はオートセーブされるため、同じ端末で開けば途中から始めることが可能です。<br/>
          画像は作者に根性がないのでありません。<br/>
          バグはそれなりにあります。
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="box">
        <h2 class="title is-4">ソートするグループを選択</h2>
        <p class="subtitle is-5">選択したもの同士はOR条件です。</p>
        <hr>
        <div v-for="(group, name) in allGroups" :key="name">
          <h3 class="title is-5">{{ name }}</h3>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <label class="checkbox" v-for="attr in group" :key="attr">
                    <input type="checkbox" v-model="checkedGroups" :value="{ [name]: attr }" />
                    {{ attr }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button class="button" @click="allCheck(name)">
                全選択
              </button>
            </p>
            <p class="control">
              <button class="button" @click="removeAllCheck(name)">
                全解除
              </button>
            </p>
          </div>
          <hr>
        </div>
        <div class="block has-text-centered" v-if="hasProgress">
          <button
            class="button is-primary is-rounded is-large">
            <router-link :to="{ name: 'Charasort' }" style="color: white">途中から</router-link>
          </button>
        </div>
        <div class="block has-text-centered">
          <button
            class="button is-primary is-rounded is-large"
            @click="startSorting">
            ソートする！
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, Ref, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import charactorsJson from '../assets/charactors';

const charactors: Record<string, string>[] = JSON.parse(charactorsJson.trim()).data;
const attributes = new Set(charactors.map((chara) => chara['属性']));
const types = new Set(charactors.map((chara) => chara['タイプ']));
const realities = new Set(charactors.map((chara) => chara['レアリティ']));
const groups = new Set(charactors.map((chara) => chara['グループ']));
const allGroups: Record<string, Set<string>> = {
  属性: attributes,
  タイプ: types,
  レアリティ: realities,
  グループ: groups,
};

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();

    const checkedGroups: Ref<Record<string, string>[]> = ref([]);

    const removeAllCheck = (keyName: string) => {
      checkedGroups.value = checkedGroups.value.filter((checkedGroup) => !Object.prototype.hasOwnProperty.call(checkedGroup, keyName));
    };

    const allCheck = (keyName: string) => {
      removeAllCheck(keyName);
      const targetGroup = allGroups[keyName];
      [...targetGroup].map((attr) => ({ [keyName]: attr })).forEach((attr) => checkedGroups.value.push(attr));
    };

    const startSorting = () => {
      const selectedCharactors = charactors.filter((chara) => checkedGroups.value.some((checkedGroup) => chara[Object.keys(checkedGroup)[0]] === Object.values(checkedGroup)[0]));
      const selectedCharactorNames = selectedCharactors.map((chara) => chara['名前']);

      if (selectedCharactorNames.length < 2) {
        alert('最低2キャラが必要です。');
        return;
      }

      localStorage.clear();
      localStorage.setItem('selectedCharactors', JSON.stringify(selectedCharactorNames));
      router.push({ name: 'Charasort' });
    };

    const hasProgress = ref(false);
    onMounted(() => {
      hasProgress.value = localStorage.getItem('count') != null;
    });

    return {
      checkedGroups,
      allCheck,
      removeAllCheck,
      startSorting,
      allGroups,
      hasProgress,
    };
  },
});
</script>

<style lang="scss" scoped>
  .checkbox {
    margin-right: 1em;
  }
</style>
