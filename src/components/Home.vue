<template>
    <v-app>
        <div>
            i am home
            <v-btn @click="logout">touser</v-btn>
            <v-alert
                    :value="true"
                    color="success"
                    icon="check_circle"
                    outline
            >
                This is a success alert.
            </v-alert>
        </div>
        <div>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs12 >
                        <v-stepper v-model="el">
                            <v-stepper-header>
                                <v-stepper-step :complete="el > 1" step="1">Inscription</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="el > 2" step="2">Quizze</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="el > 3" step="3">Entretien</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="el > 4" step="4">Recrute</v-stepper-step>
                            </v-stepper-header>
                        </v-stepper>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-app>

</template>

<script>
    export default {
        name: "Home",
        data: function(){
          return {
            el: 2
          }
        },
        methods:{
            logout(){
                localStorage.removeItem('user-token')
                localStorage.removeItem('user')
                this.$router.push('/')
            },

        },
        computed:{

        }
    }
</script>

<style scoped>

</style>