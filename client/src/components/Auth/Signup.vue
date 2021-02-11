<template>
  <v-container text-xs-center mt-5 pt-5 >
    <v-layout row wrap >
      <v-flex xs12 sm6 offset-sm3>
        <h1>Inicie o seu cadastro aqui</h1>
      </v-flex>
    </v-layout>

<!-- error alert -->
<v-layout v-if="error" row wrap>
   <v-flex xs12 sm6 offset-sm3>
     <form-alert :message="error.message"></form-alert>
   </v-flex>
</v-layout>


    <!-- signup form -->
    <v-layout row wrap> 
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
           <v-container>
               <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignupUser">
                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>

                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="emailRules" v-model="email" prepend-icon="email" label="Email" type="email" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>

                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>

                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="gavel" label="Confirm Password" type="password" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>

                 <v-layout row>
                   <v-flex xs12>
                     <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                        <span slot="loader" class="custom-loader">
                         <v-icon light>cached</v-icon>
                          </span>
                       
                       
                       Cadastre-se</v-btn>
                     <h3> Já tem uma conta?
                       <router-link to="/signin">
                                  Entre
                       </router-link>

                     </h3>
                   </v-flex>
                 </v-layout>

               </v-form>
           </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: "Signup",
  data() {
    return {
       isFormValid: true,
       username: '',
       email: '',
       password: '',
       passwordConfirmation: '',
       usernameRules: [
         username => !!username || 'O nome do usuário é obrigatório',
         username => username.length < 10 || 'Número de caracteres (10) excedido'
       ],
       passwordRules: [
         password => !!password || 'Por favor informe uma senha',
         password => password.length > 6 || 'Senha deve ter pelo menos 7 dígitos',
          confirmation => confirmation === this.password || "As senhas devem ser iguais"
       ],
       emailRules: [
         email => !!email || 'Por favor informe um email',
         email => /.@+./.test(email) || 'Email inválido',
        
       ]
    }
  },
  watch: {
  user(value){
         // se o valor do usuario mudar de nulo para um objeto, redirecionar para a homepage
         if(value){
           this.$router.push('/')
         }
       }
  },
  computed: {
     ...mapGetters(['error', 'loading', 'user'])
  },
  methods: {
    handleSignupUser(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('signupUser', {
          email: this.email,
          password: this.password,
          username: this.username
        })
      }

    }
  },
};
</script>