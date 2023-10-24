<script>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import {mapState} from "vuex";
import {format} from "date-fns";

export default {
  name: 'AddStudent',
  components: {
    InputText,
    Dropdown,
    Calendar
  },
  props: {},
  methods: {
    addStudent() {
      const body = {
        value: this.value,
        enrollmentDate: format(new Date(this.enrollmentDate), 'yyyy-MM-dd'),
        student_group_id: this.studentGroupId.code
      };
      this.$store.dispatch('createStudent', body);
      this.$emit('close');
    }
  },
  data() {
    return {
      value: '',
      studentGroupId: '',
      enrollmentDate: '',
    }
  },
  computed: {
    ...mapState({
      groupData: state => state.students.groups,
    })
  },
  created() {
    this.$store.dispatch('getGroups');
  }
}
</script>
<template>
  <div class="card flex justify-content-center addStudent">
    <form class="flex flex-column gap-2 p-5">
            <span class="p-float-label">
                <InputText id="value" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }"
                           aria-describedby="text-error"/>
                <label for="value">Номер зач. книжки</label>
            </span>
      <div class="p-float-label">
        <Dropdown v-model="studentGroupId" :options="groupData" optionLabel="name"
                  placeholder="Выберете группу" class="w-full md:w-14rem"/>
        <label for="dd-city">Выберете группу</label>
      </div>
      <div class="p-float-label">
        <Calendar v-model="enrollmentDate" inputId="birth_date"/>
        <label for="birth_date">Дата зачисления</label>
      </div>
      <Button label="Добавить" @click="addStudent"/>
    </form>
    <Toast/>
  </div>
</template>
<style>
.addStudent form {
  display: flex;
  flex-direction: row;
  gap: 30px
}
</style>