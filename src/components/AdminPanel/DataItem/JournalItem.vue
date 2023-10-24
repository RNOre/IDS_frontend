<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";

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
      console.log(node)
    }
  },
  mounted() {
    Promise.resolve([
      {
        key: '0',
        data: {
          name: 'Event 1',
          icon: 'добавить участника',
          command: () => {
            console.log('l;kasd')
          },
        },

        children: [
          {
            key: '0-0',
            data: {
              name: '1 student',
              icon: 'убрать из участия'
            },

          },
          {
            key: '0-1',
            data: {
              name: '2 student',
              icon: 'убрать из участия'
            }
          },
          {
            key: '0-2',
            data: {
              name: '3 student',
              icon: 'убрать из участия'
            }
          }
        ]
      },
      {
        key: '1',
        data: {
          name: 'Event 2',
          icon: 'добавить участника',
          command: () => {
            console.log('l;kasd')
          },
        },

        children: [
          {
            key: '1-0',
            data: {
              name: '1 student',
              icon: 'убрать из участия'
            },

          },
          {
            key: '1-1',
            data: {
              name: '4 student',
              icon: 'убрать из участия'
            }
          },

        ]
      },
    ])
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