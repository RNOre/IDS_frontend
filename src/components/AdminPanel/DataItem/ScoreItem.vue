<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import {mapState} from "vuex";

export default {
  name: 'ScoreItem',
  components: {
    DataTable,
    Column,
    Dialog,
  },
  data() {
    return {
      studentData: [
        {
          id: 1,
          value: 694358,
          OAR: 32,
          ROD: 42,
          NIR: 51,
          result: 23
        },
        {
          id: 1,
          value: 423535,
          OAR: 62,
          ROD: 22,
          NIR: 2,
          result: 12
        }
      ]
    }
  },
  methods: {
    print() {
      window.print();
    }
  },
  computed: {
    ...mapState({
          scoreData: state => state.score.studentsScore,
        })
  },
  created() {
    this.$store.dispatch('getStudentsScores')
  }
}
</script>
<template>
  <div class="score">
    <h1 @click="console.log(scoreData)">Список студентов</h1>
    <Button label="Печать" class="printBtn" @click="print"/>
    <DataTable :value="scoreData" stripedRows tableStyle="min-width: 50rem">
      <Column field="value" header="№ зк" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align:middle"></Column>
      <Column field="0.value" header="Общий акад. рейтинг" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="1.value" header="Рейтинг общ. деят." headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="2.value" header="Научно иссл. рейтинг" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="result" header="Результат" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
    </DataTable>
  </div>
</template>
<style scoped>
.title {
  text-align: center;
  display: none;
}

.score {
  margin-top: 50px;
}

@media print {
  body {
    font-size: 28px;
  }

  .title {
    display: block
  }

  .printBtn {
    display: none
  }
}

</style>