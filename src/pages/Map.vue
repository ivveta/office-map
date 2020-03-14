<template>
  <div class="wrapper">
    <Header :openedFloor="openedFloor"/>
    <Filters
      :userList="userList"
      :selectedUserId="selectedUserId"
      :selectedUser="selectedUser"
      :filterError="filterError"
      :openedFloor="openedFloor"
      :selectedDepartmentId="selectedDepartmentId"
      @set-selected-user-id="setSelectedUserId"
      @set-opened-floor="setOpenedFloor"
      @set-selected-department="setSelectedDepartment"
    />

    <div class="floorWrap" @click="showSelectedObjectInMap($event.target)">
      <p class="errorText" v-show="isError">{{error}}</p>
      <Floor1 v-show="openedFloor === floorEnum.ONE" ref="floor-1"/>
      <Floor2 v-show="openedFloor === floorEnum.TWO" ref="floor-2"/>
    </div>

    <UserCard
      title="Test title"
      :user="selectedUser"
      :isOpen="isOpenUserCard"
      :selectedTable="selectedTable"
      @close-user="closeUserCard"
    />
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Filters from '../components/Filters';
  import Floor1 from '../components/floors/Floor1.vue';
  import Floor2 from '../components/floors/Floor2.vue';
  import UserCard from '../components/UserCard.vue';
  import USERS from '../mocks/users';
  import floorEnum from '../enums/floor';

  const tableStyles = {
    empty: 'fill: #fff; stroke: #000; stroke-width: 11; paint-order: stroke;',
    full: 'fill: #6200ea; stroke: #000; stroke-width: 11; paint-order: stroke;',
  };

  const departmentStyles = {
    empty: 'fill: transparent;',
    full: 'fill: rgba(98, 0, 234, 0.2);',
  };

  export default {
    name: 'Map',

    components: {
      Floor1,
      Floor2,
      Filters,
      Header,
      UserCard,
    },

    data() {
      return {
        openedFloor: floorEnum.ONE,
        userList: USERS,
        selectedUserId: null,
        selectedTable: null,
        selectedDepartmentId: null,
        filterError: {
          user: false,
          department: false,
          floor: false,
        },
        isOpenUserCard: false,
        error: '',
      };
    },

    computed: {
      isError() {
        return this.error.length > 0;
      },

      floorEnum() {
        return floorEnum;
      },

      selectedUser() {
        return this.userList ? this.userList.find(user => user.id === this.selectedUserId) : {};
      },
    },

    watch: {
      error() {
        setTimeout(() => this.error = '', 5000);
      },
    },

    methods: {
      /**
       * @returns {void}
       */
      clearSelectedDepartment() {
        if (this.selectedDepartmentId && this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedDepartmentId]) {
          this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedDepartmentId].style = departmentStyles.empty;
        }
        this.selectedDepartmentId = null;
      },

      /**
       * @returns {void}
       */
      clearSelectedUser() {
        if (this.selectedTable && this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedTable]) {
          this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedTable].style = tableStyles.empty;
        }
        this.filterError.user = false;
        this.selectedUserId = null;
      },

      /**
       * @param {object} target
       * @returns {void}
       */
      showSelectedObjectInMap(target) {
        this.clearSelectedDepartment();
        this.clearSelectedUser();

        if (target.id && /department_/.test(target.id)) {
          this.setSelectedDepartment(target.id);
        }

        if (target.id && /table_/.test(target.id)) {
          const user = this.userList.filter(user => user.tableId === target.id)[0];
          this.selectedUserId = user ? user.id : null;
          this.setSelectedTableForUser(target.id);

          this.isOpenUserCard = true;
        }
      },

      /**
       * @returns {void}
       */
      closeUserCard() {
        this.isOpenUserCard = false;
      },

      /**
       * @param {number} id
       * @returns {void}
       */
      setOpenedFloor(id) {
        this.clearSelectedDepartment();
        this.clearSelectedUser();

        this.openedFloor = id;
      },

      /**
       * Function set floor for selected table or department
       * @param {number} id
       * @returns {void}
       */
      setOpenedFloorForObject(id) {
        const floorList = Object.keys(floorEnum.getTitles());
        const floor = floorList.find(floor => new RegExp(`^(table|department)_${floor}_`).test(id));

        if (floor) {
          this.openedFloor = floor;
        } else {
          this.filterError.floor = true;
        }
      },

      /**
       *
       * @param {number} id
       * @returns {void}
       */
      setSelectedDepartment(id) {
        if (!id) {
          return;
        }

        this.clearSelectedDepartment();
        this.clearSelectedUser();

        this.selectedDepartmentId = id;
        this.setOpenedFloorForObject(id);

        if (this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedDepartmentId]) {
          this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedDepartmentId].style = departmentStyles.full;
        } else {
          this.filterError.department = true;
        }
      },

      setSelectedTableForUser(tableId) {
        if (tableId) {
          this.selectedTable = tableId;
          this.setOpenedFloorForObject(tableId);

          if (this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedTable]) {
            this.$refs[`floor-${this.openedFloor}`].$refs[this.selectedTable].style = tableStyles.full;
          } else {
            this.filterError.user = true;
          }
        } else {
          this.filterError.user = true;
        }
      },

      setSelectedUserId(id) {
        this.clearSelectedDepartment();
        this.clearSelectedUser();

        this.selectedUserId = id;
        const tableId = this.selectedUser.tableId;
        this.setSelectedTableForUser(tableId);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    position: relative;
  }

  .floorWrap {
    max-width: 70%;
    margin-left: 300px;
  }

  .errorText {
    color: #b70101;
  }
</style>