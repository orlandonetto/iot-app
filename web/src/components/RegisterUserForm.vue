<template>
    <q-layout class="bg-primary column items-center justify-center q-pa-md">
        <div class="row full-width justify-center">
            <div class="col-10 col-sm-8 col-md-4">
                <q-card class="column items-center bg-white q-pa-md full-width">
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
                        Sign up
                    </q-card-section>
                    <q-form @submit="register" class="full-width" autofocus>
                        <!--username-->
                        <q-input
                                filled
                                v-model="user.username"
                                label="Username"
                                color="green"
                                type="email"
                                @keydown.space.prevent
                                lazy-rules
                                :rules="[
                                    val => (val && val.length > 0) || 'Required Field!',
                                    val => /.+@.+\..+/.test(val) || 'Is not a valid email.'
                                ]"
                        />

                        <!--password-->
                        <q-input
                                filled
                                v-model="user.password"
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

                        <!--first name-->
                        <q-input
                                filled
                                v-model="user.firstName"
                                label="First Name"
                                color="green"
                                mask="Aaaaaaaaaaaaaaaaaaaaaa"
                                lazy-rules
                                :rules="[val => (val && val.length > 0) || 'Required Field!']"
                                @keydown.space.prevent
                        />

                        <!--last name-->
                        <q-input
                                filled
                                v-model="user.lastName"
                                label="Last Name"
                                color="green"
                                mask="Aaaaaaaaaaaaaaaaaaaaaa"
                                lazy-rules
                                :rules="[val => (val && val.length > 0) || 'Required Field!']"
                                @keydown.space.prevent
                        />
                        <div class="row full-width">
                            <q-btn label="Register" type="submit" class="full-width" color="green"
                                   :style="{marginTop: '5px'}"/>
                        </div>
                    </q-form>
                </q-card>
            </div>
        </div>

    </q-layout>
</template>

<script>
    const userService = require('../services/UserService');

    export default {
        data() {
            return {
                isPassword: true,
                isPasswordConfirm: true,
                passwordConfirm: '',
                user: {
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                }
            }
        },
        methods: {
            register() {
                userService.register(this.user)
                    .then((data) => {
                        const {message} = data;
                        alert(message);

                        this.$router.push('/');
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
