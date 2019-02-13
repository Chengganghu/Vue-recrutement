<template>
    <div>
        i am home
        <v-btn @click="logout">touser</v-btn>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            logout(){
                localStorage.removeItem('user-token')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>