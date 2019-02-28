<template>
    <v-app>
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
    </v-app>
</template>

<script>
    import VHeader from "../VHeader";
    export default {
        name: "AddQuestion",
        components: {VHeader},
        data: function(){
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
                if(this.question_type == "Questions Uniques"){
                    data.questionType = "UNIQUE"
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
                }
                else if(this.question_type == "Questions Multiples"){
                    data.questionType = "MULTIPLE"
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
                }
                else data.questionType = "OUVERTE"
                data.description = this.ques_description
                data.ouverteAnswer = new Object()
                data.ouverteAnswer.answerDes = this.answerDes
                axios.post("http://localhost:8090/jersey/question/questions",data).then(function () {
                    alert("Bien ajouté")
                })
                this.$router.push('/quizze')
            },
            clear_data(){
                this.bonneOptionsNumber=1
                this.mauvaisOptionsNumber=1
                this.mauvaisOptions=[]
                this.bonneOptions=[]
                this.ques_description=''
                this.question_type=''
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