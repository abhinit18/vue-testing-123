<template>
<!-- popover fade bottom in -->
<div class="">
  <div class="arrow" style="left: 30px"></div>
  <div class="popover-content">
    <!-- <ul v-for="user in $store.state.postContent.userList?$store.state.postContent.userList.filter(user => {return userIsThere(user)}) :[]">
      <li @click="tagUser(user.userId, user.firstName +' '+ user.lastName)">
        <a>
          <ul class="list-inline">
            <li>
              <div class="img">
                <img v-if="user.userPic" :src="user.userPic">
                  <div class="picPlaceHolder" v-else>{{user.firstName.substr(0,1)}}</div>
              </div>
            </li>
            <li>
              <h5>
                {{user.firstName +' '+ user.lastName}}
              </h5>
            </li>
          </ul>
          
           <img class="pull-left img-cercle sizes" v-bind:src="user.userPic"> 
          </a>
          </li>
    </ul> ?$store.state.postContent.userList.filter(user => {return userIsThere(user)}) :[]-->
    <ul class="tagbudList" v-for="user in $store.state.postContent.userList">
      <li class="tagbudListItem">
        <div class="leftChecks">
          <label class="control control--checkbox">
            <input type="checkbox" :checked="userIds.indexOf(user) !== -1" @click="tagUser(user)">
            <div class="control__indicator"></div>
        </label>
        </div>
        <div class="tabBudyRgtInfo">
          <div class="tabBudyImg">
            <img v-if="user.userPic" style="width:30px;height:30px;" :src="user.userPic">
            <div class="picPlaceHolder" v-else>{{user.firstName.substr(0,1)}}</div>
          </div>
          {{user.firstName +' '+ user.lastName}}
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
  export default {
    props: ['taggedUsers'],
    data () {
      return {
        userIds: []
      }
    },
    components: {
      
    },
    methods: {
      tagUser(data){
        if(this.userIds.indexOf(data) === -1){
          this.userIds.push(data)
        }else{
          this.userIds.splice(this.userIds.indexOf(data),1)
        }
        this.$emit('selected', this.userIds.map(value =>{
          let tempData = {"id": value.userId,"name": value.firstName+' '+value.lastName}
          return tempData
          })
        );
      },
      userIsThere(user){
        for(let i=0;i<this.taggedUsers.length;i++){
            if(this.taggedUsers[i].id === user.userId){
              return false;
            }
        } 
        return true;
      }
    }
}

</script>
<style>
  .sizes{
    width: 25px;
    height: 25px;
  }

  .statusBtns .addFriendSearch .popover-content li img,
  .statusBtns .addFriendSearch .popover-content li .img{ border-radius: 3px}
  .statusBtns .addFriendSearch .popover-content li .img{ margin: 0 5px 0 0}
</style>