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
                    <q-tooltip content-class="bg-accent">Back to main</q-tooltip>
                </q-btn>
                Create Component
            </q-card-section>

            <q-form @submit="create" class="full-width" autofocus>
                <q-input
                        filled
                        v-model="name"
                        label="Name"
                        color="green"
                        lazy-rules
                        :rules="[
                            val => (val && val.length > 0) || 'Required Field!'
                        ]"
                />
                <div class="row full-width">
                    <q-btn label="Create" type="submit" class="full-width" color="green" :style="{marginTop: '5px'}"/>
                </div>
            </q-form>
        </q-card>
    </q-layout>
</template>

<script>
    const componentService = require('../services/ComponentService');

    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            create() {
                componentService.create({name: this.name})
                    .then((res) => {
                        alert(res.message);

                        this.clean();
                        this.$router.push('/main')
                    })
                    .catch(rej => {
                        alert(rej)
                    })
            },
            clean() {
                this.name = '';
            },
            getWidth() {
                return this.$q.screen.lt.md ? 'width: 300px;' : 'width: 400px'
            },
            back() {
                this.$router.push("/main");
            }
        }
    }
</script>
