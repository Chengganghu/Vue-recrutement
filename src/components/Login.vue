<template>
    <v-app id="add_product">
        <img alt="Vue logo" src="../assets/logo.png">

        <v-form >
            <v-container grid-list-md text-xs-center>
                <v-layout row justify-center>
                    <v-flex xs4>
                        <v-text-field v-model="email"
                                      :error-messages="UtlisateurErrors"
                                      label="Email"
                                      required
                                      @input="$v.email.$touch()"
                                      @blur="$v.email.$touch()"></v-text-field>
                    </v-flex>
                </v-layout >
                <v-layout row justify-center>
                    <v-flex xs4>
                        <v-text-field v-model="motdepasse"
                                      type="password"
                                      :error-messages="MotdepasseErrors"
                                      label="Mot de passe"
                                      required
                                      @input="$v.motdepasse.$touch()"
                                      @blur="$v.motdepasse.$touch()"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-btn @click="login" >submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-container>

        </v-form>

        <router-link to="inscription">link</router-link>
    </v-app>
</template>

<script>
    import  Vue from "vue";
    import axios from 'axios';
    import { validationMixin } from 'vuelidate'
    import { required} from 'vuelidate/lib/validators'
    import Vuex from "vuex";
    Vue.use(Vuex)


    export default {
        mixins: [validationMixin],

        validations: {
            email: { required},
            motdepasse: { required}


        },
        name: "Login",
        data: function(){
            return{
                email:'',
                motdepasse:'',
                users:[],
            }
        },
        methods: {
            clear() {
                this.$v.$reset()
                this.email = ''
                this.motdepasse = ''
            },
            login() {
                this.$v.$touch()
                const {email, motdepasse} = this
                this.loginRoutine(email,motdepasse).then(() => {
                    this.$router.push('/home')
                })
            },
            loginRoutine(email, motdepasse) {
                return new Promise((resolve, reject) => {
                    axios.post("http://localhost:8090/jersey/authen",
                        {
                            email: email,
                            motdepasse: motdepasse
                        }).then(response => {
                        const res = response.data
                        if(res==true){
                            this.saveToken(email)
                            resolve(response)
                        }
                        else{
                            localStorage.removeItem("user-token")
                        }
                    }).catch(err => {
                        reject(err)
                    })
                })
            },

            saveToken(email){
                axios.post("http://localhost:8090/jersey/token/jwt",
                    {
                        userName:email,
                        role:"candidature"
                    }).then(response => {
                        localStorage.setItem("user-token",response.data)
                })
            }
        },
        computed:{
            UtlisateurErrors(){
                const errors = []
                if(!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push("Utilisateur manquant")
                return errors
            },
            MotdepasseErrors(){
                const errors = []
                if(!this.$v.motdepasse.$dirty) return errors
                !this.$v.motdepasse.required && errors.push("Mot de passe manquant")
                return errors
            }
        }
    }
</script>

<style scoped>

    img{
        margin: 60px auto 40px;
        width: 40%;
    }
</style>