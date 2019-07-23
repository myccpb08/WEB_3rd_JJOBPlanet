<template>
  <div>
    <div style="margin-top:48px"></div>
    <ImgBanner>
      <div id="bannerTitle" style="line-height:1.2em; font-size:7rem;" slot="text">Post</div>
    </ImgBanner>
    <v-container>

      <!-- Post -->
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PostList from '../components/PostList'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PostPage',
  data(){
    return{}
  },
	components: {
		ImgBanner,
		PostList,
	},
  mounted(){

  },
  methods:{

  }
}
</script>
