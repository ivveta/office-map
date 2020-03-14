<template>
  <div class="sidebar">
    <v-autocomplete
      v-model="selectedUserIdComputed"
      :items="userList"
      :filter="getFilteredUsers"
      :hint="userSelectHint"
      :item-text="(item)=>`${item.firstName} ${item.lastName}`"
      item-value="id"
      label="Name"
    />

    <v-select
      v-model="openedFloorComputed"
      :items="floorList"
      :hint="selectHint('floor')"
      label="Floor"
    />

    <v-select
      v-model="selectedDepartmentComputed"
      :items="departmentList"
      :hint="selectHint('department')"
      label="Department"
    />
  </div>
</template>

<script>
  import {VAutocomplete, VSelect} from 'vuetify/lib';
  import departmentEnum from '../enums/department';
  import floorEnum from '../enums/floor';

  export default {
    name: "Filters",

    components: {
      VAutocomplete,
      VSelect,
    },

    props: {
      userList: {
        type: Array,
      },
      selectedUser: {
        type: Object,
      },
      filterError: {
        type: Object,
      },
      openedFloor: {
        type: String,
      },
      selectedUserId: {
        type: String,
      },
      selectedDepartmentId: {
        type: String,
      },
    },

    computed: {
      departmentList() {
        return departmentEnum.getSelectOptions();
      },

      floorList() {
        return floorEnum.getSelectOptions();
      },

      userSelectHint() {
        return this.filterError.user && this.selectedUser && this.selectedUser.firstName
          ? `${this.selectedUser.firstName} ${this.selectedUser.lastName}'s workplace not found`
          : '';
      },

      selectedUserIdComputed: {
        get: function () {
          return this.selectedUserId;
        },
        set: function (id) {
          this.$emit('set-selected-user-id', id);
        },
      },
      openedFloorComputed: {
        get: function () {
          return this.openedFloor;
        },
        set: function (id) {
          this.$emit('set-opened-floor', id);
        }
      },
      selectedDepartmentComputed: {
        get: function () {
          return this.selectedDepartmentId;
        },
        set: function (id) {
          this.$emit('set-selected-department', id);
        }
      }
    },

    methods: {
      /**
       * Function filters users for autocomplete search
       *
       * @param {object} item
       * @param {string} queryText
       * @returns {boolean}
       */
      getFilteredUsers(item, queryText) {
        const name = `${item.firstName} ${item.lastName}`.toLowerCase();
        const searchText = queryText.toLowerCase();

        return name.indexOf(searchText) !== -1;
      },

      /**
       * Function set hint for autocomplete
       * @param {string} name
       * @returns {string}
       */
      selectHint(name) {
        return this.filterError[name] ? `${name} not found` : '';
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    position: absolute;
    left: 20px;
    top: 100px;
    width: 230px;
    display: inline-block;
  }
</style>