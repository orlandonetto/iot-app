<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import store from "./store";

    const authService = require('./services/AuthService');

    export default {
        components: {},
        data() {
            return {
                interval: null
            }
        },
        async created() {
            // Authorization Header
            this.axios.defaults.headers.common['Authorization'] = store.state.token;

            // Check if authenticated
            this.axios.interceptors.response.use((res) => responseSuccess(res), (error) => responseFailed(error));

            const responseSuccess = (res) => Promise.resolve(res);
            const responseFailed = (error) => {
                console.log(error.response.status)
                if (error.response.status === 403) {
                    this.$store.dispatch('logout');
                    this.$router.push('/');
                }

                return Promise.reject(error);
            }

            setInterval(this.checkLogged, 5000);
        },
        methods: {
            checkLogged() {
                const isLogged = this.$store.getters.isLogged;

                if (isLogged && this.interval == null)
                    return this.start();

                if (!isLogged && this.interval != null)
                    return this.stop();
            },
            start() {
                this.isLogged = true;
                this.interval = setInterval(this.update, 5000);
            },
            stop() {
                this.isLogged = false;
                clearInterval(this.interval);
            },
            update() {
                authService
                    .loadSession()
                    .then(({token, user}) => this.$store.dispatch('loadSession', {token, user}))
                    .catch(err => console.log(err));
            }
        }
    }
</script>
