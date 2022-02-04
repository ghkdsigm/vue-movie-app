import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'//index.js를 가지고오는경우 index.js를 경로에서 생략해줄수있음
import store from './store/index.js'//index.js를 가지고오는경우 index.js를 경로에서 생략해줄수있음
import loadImage from './plugins/loadImage.js'//index.js를 가지고오는경우 index.js를 경로에서 생략해줄수있음

createApp(App).use(router).use(store).use(loadImage).mount('#app')
//use 메소드는 플러그인 라이브러리들을 지정해주는 메소드