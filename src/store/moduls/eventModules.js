import axios from "axios";

export const events = {
    state: () => {
        return {
            events: ''
        }
    },
    mutations: {
        getEvents(state, payload) {
            state.events=payload;
        }
    },
    actions: {
        async getEvents({commit}) {
            await axios.get('http://localhost:8876/api/v1/events')
                .then(resp=>commit('getEvents', resp.data))
        }
    }
}