<template>
    <v-app>
        <v-toolbar>
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title> User profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    @click="editInfo"
                    color="blue lighten-1"
                    fab
                    small
            >
                <v-icon v-if="isEditingInfo">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
        </v-toolbar>
        <v-form>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs5 offset-xs1>
                        <v-text-field :disabled="!isEditingInfo"
                                      :error-messages="PrenomError"
                                      @blur="$v.prenom.$touch()"
                                      @input="$v.prenom.$touch()"
                                      color="blue"
                                      label="Prenom"
                                      required
                                      v-model="prenom"></v-text-field>

                    </v-flex>
                    <v-flex xs5>
                        <v-text-field :disabled="!isEditingInfo"
                                      :error-messages="NomErrors"
                                      @blur="$v.nom.$touch()"
                                      @input="$v.nom.$touch()"
                                      color="blue"
                                      label="Nom"
                                      required
                                      v-model="nom"></v-text-field>
                    </v-flex>
                    <v-flex xs5 offset-xs1>
                        <v-text-field :disabled="!isEditingInfo"
                                      :error-messages="EmailErrors"
                                      @blur="$v.email.$touch()"
                                      @input="$v.email.$touch()"
                                      color="blue"
                                      label="E-mail"
                                      required
                                      v-model="email"></v-text-field>
                    </v-flex>
                    <v-flex xs5>
                        <v-text-field :disabled="!isEditingInfo"
                                      :error-messages="NumportableErrors"
                                      @blur="$v.numportable.$touch()"
                                      @input="$v.numportable.$touch()"
                                      color="blue"
                                      label="Numéro portable"
                                      required
                                      v-model="numportable"></v-text-field>
                    </v-flex>
                    <v-flex xs5 offset-xs1>
                        <v-menu
                                ref="menu"
                                :close-on-content-click="false"
                                v-model="menu"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="naissance"
                                    label="Date de naissance"
                                    prepend-icon="event"
                                    readonly
                                    :disabled="!isEditingInfo"
                            ></v-text-field>
                            <v-date-picker
                                    ref="picker"
                                    v-model="naissance"
                                    :max="new Date().toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="saveDate"
                                    :disabled="!isEditingInfo"
                            ></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs5>
                        <v-text-field :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                      :disabled="!isEditingInfo"
                                      :error-messages="MotdepasseErrors"
                                      :type="show1 ? 'text':'password'"
                                      @blur="$v.motdepasse.$touch()"
                                      @click:append="show1=!show1"
                                      @input="$v.motdepasse.$touch()"
                                      color="blue"
                                      label="Mot de passe"
                                      required
                                      v-model="motdepasse"></v-text-field>
                    </v-flex>
                    <v-flex xs5 offset-xs1>
                        <v-text-field :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                      :disabled="!isEditingInfo"
                                      :error-messages="ConfirmationErrors"
                                      :type="show2 ? 'text':'password'"
                                      @blur="$v.confirmation.$touch()"
                                      @click:append="show2=!show2"
                                      @input="$v.confirmation.$touch()"
                                      color="blue"
                                      label="Confirmation de mot de passe"
                                      required
                                      v-model="confirmation"></v-text-field>
                    </v-flex>

                </v-layout>
                <v-btn
                        :disabled="!isEditingInfo"
                        @click="saveInfo"
                        color="success"
                >
                    Save
                </v-btn>
            </v-container>
        </v-form>
        <v-toolbar>
            <v-icon>mdi-language-html5</v-icon>
            <v-toolbar-title> Compétence</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    @click="editCpt"
                    color="blue lighten-1"
                    fab
                    small
            >
                <v-icon v-if="isEditingCpt">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
        </v-toolbar>
        <v-container grid-list-md text-xs-center>
            <v-layout wrap>
                <v-flex xs10 offset-xs1>
                    <v-combobox
                            :disabled="!isEditingCpt"
                            :items="items"
                            chips
                            label="Choisir votre compétences"
                            multiple
                            v-model="select"
                    >
                        <template
                                slot="selection"
                                slot-scope="data"
                        >
                            <v-chip

                                    :disabled="data.disabled"
                                    :key="JSON.stringify(data.item)"
                                    :selected="data.selected"
                                    @blur="$v.naissance.$touch()"
                                    @input="data.parent.selectItem(data.item)"
                                    class="v-chip--select-multi"
                                    required
                                    :error-messages="NaissanceErrors"
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
            <v-btn
                    :disabled="!isEditingCpt"
                    @click="saveCpt"
                    color="success"
            >
                Save
            </v-btn>
        </v-container>
        <v-toolbar>
            <v-icon>mdi-file-document</v-icon>
            <v-toolbar-title> CV et Lettre de Motivation</v-toolbar-title>

        </v-toolbar>
        <v-container grid-list-md text-xs-center>
            <v-layout wrap>
                <v-flex>
                    <label>CV
                        <input id="cv" ref="cvfile" type="file" v-on:change="handleCVUpload()"/>
                    </label>
                </v-flex>
                <v-flex>
                    <label>Lettre de Motivation
                        <input id="lettre" ref="lettrefile" type="file" v-on:change="handleLettreUpload()"/>
                    </label>
                </v-flex>
            </v-layout>
            <v-btn
                    @click="submitFile"
                    color="success"
            >
                Submit
            </v-btn>
        </v-container>
        <v-footer class="pa-3" >
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>

    </v-app>

</template>

