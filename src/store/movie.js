import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'
export default {
    // module!
    namespaced: true,

    // data!
    state:() => ({
        movies:[],
        message: _defaultMessage,
        loading: false,
        theMovie:{}
    }),

    // computed !
    getters:{},
    // getters:{
    //     movieIds(state){
    //         return state.movies.map(m => m.imdbID)
    //     }
    // },

    // methods!!
    // mutation에서만 데이터변경이 가능함
    mutations:{
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    
    actions:{
        async searchMovies({ state, commit }, payload){
            if(state.loading){
                return
            }

            commit('updateState', {
                message: '',
                loading: true
            })
            try {
                const res = await _fetchMovie({
                    ...payload,
                    page:1
                })
                const { Search, totalResults } = res.data
                commit('updateState',{
                    movies:_uniqBy(Search, 'imdbID')
                })

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                //정보 추가 요청!
                if(pageLength > 1){
                    for(let page = 2; page <=pageLength; page +=1){
                        if (page > (payload.number / 10)){
                            break
                        }
                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const { Search } = res.data
                        commit('updateState', {
                            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]//전개연산자
                        })
                    }
                }  
            }   catch({ message }){
                commit('updateState', {
                    movies: [],
                    message
                })
            }   finally {
                commit('updateState', {
                    loading: false
                })
            }
        
        },
        //하나의 영화 상세정보 가져오기
        async searchMovieWithId({ state, commit }, payload){
            if(state.loading){
                return            
            }

            commit('updateState', {
                theMovie: {},
                loading:true
            })

            try {
                const res = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch(error){
                commit('updateState',{
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading:false
                })
            }
        }
    }    

}


async function _fetchMovie(payload){
   return await axios.post('/.netlify/functions/movie', payload)
}