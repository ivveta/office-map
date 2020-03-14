<template>
  <v-dialog
    v-model="isOpenUser"
    width="450"
  >
    <v-card>
      <div v-if="user.id">
        <div class="user-avatar">
          <img v-if="user.photoUrl" :src="require(`@/assets/img/${user.photoUrl}`)" alt="image"/>
        </div>
        <div class="user-data">
          <p class="user-name">{{user.firstName}} {{user.lastName}}</p>
          <p class="user-job-title">Отдел: {{ user.department }}</p>
          <p class="user-job-title">{{ user.jobTitle }}</p>
        </div>
        <div class="table-id">{{selectedTable}}</div>
      </div>
      <div v-else  class="wrap">
        <p class="user-empty">Empty table</p>
        <div class="table-id">{{selectedTable}}</div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import {VDialog, VCard} from 'vuetify/lib';

  export default {
    components: {VDialog, VCard},

    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      user: {
        type: Object,
        default: function () {
          return {};
        },
      },
      selectedTable: {
        type: String,
      },
    },

    computed: {
      isOpenUser:  {
        get: function () {
          return this.isOpen;
        },
        set: function () {
          this.$emit('close-user');
        }
      }
    },

    methods: {},
  };
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
  }

  .user-avatar,
  .user-data {
    display: inline-block;
    vertical-align: top;
  }

  .user-avatar {
    width: 150px;
    height: 150px;
    position: relative;
    z-index: 3;
  }

  .user-avatar img {
    position: relative;
    z-index: 3;
    max-width: 94%;
    max-height: 94%;
    margin: 3%;
  }

  .user-avatar::before {
    content: 'Loading...';
    position: absolute;
    vertical-align: center;
    text-align: center;
    left: 0;
    top: 0;
    width: 100%;
    line-height: 150px;
    z-index: 1;
  }

  .user-data {
    box-sizing: border-box;
    max-width: 250px;
    padding: 20px;
  }

  .user-data p {
    margin-bottom: 10px;
  }

  .user-name {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-empty {
    padding: 20px 20px 0;
    display: inline-block;
  }

  .table-id {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 11px;
    color: #bbb;
  }

</style>
