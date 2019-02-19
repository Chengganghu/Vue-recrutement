<template>
    <v-app light>
        <div>
            <v-toolbar tabs>
                <v-toolbar-side-icon></v-toolbar-side-icon>

                <v-toolbar-title >Gestion des quizzes</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>

                <v-tabs
                        slot="extension"
                        v-model="tabs"
                        fixed-tabs
                        color="transparent"
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1" class="primary--text">
                        <v-icon>mdi-folder-plus</v-icon>
                    </v-tab>

                    <v-tab href="#mobile-tabs-5-2" class="primary--text">
                        <v-icon>mdi-database</v-icon>
                    </v-tab>

                    <v-tab href="#mobile-tabs-5-3" class="primary--text">
                        <v-icon>mdi-share</v-icon>
                    </v-tab>
                </v-tabs>
            </v-toolbar>

            <v-tabs-items v-model="tabs" class="white elevation-1">
                <v-tab-item
                        :key="1"
                        :value="'mobile-tabs-5-1'"
                >
                    <v-container>
                        <v-layout >
                            <v-flex xs12>
                                <v-card >
                                    <v-card-title  class="font-weight-light font-italic display-2" >Ajouter une question</v-card-title>
                                    <v-container fluid>
                                        <v-layout row wrap align-center>
                                            <v-flex xs4 >
                                                <v-select
                                                        :items="states"
                                                        menu-props="auto"
                                                        label="Type de Questions"
                                                        prepend-icon="help"
                                                        @change="logger"
                                                ></v-select>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <v-textarea
                                                        name="description"
                                                        box
                                                        label="Description de la Question"
                                                        auto-grow
                                                ></v-textarea>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-if="isOuverte">
                                            <v-flex xs6>
                                                <v-textarea
                                                        name="reponse"
                                                        box
                                                        label="Réponse standard"
                                                        auto-grow
                                                ></v-textarea>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-for="(item,index) in bonneOptionsTags" >
                                            <v-flex xs6>
                                                <v-text-field
                                                        clearable
                                                        label= "Bonne Option"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex>
                                                <v-btn icon @click="removeBonneOption(index)">
                                                    <v-icon>mdi-close-box</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex >
                                                <v-btn @click="addBonneOption">add une bonne option</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs5>
                                                <v-text-field
                                                        clearable
                                                        label="Mauvais option"
                                                >

                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-tab-item>
                <v-tab-item
                        :key="2"
                        :value="'mobile-tabs-5-2'"
                >
                    <h1>
                        liste des questions
                    </h1>
                </v-tab-item>
                <v-tab-item
                        :key="3"
                        :value="'mobile-tabs-5-3'"
                >
                    <h1>
                        générer le quizze
                    </h1>
                    <h2>
                        this is a tltle
                    </h2>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "Quizze",
        data () {
            return {
                tabs:null,
                states: [
                    'Questions Uniques', 'Questions Multiples', 'Questions Ouvertes'
                ],
                type:null,
                bonneOptionsId:0,
                mauvaisOptionsId:0,
                bonneOptions:[],
                mauvaisOptions:[],
                bonneOptionsTags:[],
                mauvaisOptionsTags:[]
            }
        },
        methods:{
            logger(a){
                this.type = a
            },
            addBonneOption(){
                this.bonneOptionsTags.push({id:"bonne option "+this.bonneOptionsId++})
            },
            removeBonneOption(index){
                this.bonneOptionsTags.splice(index,1)
            }
        },
        computed:{
            isUnique(){
                return this.type == 'Questions Uniques'
            },
            isMultiple(){
                return this.type == 'Questions Multiples'
            },
            isOuverte(){
                return this.type == 'Questions Ouvertes'
            }
        }
    }
</script>

<style scoped>

</style>