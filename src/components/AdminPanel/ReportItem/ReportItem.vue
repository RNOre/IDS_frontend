<script>
import {ref} from 'vue';
import Chart from 'primevue/chart';
import InputText from 'primevue/inputtext';
import {andRules, defuzzification, determineSample, fuzzification} from "../../../service/fuzzy/fuzzy.js";
import Score from "./Score.vue";
import Dialog from 'primevue/dialog';
import OrganizationChart from "primevue/organizationchart";
import {mapState} from "vuex";
import Rules from "./Rules.vue";
import Result from "./Result.vue";

export default {
  name: 'ReportItem',
  components: {
    Rules,
    Result,
    Score,
    Chart,
    InputText,
    Dialog,
    OrganizationChart
  },
  data() {
    return {
      data: ref({
        label: 'Результат',
        id:'Result',
        styleClass: 'bg-red text-red border-round-xl',
        children:[
          {
            label: 'Метод Мамдани',
            id: 'Mamdani',
            children:[
              {
                label: 'Общий академический рейтинг',
                id:'OAR',
              },
              {
                label: 'Рейтинг общественной деятельности',
                id:'ROD'
              },
              {
                label: 'Научно исследовательский рейтинг',
                id: 'NIR'
              },
            ]
          }
        ]
      }),
      scoreModal:false,
      rulesModal: false,
      resultModal: false,
      olimpValue: '',
      studyValue: '',
      testValue: '',
      errorMessage: '',
      olimpChartData: {
        labels: ["50", "100", "150", "200", "250", "300", "350", "400"],
        datasets: [
          {
            label: 'Min',
            data: [100, 100, 0],
            fill: false,
            borderColor: "#DAA7C5",
            tension: 0.4
          },
          {
            label: 'Middle',
            data: [, 0, 100, 0],
            fill: false,
            borderColor: "#FDB152",
            tension: 0.4
          },
          {
            label: 'Max',
            data: [, , 0, 100, 100, 100, 100, 100],
            fill: false,
            borderColor: "#959B6D",
            tension: 0.4
          }
        ]
      },
      studyChartData: {
        labels: ["10", "20", "30", "40", "50", "60", "70", "80"],
        datasets: [
          {
            label: 'Min',
            data: [100, 100, 100, 50, 0],
            fill: false,
            borderColor: "#DAA7C5",
            tension: 0.4
          },
          {
            label: 'Middle',
            data: [, , 0, 50, 100, 50, 0],
            fill: false,
            borderColor: "#FDB152",
            tension: 0.4
          },
          {
            label: 'Max',
            data: [, , , ,0, 50, 100, 100, 100],
            fill: false,
            borderColor: "#959B6D",
            tension: 0.4
          }
        ]
      },
      testChartData: {
        labels: ["10", "20", "30", "40", "50", "60", "70", "80"],
        datasets: [
          {
            label: 'Min',
            data: [100, 100, 100, 50, 0],
            fill: false,
            borderColor: "#DAA7C5",
            tension: 0.4
          },
          {
            label: 'Middle',
            data: [, , 0, 50, 100, 50, 0],
            fill: false,
            borderColor: "#FDB152",
            tension: 0.4
          },
          {
            label: 'Max',
            data: [, , , ,0, 50, 100, 100, 100],
            fill: false,
            borderColor: "#959B6D",
            tension: 0.4
          }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: "black"
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "black"
            },
            grid: {
              color: "#8D8D8D"
            }
          },
          y: {
            ticks: {
              color: "black"
            },
            grid: {
              color: "#8D8D8D"
            }
          }
        }
      },
      OMin:'',
      OMid:'',
      OMax:'',
      SMin:'',
      SMid:'',
      SMax:'',
      TMin:'',
      TMid:'',
      TMax:'',
      low:{ temp: 0, conclusion: 0 },
      middle:{ temp: 0, conclusion: 0 },
      height:{ temp: 0, conclusion: 0 },
      sample1:'',
      sample2:'',
      sample3:'',
      reward:''
    }

  },
  computed:{
    ...mapState({
      OARDataSets: state=>state.score.OARChartData.datasets,
      OARDataParam: state=>state.score.OARChartData.param,
    }),
  },
  methods:{
    getResult(){
      // console.log(this.OARDataParam.min, this.OARDataParam.mid, this.OARDataParam.max);

       [this.OMin, this.OMid, this.OMax] = fuzzification(this.olimpValue, this.OARDataParam.min, this.OARDataParam.mid, this.OARDataParam.max);
       // [this.OMin, this.OMid, this.OMax] = fuzzification(this.olimpValue, 100, 150, 200);
       [this.SMin, this.SMid, this.SMax] = fuzzification(this.studyValue, 30, 50, 70);
       [this.TMin, this.TMid, this.TMax] = fuzzification(this.testValue, 30, 50, 70);

      andRules(this.OMin, this.SMin, this.TMin, this.low);
      andRules(this.OMin, this.SMin, this.TMid, this.low);
      andRules(this.OMin, this.SMid, this.TMin, this.low);
      andRules(this.OMin, this.SMid, this.TMid, this.middle);
      andRules(this.OMin, this.SMid, this.TMax, this.middle);
      andRules(this.OMin, this.SMax, this.TMin, this.middle);
      andRules(this.OMin, this.SMax, this.TMid, this.middle);
      andRules(this.OMin, this.SMax, this.TMax, this.middle);

      andRules(this.OMid, this.SMin, this.TMin, this.middle);
      andRules(this.OMid, this.SMid, this.TMid, this.middle);
      andRules(this.OMid, this.SMax, this.TMid, this.height);
      andRules(this.OMax, this.SMin, this.TMin, this.middle);
      andRules(this.OMax, this.SMid, this.TMid, this.height);
      andRules(this.OMax, this.SMax, this.TMax, this.height);
      // andRules(this.OMin, this.SMin,  this.low);
      // andRules(this.OMin, this.SMid,  this.low);
      // andRules(this.OMin, this.SMax,  this.middle);
      // andRules(this.OMid, this.SMin,  this.middle);
      // andRules(this.OMid, this.SMid, this.middle);
      // andRules(this.OMid, this.SMax, this.height);
      // andRules(this.OMax, this.SMin,  this.middle);
      // andRules(this.OMax, this.SMid,  this.height);
      // andRules(this.OMax, this.SMax,  this.height);

      [this.sample1, this.sample2, this.sample3] = determineSample(0, 25, 75, 100);

       this.reward = defuzzification(
          this.low.conclusion,
          this.middle.conclusion,
          this.height.conclusion,
          this.sample1,
          this.sample2,
          this.sample3
      );
    },
    openModal(modalType){
      switch (modalType){
        case 'Mamdani':
          this.rulesModal=true;
          break;
        case 'OAR':
          this.scoreModal=true;
          break;
        case 'Result':
          this.resultModal = true;
          break;
      }
    }
  },
  created() {
  }
}
</script>
<template>
  <div class="reportItem">
    <div class = "card">
      <OrganizationChart :value = "data">
        <template #default="slotProps">
          <span class="treeItem"
                @click=openModal(slotProps.node.id)

          >{{slotProps.node.label}}</span>
        </template>
      </OrganizationChart>
    </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<!--    <Button class="addStudentBtn" label="Добавить студента" @click="scoreModel=true"/>-->
    <h1>Общий академический рейтинг</h1>
    <div class="card">
      <Chart type="line" :data="olimpChartData" :options="chartOptions" class="h-30rem"/>
    </div>
    <h1>Рейтинг общественной деятельности/Научно исследовательский рейтинг</h1>
    <div class="card">
      <Chart type="line" :data="studyChartData" :options="chartOptions" class="h-30rem"/>
    </div>
    <form class="inputFormGroup">
      <span class="p-float-label">
                <InputText id="value" v-model="olimpValue" type="text" :class="{ 'p-invalid': errorMessage }"
                           aria-describedby="text-error"/>
                <label for="value">Общий академический рейтинг</label>
      </span>

      <span class="p-float-label">
                <InputText id="value" v-model="studyValue" type="text" :class="{ 'p-invalid': errorMessage }"
                           aria-describedby="text-error"/>
                <label for="value">Рейтинг общ деятельности</label>
      </span>

      <span class="p-float-label">
                <InputText id="value" v-model="testValue" type="text" :class="{ 'p-invalid': errorMessage }"
                           aria-describedby="text-error"/>
                <label for="value">Научно иссл рейтинг</label>
      </span>

      <Button @click="getResult">Рассчитать</Button>
    </form>
    <div>
      {{OMin}}
      {{OMid}}
      {{OMax}}
      {{SMin}}
      {{SMid}}
      {{SMax}}
      {{TMin}}
      {{TMid}}
      {{TMax}}
    </div>
    <h1>Result: {{reward}}</h1>
    <Dialog v-model:visible="scoreModal"  @close="scoreModal=false" modal header="Редактор переменных" :style="{ width: '75vw' }">
      <Score/>
    </Dialog>
    <Dialog v-model:visible="rulesModal"  @close="rulesModal=false" modal header="Редактор правил" :style="{ width: '95vw' }">
      <Rules/>
    </Dialog>
    <Dialog v-model:visible="resultModal"  @close="resultModal=false" modal header="Резултат" :style="{ width: '75vw' }">
      <Result/>
    </Dialog>
  </div>
</template>
<style>
.reportItem{
  margin: 30px 0
}
.inputFormGroup{
  display: flex;
  gap:20px;
  margin:40px 0
}
.card{
  padding:50px
}
.card tr{
  height: 0;
}
</style>