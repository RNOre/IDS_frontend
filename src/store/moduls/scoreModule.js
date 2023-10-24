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
                param:{
                    min:100,
                    mid:150,
                    max:200
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
        }
    },
    actions: {
        setOARChartData({commit}, payload) {
            commit('setOARChartData', payload);
        },
        setDataSets({commit}, payload) {
            commit('setDataSets', payload)
        }
    },
    getters: {
        getStudentsDataSets(state) {
            return state.OARChartData.datasets;
        }
    }
}