<template>
    <v-app>
        <VHeader></VHeader>
        <v-container fluid>
            <v-layout row wrap align-center>
                <v-flex xs4 offset-xs2>
                    <v-select
                            :items="states"
                            menu-props="auto"
                            label="Type de Questions"
                            prepend-icon="help"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import VHeader from "./VHeader";
    export default {
        name: "AddQuestion",
        components: {VHeader},
        data: function(){
            return {
                states: [
                    'Questions Uniques', 'Questions Multiples', 'Questions Ouvertes'
                ]
            }
        }
    }
</script>

<style scoped>

</style>