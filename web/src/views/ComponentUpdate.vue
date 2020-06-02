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
                Component
            </q-card-section>
            <q-list bordered dense separator>
                <q-item>
                    <b>id:</b>
                    {{id}}
                </q-item>
                <q-item class="row items-center">
                    <b>Status</b>
                    <q-toggle
                            v-model="digitalData"
                            color="green"
                            keep-color
                            @input="updateStatus"/>
                </q-item>

                <q-item class="row items-center">
                    <b class="q-mr-md">Intensity</b>
                    <q-slider v-model="analogData" :min="0" :max="100" @change="updateIntensity"/>
                </q-item>

                <q-item>
                    <q-input
                            :readonly="!editingName"
                            :borderless="!editingName"
                            maxlength="30"
                            v-model="name"
                            label="Name"
                            color="green"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'Required Field!']"
                            @keydown.enter="updateName"
                    >
                        <template v-slot:append>
                            <q-icon name="edit" @click="edit" class="cursor-pointer"/>
                        </template>
                    </q-input>
                </q-item>

            </q-list>
        </q-card>
    </q-layout>
</template>

<script>
    const componentService = require('../services/ComponentService');

    export default {
        data() {
            return {
                interval: null,
                id: '',
                name: '',
                originalName: '',
                analogData: 0,
                digitalData: false,
                editingName: false,
            }
        },
        created() {
            const id = this.$route.query.id;
            this.interval = setInterval(() => this.getData(id), 1000);
        },
        destroyed() {
            clearInterval(this.interval)
        },
        methods: {
            getData(id) {
                componentService.get()
                    .then(res => {
                        const component = res.filter(e => e._id === id);

                        if (component.length < 1)
                            return this.$router.push("/component")

                        this.id = component[0]._id;

                        if (!this.editingName)
                            this.name = component[0].name;

                        this.analogData = Number(component[0].analogData);
                        this.digitalData = component[0].digitalData === 1;

                        this.originalName = this.name;
                    })
                    .catch(err => console.log(err));
            },
            updateStatus() {
                const data = {
                    id: this.id,
                    digitalData: this.digitalData ? 1 : 0
                };
                componentService.update(data);
            },
            updateIntensity() {
                const data = {
                    id: this.id,
                    analogData: this.analogData
                };
                componentService.update(data);
            },
            updateName() {
                const data = {
                    id: this.id,
                    name: this.name
                };
                componentService.update(data)
                    .then(() => {
                        this.editingName = false;
                        this.originalName = this.name;
                    })
                    .catch(() => {
                        this.editingName = true;
                        this.name = this.originalName;
                    });
            },
            edit() {
                this.editingName = !this.editingName;
            },
            getWidth() {
                return this.$q.screen.lt.md ? 'width: 300px;' : 'width: 400px'
            },
            back() {
                this.$router.push("/main");
            },
        }
    }
</script>
