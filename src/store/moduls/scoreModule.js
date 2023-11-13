import axios from "axios";

export const score = {
    state: () => {
        return {
            OARChartData: {
                labels: ["50", "100", "150", "200", "250", "300", "350", "400"],
                datasets: {
                    low: [100, 100, 0],
                    middle: [, 0, 100, 0],
                    height: [, , 0, 100, 100, 100, 100, 100],
                },
                param: {
                    min: 100,
                    mid: 150,
                    max: 200
                }
            },
            RODChartData: {
                labels: '',
                datasets: ''
            },
            NIRChartData: {
                labels: '',
                datasets: ''
            },
            studentsScore: []
        }
    },
    mutations: {
        setOARChartData(state, payload) {
            state.OARChartData.labels = payload;
        },
        setRODChartData(state, payload) {
            state.RODChartData = payload;
        },
        setNIRChartData(state, payload) {
            state.students = payload;
        },
        setDataSets(state, payload) {
            state.OARChartData.datasets = payload;
        },
        setStudentsScore(state, payload) {
            state.studentsScore = payload
        }
    },
    actions: {
        setOARChartData({commit}, payload) {
            commit('setOARChartData', payload);
        },
        setDataSets({commit}, payload) {
            commit('setDataSets', payload)
        },
        async getStudentsScores({commit}) {
            await axios.get('http://localhost:8876/api/v1/test')
                .then(resp => commit('setStudentsScore', resp.data))
        }
    },
    getters: {
        getStudentsDataSets(state) {
            return state.OARChartData.datasets;
        }
    }
}