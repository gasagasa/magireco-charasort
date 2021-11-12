<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">キャラソート最終結果</h1>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container has-text-centered">
      <div class="box">
        <table class="table" style="margin: auto">
          <thead>
            <tr>
              <th>順位</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chara, i) in result" :key="chara">
              <td>{{ i + 1 }}</td>
              <td>{{ chara }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="field is-grouped" style="justify-content: center">
        <p class="control">
          <button class="button" @click="restart">トップに戻る</button>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    if (!localStorage.getItem('result')) {
      router.push({ name: 'Home' });
    }

    const result: Array<string> = JSON.parse(localStorage.getItem('result')!);

    const restart = () => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('再表示はできません。トップに戻りますか？')) {
        return;
      }
      localStorage.clear();
      router.push({ name: 'Home' });
    };

    return { result, restart };
  },
});
</script>
