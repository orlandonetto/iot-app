<template>

    <div class="q-pa-md">
        <q-dialog v-model="deleting" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="primary" text-color="white"/>
                    <span class="q-ml-sm">delete this component [<b>Id:</b> {{selectedId}}]</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup @click="cancelDelete"/>
                    <q-btn flat label="Confirm" color="primary" v-close-popup @click="sendDelete"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-btn
                class="q-mb-sm"
                color="accent"
                icon="add"
                size="9px"
                round
                @click="create">
            <q-tooltip content-class="bg-accent">Create new Component</q-tooltip>
        </q-btn>
        <q-table
                row-key="id"
                title="Components"
                :data="components"
                :columns="columns"
                @row-dblclick="update">

            <template slot="body-cell-options" slot-scope="props">
                <q-btn
                        class="q-mt-sm q-mr-sm"
                        icon="delete"
                        @click="confirmDelete(props.row.id)"
                        color="accent"
                        size="10px"
                        round>
                    <q-tooltip content-class="bg-accent">Delete Component</q-tooltip>
                </q-btn>
                <q-btn
                        class="q-mt-sm q-mr-sm"
                        icon="arrow_right_alt"
                        @click="update(null, props.row)"
                        color="accent"
                        size="10px"
                        round>
                    <q-tooltip content-class="bg-accent">Visualize Component</q-tooltip>
                </q-btn>
            </template>
        </q-table>
    </div>
</template>

<script>
    const componentService = require('../services/ComponentService');

    export default {
        data() {
            return {
                interval: null,
                deleting: false,
                selectedId: '-',
                columns: [
                    {name: 'id', label: 'id', field: 'id', align: 'center', sortable: false},
                    {name: 'name', label: 'name', field: 'name', align: 'center', sortable: true},
                    {name: 'analogData', label: 'analogData', field: 'analogData', align: 'center', sortable: true},
                    {name: 'digitalData', label: 'digitalData', field: 'digitalData', align: 'center', sortable: true},
                    {name: 'options', label: '', field: 'options', align: 'center', sortable: false},
                ],
                components: [],
            }
        },
        created() {
            this.interval = setInterval(() => this.getComponentData(), 1000);
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods: {
            getComponentData() {
                componentService.get()
                    .then(res => {
                        this.components = res.map(e => {
                            return {id: e._id, name: e.name, analogData: e.analogData, digitalData: e.digitalData}
                        });
                    })
                    .catch(err => alert(err));
            },
            update(ev, row) {
                this.$router.push('/component/update?id=' + row.id);
            },
            getWidth() {
                return this.$q.screen.lt.md ? 'width: 300px;' : 'width: 400px'
            },
            create() {
                this.$router.push("/component/create");
            },
            confirmDelete(id) {
                this.selectedId = id;
                this.deleting = true;
            },
            cancelDelete() {
                this.selectedId = '-';
                this.deleting = false;
            },
            sendDelete() {
                componentService.delete(this.selectedId);

                this.selectedId = '-';
                this.deleting = false;
            }
        }
    }
</script>
