<template>
   <v-container text-xs-center mt-5 pt-5 >
    <v-layout row wrap >
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Adicionar Post</h1>
      </v-flex>
    </v-layout>




    <!-- Add Post form -->
    <v-layout row wrap> 
      <v-flex xs12 sm6 offset-sm3>
       
               <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">

                 <!-- Title input -->
                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="titleRules" v-model="title" label="Título" type="text" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>


                    <!-- Image url input -->
                     <v-layout row>
                   <v-flex xs12>
                     <v-text-field :rules="imageRules" v-model="imageUrl" label="Url da imagem" type="text" required>
                     </v-text-field>
                   </v-flex>
                 </v-layout>
                 
                 <!-- Image preview -->
                  <v-layout row>
                    <v-flex xs12>
                     <img :src="imageUrl" height="300px">
                    </v-flex>
                  </v-layout>

                  <!-- Categories select -->
                   <v-layout row>
                    <v-flex xs12>
                     <v-select :rules="categoriesRules" v-model="categories" :items="['Arte', 'Educação', 'Viagem', 'Fotografia', 'Tecnologia', 'Comida', 'Mobiliário']" multiple label="Categorias">
                     </v-select>
                    </v-flex>
                  </v-layout>

                     <!-- Description text area -->
                  <v-layout row>
                   <v-flex xs12>
                     <v-textarea :rules="descRules" v-model="description" label="Descrição" type="text" required>
                     </v-textarea>
                   </v-flex>
                 </v-layout>

                 <v-layout row>
                   <v-flex xs12>
                     <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                        <span slot="loader" class="custom-loader">
                         <v-icon light>cached</v-icon>
                          </span>
                       
                       
                       Adicionar</v-btn>
                     
                   </v-flex>
                 </v-layout>

               </v-form>
          
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "AddPost",
  data (){
    return{
      isFormValid: true,
      title: '',
      imageUrl: '',
      categories: [],
      description: '',
      titleRules: [
        title => !!title || 'Título obrigatório',
        title => title.length <= 20 || "O título deve possuir menos de 20 caracteres"
      ],
      imageRules: [
        image => !!image || 'Imagem é obrigatório'
      ],
      categoriesRules: [
        categories => categories.length > 0 || 'No mínimo uma categoria é requerida!'
      ],
      descRules: [
        desc => !!desc || 'Descrição obrigatória!',
        desc => desc.length <= 200 || "A descrição não pode exceder 200 caracteres"
      ],
    }
  },
  computed: {
        ...mapGetters(['user', 'loading'])
  },
  methods: {
    handleAddPost(){
          if(this.$refs.form.validate()){
            this.$store.dispatch('addPost', {
              title: this.title,
              imageUrl: this.imageUrl,
              categories: this.categories,
              description: this.description,
              creatorId: this.user._id
            });
            this.$router.push('/');
          }
    }
  }
};
</script>
