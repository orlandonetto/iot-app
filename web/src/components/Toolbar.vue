<template>
    <div>
        <q-toolbar>
            <q-toolbar-title>Main</q-toolbar-title>
            <q-btn color="accent" round icon="exit_to_app" @click="logout">
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
            }
        }
    }
</script>
