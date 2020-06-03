<template>
    <div>
        <q-toolbar class="bg-accent">
            <q-toolbar-title class="row">
                <q-item clickable @click="toMain">
                    <q-avatar>
                        <q-img src="https://storage.cloud.google.com/b500/Logo_Blugon.png"/>
                    </q-avatar>
                    <b class="column q-ml-md justify-center text-cyan-5">Blugon</b>
                </q-item>
                <q-separator class="q-ml-sm" color="white" vertical/>
                <span class="column q-ml-md justify-center">IOT Manager</span>
            </q-toolbar-title>

            <q-btn class="q-mr-sm" color="orange" round dense icon="library_books"
                   @click="openDocumentation">
                <q-tooltip content-class="bg-accent">Documentation</q-tooltip>
            </q-btn>

            <q-btn color="dark" round dense icon="exit_to_app" @click="logout">
                <q-tooltip content-class="bg-accent">Sign out</q-tooltip>
            </q-btn>
        </q-toolbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
            toMain() {
                this.$router.push("/main");
            },
            openDocumentation() {
                window.open('https://documenter.getpostman.com/view/6407543/SztG46o9?version=latest', '_blank');
            }
        }
    }
</script>
