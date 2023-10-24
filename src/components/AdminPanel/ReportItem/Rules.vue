<script>
import Dropdown from "primevue/dropdown";

export default {
  name: 'Rules',
  components: {
    Dropdown
  },
  data() {
    return {
      selected: 'lfsjd',
      OMin: 'sdah',
      OMid: '',
      OMax: '',
      low: '',
      items: [
        {name: 'Низкий', code: this.OMin},
        {name: 'Средний', code: 'this.OMid'},
        {name: 'Высокий', code: 'this.OMax'}
      ],
      ruleData: [
        {
          id: 0,
          OParam: this.OMin,
          SParam: 'OMid',
          TParam: 'TMid',
          RParam: 'low'
        },
        {
          id: 1,
          OParam: '',
          SParam: '',
          RParam: ''
        },
      ]
    }
  }
}
</script>
<template>
  <div>
    <h2>Список правил:</h2>
    <div class="rulesList">
      <div class="ruleItem" v-for="rule in ruleData" :key="rule.id">
        <div class="p-float-label">
          <Dropdown v-model="selected" :value="selected" :model-value="selected" inputId="OAR" optionLabel="name" :options="items"
                    placeholder="Общий академический рейтинг"
                    class="w-full md:w-14rem"/>
          <label for="OAR" class="label">Общий академический рейтинг</label>
        </div>
        AND
        <div class="p-float-label">
          <Dropdown v-model="rule.SParam" optionLabel="name" :options="items" placeholder="Общий академический рейтинг"
                    class="w-full md:w-14rem"/>
          <label for="OAR" class="label">Рейтинг общ. деятельности</label>
        </div>
        AND
        <div class="p-float-label">
          <Dropdown v-model="rule.TParam" optionLabel="name" :options="items"
                    placeholder="Научно исследовательский рейтинг"
                    class="w-full md:w-14rem"/>
          <label for="OAR" class="label">Общий акад. рейтинг</label>
        </div>
        =
        <div class="p-float-label">
          <Dropdown v-model="rule.RParam" optionLabel="name" :options="items" placeholder="Результат"
                    class="w-full md:w-14rem"/>
          <label for="OAR">Результат</label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ruleItem {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.label {
  width: 250px
}
</style>