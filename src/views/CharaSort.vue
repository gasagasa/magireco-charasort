<template>
  <section class="section">
    <div class="container is-widescreen has-text-centered">
      <div class="block">
        <p>途中経過はオートセーブされます。</p>
      </div>
      <div class="block">
        <button class="button choice" @click="choose(true, false)">
          {{ lefts[0] }}
        </button>
        <button class="button choice" @click="choose(false, true)">
          {{ rights[0] }}
        </button>
      </div>
      <div class="block">
        <button class="button" @click="choose(false, false)">選べない！</button>
      </div>
      <div class="block">
        <progress class="progress is-primary" :value="progress" max="100">
          {{ progress }}
        </progress>
        進捗: {{ progress }}%
        <p v-if="progress >= 100">何故か知りませんが割と頻繁に進捗が100%を超えます。</p>
      </div>
      <hr>
      <div class="block">
        <button class="button is-danger" @click="restart">やめる</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { defineComponent } from 'vue';

let charaList: string[] = [];
function shuffle(array: Array<string>) {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length; i > 1; i--) {
    const k = Math.floor(Math.random() * i);
    // eslint-disable-next-line no-param-reassign
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

function nesting(array: Array<string>) {
  return array.map((chara) => [chara]).slice();
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      // 最終結果配列
      finalResults: [] as string[][],
      // 一時結果配列
      tempResults: [] as string[],
      // 次に処理するストック配列
      // 最初は[[いろは][やちよ][鶴乃]]みたいな状態
      nextProcessingStocks: [[]] as string[][],
      // 処理中左配列
      lefts: [] as string[],
      // 処理中右配列
      rights: [] as string[],
      count: 0,
    };
  },
  methods: {
    initLeftsRights() {
      this.lefts = this.nextProcessingStocks.shift()!;
      this.rights = this.nextProcessingStocks.shift()!;
    },
    startNextTurn() {
      this.nextProcessingStocks = this.finalResults.slice();
      this.finalResults.splice(0);
      this.initLeftsRights();
    },
    choose(isLeft: boolean, isRight: boolean) {
      if (isLeft) {
        this.tempResults.push(this.lefts.shift()!);
        this.count += 1;
      } else if (isRight) {
        this.tempResults.push(this.rights.shift()!);
        this.count += 1;
      } else {
        this.tempResults.push(this.lefts.shift()!);
        this.tempResults.push(this.rights.shift()!);
        this.count += 2;
      }

      if (this.lefts.length && this.rights.length) {
        return;
      }

      // 左もしくは右がなくなったら、残りを詰め込む
      this.tempResults = this.tempResults.concat(this.lefts, this.rights);
      this.finalResults.push(this.tempResults.slice());
      this.tempResults.splice(0);

      if (this.nextProcessingStocks.length >= 2) {
        this.initLeftsRights();
        return;
      }

      if (this.nextProcessingStocks.length === 1) {
        this.finalResults.push(this.nextProcessingStocks.shift()!.slice());
        this.startNextTurn();
        return;
      }

      if (this.finalResults.length !== 1) {
        this.startNextTurn();
        return;
      }

      this.finish();
    },
    restart() {
      // eslint-disable-next-line no-alert
      if (!window.confirm('これまでの結果を破棄してトップに戻りますか？')) {
        return;
      }
      localStorage.clear();
      this.$router.push({ name: 'Home' });
    },
    finish() {
      localStorage.setItem('result', JSON.stringify(this.finalResults.shift()));
      this.$router.push({ name: 'CharasortResult' });
    },
    saveLocalStorage() {
      localStorage.setItem('finalResults', JSON.stringify(this.finalResults));
      localStorage.setItem('tempResults', JSON.stringify(this.tempResults));
      localStorage.setItem('nextProcessingStocks', JSON.stringify(this.nextProcessingStocks));
      localStorage.setItem('lefts', JSON.stringify(this.lefts));
      localStorage.setItem('rights', JSON.stringify(this.rights));
      localStorage.setItem('count', String(this.count));
    },
  },
  computed: {
    progress(): number {
      const temp = Math.round((this.count / (charaList.length * Math.log(charaList.length))) * 100);
      return Number.isNaN(temp) ? 0 : temp;
    },
  },
  watch: {
    count() {
      this.saveLocalStorage();
    },
    finalResults() {
      this.saveLocalStorage();
    },
    tempResults() {
      this.saveLocalStorage();
    },
    nextProcessingStocks() {
      this.saveLocalStorage();
    },
    lefts() {
      this.saveLocalStorage();
    },
    rights() {
      this.saveLocalStorage();
    },
  },
  mounted() {
    if (!localStorage.getItem('selectedCharactors')) {
      this.$router.push({ name: 'Home' });
      return;
    }

    charaList = JSON.parse(localStorage.getItem('selectedCharactors')!);

    if (localStorage.getItem('count')) {
      this.finalResults = JSON.parse(localStorage.getItem('finalResults')!);
      this.tempResults = JSON.parse(localStorage.getItem('tempResults')!);
      this.nextProcessingStocks = JSON.parse(localStorage.getItem('nextProcessingStocks')!);
      this.lefts = JSON.parse(localStorage.getItem('lefts')!);
      this.rights = JSON.parse(localStorage.getItem('rights')!);
      this.count = Number(localStorage.getItem('count')!);

      if (!this.nextProcessingStocks.length && this.finalResults.length === 1) {
        this.finish();
      }
    } else {
      this.nextProcessingStocks = nesting(shuffle(charaList));
      this.initLeftsRights();
    }
  },
});
</script>

<style lang="scss" scoped>
.choice {
  width: 8.2em;
  height: 10em;
  margin-left: 1em;
  margin-right: 1em;
  white-space: normal;
}
</style>
