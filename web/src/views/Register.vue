<template>
    <q-layout view="hHh LpR fFf">
        <q-page-container>
            <RegisterUserForm/>
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
        </q-footer>
    </q-layout>
</template>

<script>
    import RegisterUserForm from "../components/RegisterUserForm";

    export default {
        components: {RegisterUserForm},
    }

</script>
