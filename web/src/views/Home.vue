<template>
    <q-layout class="column items-center justify-center bg-primary">
        <div class="q-mt-sm col-10 col-sm-8 col-md-4">
            <q-card flat class="column items-center bg-white q-pa-md full-width">
                <q-card-section class="text-h6">Authentication Manager</q-card-section>

                <div class="row full-width justify-center text-white">
                    <q-btn @click="login" class="bg-accent q-ma-xs">Login</q-btn>
                    <q-btn @click="register" class="bg-accent q-ma-xs">Register</q-btn>
                </div>

            </q-card>
        </div>
    </q-layout>
</template>

<script>
    export default {
        components: {},
        methods: {
            login() {
                this.$router.push("/login");
            },
            register() {
                this.$router.push("/register");
            }
        }
    }
</script>
