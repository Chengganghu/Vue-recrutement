<template>
    <v-app>
        <v-container>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-card>
                        <v-card-title  class="font-weight-light font-italic display-2" >Liste des questions</v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex xs6>
                                    <v-select
                                            :items="states"
                                            menu-props="auto"
                                            label="Type de Questions"
                                            prepend-icon="help"
                                            v-model="question_type"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs6>
                                    <v-combobox
                                            prepend-icon="search"
                                            v-model="select"
                                            :items="question_tags"
                                            label="Filtrer les questions par Tag"
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
                                <v-flex>
                                    <v-card>

                                        <div class="d-flex justify-between align-center mb-3">
                                            <v-btn @click="all">all</v-btn>
                                            <v-btn @click="none">none</v-btn>
                                        </div>

                                        <v-expansion-panel
                                                v-model="panel"
                                                expand
                                        >
                                            <v-expansion-panel-content
                                                    v-for="(item,i) in selected_ques_final"
                                                    :key="i"
                                            >
                                                <div slot="header">Question: {{item.description}}</div>
                                                <v-card>
                                                    <v-card-text class="green--text" v-if="item.questionType == 'OUVERTE'">
                                                        <div >
                                                            Réponse Standard: {{item.ouverteAnswer.answerDes}}
                                                        </div>
                                                    </v-card-text>
                                                    <v-card-text v-if="item.questionType != 'OUVERTE'">
                                                        <div v-for="(choix,j) in item.choixAnswer.choixList"
                                                                     :key="j"
                                                        >
                                                            <div :class="choix_color(choix)" >
                                                                {{choix.description}}
                                                            </div>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ListeQuestion",
        data:function () {
            return{
                panel: [],
                items: 5,
                all_questions:[],
                multi_question:[],
                unique_question:[],
                ouverte_question:[],
                states: [
                    'Toutes les Questions','Questions Uniques', 'Questions Multiples', 'Questions Ouvertes'
                ],
                question_type: 'Toutes les Questions',
                select: ['Spring', 'Vue'],
                question_tags: [
                    'Spring',
                    'Vue',
                    'Angular',
                    'Linux'
                ],
            }
        },
        methods:{
            // Create an array the length of our items
            // with all values as true
            all () {
                this.panel = [...Array(this.items).keys()].map(_ => true)
            },
            // Reset the panel
            none () {
                this.panel = []
            },
            test(){

            },
            choix_color(choix){
                if(choix.rightAns == true)
                    return "green--text"
                else return "red--text"
            }
        },
        computed:{
            selected_ques(){
                if(this.question_type == 'Toutes les Questions')
                  return this.all_questions
                else if(this.question_type == 'Questions Uniques')
                  return this.unique_question
                else if(this.question_type == 'Questions Multiples')
                  return this.multi_question
                else if(this.question_type == 'Questions Ouvertes')
                  return this.ouverte_question
            },
            // selected_ques_final(){
            //     let selected_ques_final = []
            //     for(let i=0;i<this.selected_ques.length;i++){
            //         let diff =Math.abs(this.select.length - this.selected_ques.length)
            //         if(_.difference(this.select, this.selected_ques[i].taglist).length === diff)
            //             selected_ques_final.push(this.selected_ques[i])
            //     }
            //     return selected_ques_final
            // }

        },
        created() {
            let url = "http://localhost:8090/jersey/question/questions"
            let config = {
                header:{
                    "Authorization": "Token "+localStorage.getItem("user-token")
                }
            }
            axios.get(url,config).then(response=>{
                this.all_questions = response.data
                let tmp_ques = response.data
                for(let i=0;i<tmp_ques.length;i++){
                    if(tmp_ques[i].questionType == "MULTIPLE")
                        this.multi_question.push(tmp_ques[i])
                    else if(tmp_ques[i].questionType == "UNIQUE")
                        this.unique_question.push(tmp_ques[i])
                    else if(tmp_ques[i].questionType == "OUVERTE")
                        this.ouverte_question.push(tmp_ques[i])
                }
            })
        }
    }
</script>

<style scoped>
    .red--text{
        margin-left: 15px;
        font-size: larger;
    }
    .green--text{
        margin-left: 15px;
        font-size: larger;
    }
</style>