<template>
    <q-layout class="column items-center justify-center bg-primary">
        <div class="q-mt-sm col-10 col-sm-8 col-md-4">
            <q-card flat class="column items-center bg-white q-pa-md full-width">
                <q-card-section class="text-h6">Iot Manager</q-card-section>

                <div class="row full-width justify-center text-white">
                    <q-btn @click="login" class="q-ma-xs" style="color: #252c39;">Login</q-btn>
                    <q-btn @click="register" class="q-ma-xs" style="color: #252c39;">Register</q-btn>
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
