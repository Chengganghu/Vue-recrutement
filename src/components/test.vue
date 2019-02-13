<template>
    <div>
        test page
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
        </p>
    </div>
</template>

<script>
    import Vuex from "vuex";

    const store = new Vuex.Store({
        state:{
            count:0
        },
        mutations:{
            increment(state){
                state.count++
            }
        }
    })
    export default {
        name: "test",
        computed: {
            count () {
                return store.state.count
            }
        },
        methods: {
            increment() {
                store.commit('increment')
            },
        }
    }
</script>

<style scoped>

</style>