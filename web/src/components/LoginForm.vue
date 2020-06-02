<template>
    <q-layout class="bg-primary column justify-center items-center q-pa-md">

        <q-card class="column items-center bg-white q-pa-md" :style="getWidth()">
            <q-card-section class="full-width text-h6 text-center">
                <q-btn
                        style="position: absolute; left: 0"
                        color="accent"
                        icon="keyboard_arrow_left"
                        size="9px"
                        round
                        @click="back">
                    <q-tooltip content-class="bg-accent">Back to home</q-tooltip>
                </q-btn>
                Sign in
            </q-card-section>
            <!-- Form Login -->
            <q-form @submit="login" class="full-width" autofocus>
                <!--username-->
                <q-input
                        filled
                        v-model="username"
                        label="Username"
                        color="green"
                        lazy-rules
                        :rules="[
                            val => (val && val.length > 0) || 'Required Field!',
                            val => /.+@.+\..+/.test(val) || 'Is not a valid email.'
                        ]"
                />
                <!--password-->
                <q-input
                        filled
                        v-model="password"
                        :type="isPassword ? 'password' : 'text'"
                        label="Password"
                        color="green"
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Required Field!']"
                        :style="{marginTop: '5px'}"
                >
                    <template v-slot:append>
                        <q-icon
                                :name="isPassword ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassword = !isPassword"
                        />
                    </template>
                </q-input>

                <div class="row full-width">
                    <q-btn label="Login" type="submit" class="full-width" color="green" :style="{marginTop: '5px'}"/>
                </div>
            </q-form>
        </q-card>
    </q-layout>
</template>

<script>
    const authService = require('../services/AuthService');

    export default {
        data() {
            return {
                isPassword: true,
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                const credentials = {
                    username: this.username,
                    password: this.password
                };

                authService.authenticate(credentials)
                    .then((data) => {
                        const {token, user} = data;

                        this.$store.dispatch('login', {token, user});
                        this.$router.push('/main');
                    })
                    .catch(rej => {
                        alert(rej)
                    })
            },
            getWidth() {
                return this.$q.screen.lt.md ? 'width: 300px;' : 'width: 400px'
            },
            back() {
                this.$router.push("/");
            }
        }
    }
</script>
