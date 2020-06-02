<template>
    <div>
        <q-layout view="hHh LpR fFf">
            <q-header elevated class="bg-primary text-white" height-hint="98">
                <Toolbar/>
            </q-header>
            <q-page-container class="column items-center">
                <ComponentGet/>
            </q-page-container>
            <q-footer elevated class="bg-grey-8 text-white">
                <!--<q-toolbar/>-->
            </q-footer>
        </q-layout>
    </div>
</template>

<script>
    import Toolbar from "../components/Toolbar";
    import ComponentGet from "../views/ComponentGet";

    export default {
        components: {Toolbar, ComponentGet},

        data() {
            return {
                interval: null,
                user: {
                    id: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                }
            }
        },
        created() {
            this.interval = setInterval(() => this.getUserData(), 1000);
        },
        destroyed() {
            clearInterval(this.interval);
        },
        methods: {
            getUserData() {
                const {_id, username, firstName, lastName} = this.$store.getters.user;

                if (_id !== this.user.id)
                    this.user.id = _id;

                if (username !== this.user.username)
                    this.user.username = username;

                if (username !== this.user.firstName)
                    this.user.firstName = firstName;

                if (username !== this.user.lastName)
                    this.user.lastName = lastName;
            },
        },
    }
</script>
