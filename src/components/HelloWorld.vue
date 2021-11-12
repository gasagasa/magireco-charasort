<template>
  <div class="hello">
    {{ JSON.stringify(l) }}<br />
    {{ JSON.stringify(currentArr) }}<br />
    {{ JSON.stringify(sortedList) }}<br />
    <div v-if="l.length > 1">
      <button @click="choose(true)">{{ l[rootIndex][leftIndex] }}</button>
      <button @click="choose(false)">{{ l[rootIndex + 1][rightIndex] }}</button>
    </div>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
          target="_blank"
          rel="noopener"
          >typescript</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const l: Ref<Array<Array<string>>> = ref([['環いろは'], ['七海やちよ'], ['由比鶴乃'], ['深月フェリシア'], ['二葉さな'], ['環うい'], ['紅晴結菜'], ['大庭樹里']]);
    const sortedList: Array<Array<string>> = [];

    const rootIndex = ref(0);
    const leftIndex = ref(0);
    const rightIndex = ref(0);

    const currentArr: Ref<Array<string>> = ref([]);
    const choose = (isLeft: boolean) => {
      if (isLeft) {
        currentArr.value.push(l.value[rootIndex.value][leftIndex.value]);
        leftIndex.value += 1;
        if (leftIndex.value === l.value[rootIndex.value].length) {
          currentArr.value = currentArr.value
            .concat(l.value[rootIndex.value + 1].slice(rightIndex.value));
          sortedList.push(currentArr.value.slice());
          currentArr.value.splice(0);
          leftIndex.value = 0;
          rightIndex.value = 0;
          rootIndex.value += 2;
          if (rootIndex.value >= l.value.length) {
            l.value = sortedList.slice();
            sortedList.splice(0);
            rootIndex.value = 0;
          }
        }
      } else {
        currentArr.value.push(l.value[rootIndex.value + 1][rightIndex.value]);
        rightIndex.value += 1;
        if (rightIndex.value === l.value[rootIndex.value + 1].length) {
          currentArr.value = currentArr.value
            .concat(l.value[rootIndex.value].slice(leftIndex.value));
          sortedList.push(currentArr.value.slice());
          currentArr.value.splice(0);
          leftIndex.value = 0;
          rightIndex.value = 0;
          rootIndex.value += 2;
          if (rootIndex.value >= l.value.length) {
            l.value = sortedList.slice();
            sortedList.splice(0);
            rootIndex.value = 0;
          }
        }
      }
    };
    return {
      l,
      currentArr,
      sortedList,
      choose,
      rootIndex,
      leftIndex,
      rightIndex,
      leftChoice: l.value[rootIndex.value][leftIndex.value],
      rightChoice: l.value[rootIndex.value + 1][rightIndex.value],
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
