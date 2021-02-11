import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'


import { defaultClient as apolloClient} from './main'
import { ADD_POST, GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null,

  },
  mutations: {
    setPosts: (state, paylod) => {
      state.posts = paylod;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null),

    setLoading:(state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    }

  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient.query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', false)
            //colocar os dados do usuário em um state
            commit('setUser', data.getCurrentUser)
        // console.log(data.getCurrentUser)
      })
      .catch(err => {
        commit('setLoading', false)

        console.error(err)
      })
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true)
      apolloClient
      .query({
        query: GET_POSTS
      }).then(({ data })=> {
        commit('setPosts', data.getPosts)
        commit('setLoading', false);
      }).catch(err =>{

        commit('setLoading', false);

        console.error(err)
      })

    },
    addPost: ({ commit }, payload) => {
      apolloClient
               .mutate({
                 mutation: ADD_POST,
                 variables: payload,
                 update: (cache, { data: {addPost} }) => {
                 //  console.log(cache, data);
                 //1-read the query you want to update
                 const data = cache.readQuery({ query: GET_POSTS})

                 //create update data 

                 data.getPosts.unshift(addPost)
                 //write updated data back to query
                 cache.writeQuery({
                   query: GET_POSTS,
                   data

                 });
                 },
                 //optimistic response ensures data is added immediately as we specified for the update function
                 optimisticResponse: {
                          __typename: 'Mutation',
                          addPost: {
                            __typename: 'Post',
                            _id: -1,
                            ...payload
                          }
                 }
               })
               .then(({ data}) => {
                 console.log(data.addPost)
               })
               .catch(err => {
                 console.error(err)
               })
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true)
      //clear token to prevent errors(if malformed)
    //  localStorage.setItem('token',"")
           apolloClient
           .mutate({
             mutation: SIGNIN_USER,
             variables: payload
           })
           .then(({ data }) => {
            commit('setLoading', false)
            // console.log(data.signinUser)
             localStorage.setItem('token', data.signinUser.token)
             router.go()
           })
           .catch(err => {
            commit('setLoading', false)
            commit('setError', err) 
            console.err(err)})

    },
    signupUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true)
           apolloClient
           .mutate({
             mutation: SIGNUP_USER,
             variables: payload
           })
           .then(({ data }) => {
            commit('setLoading', false)
            // console.log(data.signinUser)
             localStorage.setItem('token', data.signupUser.token)
             router.go()
           })
           .catch(err => {
            commit('setLoading', false)
            commit('setError', err) 
            console.err(err)})

    },
    signoutUser: async ({ commit }) => {
      //clear user in state
      commit('clearUser')
      // remove token in localstorage

      localStorage.setItem('token', '');

      //end session
     // console.dir(apolloClient)
     await apolloClient.resetStore()

     // redirect home
     router.push('/')
    }

  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authError: state => state.authError
  }
})
