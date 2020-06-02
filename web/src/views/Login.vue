<template>
    <div>
        <LoginForm/>
    </div>
</template>

<script>
    import LoginForm from "../components/LoginForm";

    export default {
        components: {LoginForm},
        created() {
            if (this.$store.getters.isLogged)
                this.$router.push('/');
        }
    }
</script>
