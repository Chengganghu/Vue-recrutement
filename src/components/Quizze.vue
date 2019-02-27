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
                        <v-layout>
                            <v-flex xs8 offset-xs2>
                                <v-card>
                                    <v-card-title  class="font-weight-light font-italic display-2" >Ajouter une question</v-card-title>
                                    <v-container fluid>
                                        <v-layout row wrap align-center>
                                            <v-flex xs6 >
                                                <v-select
                                                        :items="states"
                                                        menu-props="auto"
                                                        label="Type de Questions"
                                                        prepend-icon="help"
                                                        @change="logger"
                                                        v-model="question_type"
                                                ></v-select>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <v-combobox
                                                        prepend-icon="build"
                                                        v-model="select"
                                                        :items="items"
                                                        label="Choisir le tag pour cette question"
                                                        multiple
                                                        chips

                                                >
                                                    <template
                                                            slot="selection"
                                                            slot-scope="data"
                                                    >
                                                        <v-chip
                                                                :key="JSON.stringify(data.item)"
                                                                :selected="data.selected"
                                                                :disabled="data.disabled"
                                                                class="v-chip--select-multi"
                                                                @input="data.parent.selectItem(data.item)"
                                                        >
                                                            <v-avatar
                                                                    class="accent white--text"
                                                                    v-text="data.item.slice(0, 1).toUpperCase()"
                                                            ></v-avatar>
                                                            {{ data.item }}
                                                        </v-chip>
                                                    </template>
                                                </v-combobox>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs10>
                                                <v-textarea
                                                        name="description"
                                                        box
                                                        label="Description de la Question"
                                                        auto-grow
                                                        clearable
                                                        v-model="ques_description"
                                                ></v-textarea>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-if="isOuverte">
                                            <v-flex xs10>
                                                <v-textarea
                                                        name="reponse"
                                                        box
                                                        label="Réponse standard"
                                                        auto-grow
                                                        clearable
                                                        v-model="answerDes"
                                                ></v-textarea>
                                            </v-flex>
                                        </v-layout>
                                    </v-container >
                                    <v-container v-if="isUnique">
                                        <v-layout v-for="n in bonneOptionsNumber">
                                            <v-flex xs10>
                                                <v-text-field
                                                        clearable
                                                        label= "Bonne Option"
                                                        ref="bonne_option"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs2>
                                                <v-btn @click="mauvaisOptionsNumber++" flat color="blue darken-3">add </v-btn>
                                            </v-flex>
                                            <v-flex offest-xs1>
                                                <v-btn @click="removeMauvais" flat color="blue darken-3">remove</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-for="n in mauvaisOptionsNumber" >
                                            <v-flex xs10>
                                                <v-text-field
                                                        clearable
                                                        label= "Mauvais Option"
                                                        ref="mauvais_option"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-container v-if="isMultiple">
                                        <v-layout >
                                            <v-flex xs2>
                                                <v-btn @click="bonneOptionsNumber++" flat color="blue darken-3">add </v-btn>
                                            </v-flex>
                                            <v-flex offest-xs1>
                                                <v-btn @click="removeBonne" flat color="blue darken-3">remove </v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-for="n in bonneOptionsNumber" >
                                            <v-flex xs10>
                                                <v-text-field
                                                        clearable
                                                        label= "Bonne Option"
                                                        ref="bonne_option"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs2>
                                                <v-btn @click="mauvaisOptionsNumber++" flat color="blue darken-3">add </v-btn>
                                            </v-flex>
                                            <v-flex offest-xs1>
                                                <v-btn @click="removeMauvais" flat color="blue darken-3">remove </v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout v-for="n in mauvaisOptionsNumber" >
                                            <v-flex xs10>
                                                <v-text-field
                                                        clearable
                                                        label= "Mauvais Option"
                                                        ref="mauvais_option"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-container>
                                        <v-layout>
                                            <v-btn @click="submit">
                                                submit
                                            </v-btn>
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
                    <inscription></inscription>
                </v-tab-item>
                <v-tab-item
                        :key="3"
                        :value="'mobile-tabs-5-3'"
                >
                    <h1>
                        générer le quizze
                    </h1>
                    <Login></Login>
                    <h2>
                        this is a tltle
                    </h2>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import Inscription from "./Inscription";
    import Login from "./Login";
    export default {
        name: "Quizze",
        components: {Login, Inscription},
        data () {
            return {
                tabs:null,
                states: [
                    'Questions Uniques', 'Questions Multiples', 'Questions Ouvertes'
                ],
                type:null,
                bonneOptionsNumber:1,
                mauvaisOptionsNumber:1,
                bonneOptions:[],
                mauvaisOptions:[],
                select: ['Spring', 'Vue'],
                items: [
                    'Spring',
                    'Vue',
                    'Angular',
                    'Linux'
                ],
                answerDes:null,
                question_type:'',
                ques_description:''
            }
        },
        methods:{
            logger(a){
                this.type = a
                this.bonneOptionsNumber = 1
                this.mauvaisOptionsNumber = 1
            },
            removeBonne(){
                if(this.bonneOptionsNumber <=1)
                    alert("Au monis d'une ")
                else
                    this.bonneOptionsNumber--
            },
            removeMauvais(){
                if(this.mauvaisOptionsNumber <=1)
                    alert("Au moins d'une")
                else this.mauvaisOptionsNumber--
            },
            submit(){
                let data = new Object()
                data.taglist=[]
                for(let i=0; i<this.select.length; i++){
                    data.taglist.push({name:this.select[i]})
                }
                if(this.question_type == "Questions Uniques")
                    data.questionTypt = "UNIQUE"
                else if(this.question_type == "Questions Multiples")
                    data.questionType = "MULTIPLE"
                else data.questionType = "OUVERTE"

                data.description = this.ques_description
                let tmpList=[]
                let bonne_ops = this.$refs.bonne_option
                let mauvais_ops = this.$refs.mauvais_option
                for(let i=0;i<this.bonneOptionsNumber;i++){
                    this.bonneOptions.push(bonne_ops[i].lazyValue)
                    tmpList.push({rightAns:true,description:bonne_ops[i].lazyValue})
                }
                for(let i=0;i<this.mauvaisOptionsNumber;i++){
                    this.mauvaisOptions.push(mauvais_ops[i].lazyValue)
                    tmpList.push({rightAns:false,description:mauvais_ops[i].lazyValue})
                }
                data.choixAnswer = new Object()
                data.choixAnswer.choixList = tmpList


                axios.post("http://localhost:8090/jersey/question/questions",data
                    // {
                    //     headers:{
                    //         Authorization:"Token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHUifQ.qcBqvAVrmKqQBpftM-KDOMxcKbGXsC93KUIFqs4E65M",
                    //     }
                    // }
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
            },

        }
    }
</script>

<style scoped>

</style>