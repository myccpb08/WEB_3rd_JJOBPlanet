<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <v-card max-width="200px" min-width="200px">
        <v-card-title primary-title>
          <div style="display:inline-block">

              <div style="float-left">
                <span class="--text">Name : {{displayName}}</span><br>
                <span class="--text">Email : {{email}}</span><br>
              </div>
              Class : <v-select v-on:change="updateUserClass" :items="items" :value="userClass" style="width:100px; right:20px; position:static; display:inline-block"></v-select>
          </div>
        </v-card-title>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import Vue       from 'vue'

export default {
   name: 'UserClass',
   props: {
    changed_at: {type: String},
    displayName: {type: String},
    email: {type: String},
      userClass: {type: String},
    uid: {type: String}
   },
  data() {
    return {
      items: ['admin', 'master', 'visitor']
    }
  },
  methods: {
    updateUserClass(selectObject){
      FirebaseService.updateUserClass(this.uid, selectObject);

    }
  },
  computed: {

  }

}
</script>
