<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";

export default {
  name:'ScoreItem',
  components:{
    DataTable,
    Column,
    Dialog,
  },
  data(){
    return{
      studentData:[
        {
          id:1,
          value:1,
          OAR:32,
          ROD:42,
          NIR:51,
          result:23
        },
        {
          id:1,
          value:2,
          OAR:232,
          ROD:22,
          NIR:2,
          result:12
        }
      ]
    }
  }
}
</script>
<template>
  <div class="score">
    <DataTable :value="studentData" stripedRows tableStyle="min-width: 50rem">
      <Column field="value" header="№ зк" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align:middle"></Column>
      <Column field="value" header="Общий акад. рейтинг" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="value" header="Рейтинг общ. деят." headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="value" header="Научно иссл. рейтинг" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
      <Column field="result" header="Результат" headerStyle="justify-content:center; vertical-align:middle"
              bodyStyle="text-align:center; vertical-align: middle"></Column>
    </DataTable>
  </div>
</template>
<style scoped>
.score{
  margin-top: 50px;
}

</style>