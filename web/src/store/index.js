import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const defaultState = () => {
    return {
        token: '',
        user: {}
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: defaultState(),
    getters: {
        isLogged: ({token, user}) => !!token && _.isEmpty(user) === false,
        user: ({user}) => user
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        RESET(state) {
            Object.assign(state, defaultState());
        }
    },
    actions: {
        login({commit, dispatch}, {token, user}) {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);

            Axios.defaults.headers.common['Authorization'] = token;
        },
        loadSession({commit, dispatch}, {token, user}) {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);

            Axios.defaults.headers.common['Authorization'] = token;
        },
        logout: ({commit}) => {
            commit('RESET', '');
        },
    },
})