<script>

    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'
    import axios from 'axios';
    import sameAs from "vuelidate/src/validators/sameAs";

    export default {
        mixins: [validationMixin],

        validations: {
            prenom: {required},
            nom: {required},
            email: {required},
            numportable: {required},
            motdepasse: {required},
            confirmation: {required,
                sameAsPassword: sameAs("motdepasse")
            }


        },
        name: "Inscription",
        data() {
            return {
                isCompleted:false,
                hasSavedInfo: false,
                isEditingInfo: true,
                hasSavedCpt: false,
                isEditingCpt: true,
                prenom: null,
                nom: null,
                email: null,
                numportable: null,
                motdepasse: null,
                confirmation: null,
                show1: false,
                show2: false,
                select: ['Java', 'Javascript'],
                items: [
                    'Java',
                    'Javascript',
                    'Docker',
                    'Spring',
                    'Vue.js',
                    'Angular'
                ],
                cvfile: null,
                lettrefile: null,
                naissance: null,
                menu: false
            }

        },
        methods: {
            saveInfo() {
                if(!this.CheckInfoErrors)
                    alert("Veuillez remplir toutes les information")
                else{
                    this.isEditingInfo = !this.isEditingInfo
                    this.hasSavedInfo = true
                }
                console.log(this.ConfirmationErrors)
            },
            saveCpt() {
                if(this.select == null)
                    alert("Veuillez choisir au moins d'une compétence")
                else{
                    this.isEditingCpt = !this.isEditingCpt
                    this.hasSavedCpt = true
                }
            },
            editInfo(){
                if(this.isEditingInfo == false)
                    this.isEditingInfo = true
                if(this.isEditingInfo == true)
                    this.hasSavedInfo = false
            },
            editCpt(){
                if(this.isEditingCpt == false)
                    this.isEditingCpt =true
                if(this.isEditingCpt == true)
                    this.hasSavedCpt = false
            },
            handleCVUpload() {
                this.cvfile = this.$refs.cvfile.files[0];
            },
            handleLettreUpload() {
                this.lettrefile = this.$refs.lettrefile.files[0];
            },
            submitFile() {
                if(!this.hasSavedInfo){
                    alert("Veuillez sauvgarder votre information")
                    return
                }
                else if(this.cvfile == null || this.lettrefile == null){
                    alert("Veuillez upload votre CV et votre Lettre de Motivation")
                    return
                }
                else if(!this.hasSavedCpt){
                    alert("Veuillez sauvgarder votre compétence")
                    return
                }
                else{
                    let cvFormData = new FormData();
                    var cvname = 'cv_'+this.email
                    cvFormData.append('cv', this.cvfile,cvname)
                    axios.post('http://localhost:8090/jersey/uploads/cv',
                        cvFormData
                    ).then(function () {
                        console.log('cv uploads SUCCESS!!')
                    });
                    let lettreFormData = new FormData();
                    var lettrename = 'lettre_'+this.email
                    lettreFormData.append('lettre', this.lettrefile,lettrename)
                    axios.post('http://localhost:8090/jersey/uploads/lettre',
                        lettreFormData
                    ).then(function () {
                        console.log('lettre upload SUCCESS!!')
                    });

                    axios.post("http://localhost:8090/jersey/candidatures",
                        {
                            prenom:this.prenom,
                            nom:this.nom,
                            email:this.email,
                            birthday:this.naissance,
                            status:0,
                            motdepasse:this.motdepasse,
                            cvname:cvname,
                            lettrename:lettrename
                        }
                    )
                    this.saveToken(this.email)
                }
                this.$router.push('home')
            },
            saveDate (date) {
                this.$refs.menu.save(date)
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
        computed: {
            PrenomError() {
                const errors = []
                if (!this.$v.prenom.$dirty) return errors
                !this.$v.prenom.required && errors.push("Prenom manquant")
                return errors
            },
            NomErrors() {
                const errors = []
                if (!this.$v.nom.$dirty) return errors
                !this.$v.nom.required && errors.push("Nom manquant")
                return errors
            },
            EmailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push("Nom manquant")
                return errors
            },
            NumportableErrors() {
                const errors = []
                if (!this.$v.numportable.$dirty) return errors
                !this.$v.numportable.required && errors.push("Numéro portable manquant")
                return errors
            },
            MotdepasseErrors() {
                const errors = []
                if (!this.$v.motdepasse.$dirty) return errors
                !this.$v.motdepasse.required && errors.push("Mot de passe manquant")
                return errors
            },
            ConfirmationErrors() {
                const errors = []
                if (!this.$v.confirmation.$dirty) return errors
                !this.$v.confirmation.required && errors.push("Confirmation manquant")
                !this.$v.confirmation.sameAsPassword && errors.push("identique")
                return errors
            },
            NaissanceErrors(){
                const errors = []
                if(!this.$v.confirmation.$dirty) return errors
                !this.$v.confirmation.required && errors.push("Date de naissance manquant")
                return errors
            },
            CheckInfoErrors(){
                if(this.PrenomError.length !=0 ||this.NomErrors.length !=0
                    ||this.EmailErrors.length!=0||this.NumportableErrors.length !=0 || this.MotdepasseErrors.length!= 0
                    ||this.ConfirmationErrors.length != 0||this.NaissanceErrors.length!=0)
                    return false
                if(this.prenom == null || this.nom == null || this.email == null||this.numportable == null
                ||this.motdepasse == null||this.confirmation == null||this.naissance == null)
                    return false
                return true
            }
        },
        watch: {
            menu (val) {
                val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
    }

</script>

<style scoped>

</style>