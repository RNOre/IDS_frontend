<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import {getData} from "../../../service/journalService.js";

export default {
  name: 'JournalItem',
  components: {
    TreeTable,
    Column
  },
  data() {
    return {
      nodes: null
    }
  },
  methods:{
    onNodeSelect(node){
      if(Number(node.key)){
        console.log(node.data.id)
      }else{
        console.log(node.data.name)
      }
    },
    test(){
      getData();
    }
  },
  mounted() {
    // Promise.resolve([
    //   {
    //     key: '0',
    //     data: {
    //       name: 'Научная конференция',
    //       icon: 'добавить участника',
    //       command: () => {
    //         console.log('l;kasd')
    //       },
    //     },
    //
    //     children: [
    //       {
    //         key: '0-0',
    //         data: {
    //           name: '423535',
    //           icon: 'убрать из участия'
    //         },
    //
    //       },
    //       {
    //         key: '0-1',
    //         data: {
    //           name: '694358',
    //           icon: 'убрать из участия'
    //         }
    //       },
    //       {
    //         key: '0-2',
    //         data: {
    //           name: '239472',
    //           icon: 'убрать из участия'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     key: '1',
    //     data: {
    //       name: 'Олимпиада',
    //       icon: 'добавить участника',
    //       command: () => {
    //         console.log('l;kasd')
    //       },
    //     },
    //
    //     children: [
    //       {
    //         key: '1-0',
    //         data: {
    //           name: '543823',
    //           icon: 'убрать из участия'
    //         },
    //       },
    //       {
    //         key: '1-1',
    //         data: {
    //           name: '463534',
    //           icon: 'убрать из участия'
    //         }
    //       },
    //
    //     ]
    //   },
    // ])
    //     .then((data) => this.nodes = data)
  // }
  Promise.resolve(getData())
      .then((data) => this.nodes = data)
}
}
</script>
<template>
  <div class="journal">
    <div class="card">
      <TreeTable :value="nodes" selectionMode="single" @nodeSelect="onNodeSelect">
        <Column field="name" header="Название мероприятия" :expander="true"></Column>
        <Column field="icon" header=" "></Column>
        <!--        <Column headerStyle="width: 10rem">-->
        <!--          <template #body>-->
        <!--            <div class="flex flex-wrap gap-2">-->
        <!--              <Button type="button" icon="pi pi-search" rounded/>-->
        <!--              <Button type="button" icon="pi pi-pencil" rounded severity="success"/>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </Column>-->
      </TreeTable>
    </div>
  </div>
</template>
<style scoped>
.journal {
  margin-top: 50px;
}
</style>