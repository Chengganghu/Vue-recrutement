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
                    <add-question></add-question>

                </v-tab-item>
                <v-tab-item
                        :key="2"
                        :value="'mobile-tabs-5-2'"
                >
                    <ListeQuestion></ListeQuestion>
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
    import Inscription from "./Inscription";
    import Login from "./Login";
    import AddQuestion from "./quizze/AddQuestion";
    import ListeQuestion from "./quizze/ListeQuestion";
    export default {
        name: "Quizze",
        components: {ListeQuestion, AddQuestion, Login, Inscription},
        data () {
            return {
                tabs:null,
            }
        },
        methods:{
        },
        computed:{
        }
    }
</script>

<style scoped>

</style>