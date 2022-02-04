<template>
    <div class="about">
        <div class="photo">
            <Loader v-if="imageLoading" abosolute />
            <img :src="image" alt="name">
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div>{{email}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'
export default {
    data(){
        return{
            imageLoading:true
        }
    },
    computed:{
        ...mapState('about',[
            'image',
            'name',
            'email'
        ])       
    },
    async mouted(){
        this.init()
    },  
    methods: {
        async init(){
            await this.$loadImage(this.image)
            this.imageLoading = false
        }
    }
}
</script>

<style lang="scss" scoped>

.about {
    text-align: center;
    .photo{
        width:450px;
        height:450px;
        margin:40px auto 20px;
        padding:10px;
        //border:10px solid $gray-300;
        border-radius: 50%;
        box-sizing: border-box;
        //background-color:$gray-200;
        img{
            width:100%;
        }
    }
    .name {
        font-size:40px;
        font-family: "Oswald", sans-serif;
        margin-bottom:20px;
    }
}
</style>