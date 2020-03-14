const departmentEnum = {
  HR: 'department_1_1',
  MARKETING: 'department_1_2',
  GAME_DEV: 'department_2_3',
  APP: 'department_2_4',

  getTitles() {
    return {
      [this.HR]: 'HR',
      [this.MARKETING]: 'Маркетинг',
      [this.GAME_DEV]: 'Игра',
      [this.APP]: 'Приложение',
    }
  },

  getSelectOptions() {
    const titles = this.getTitles();
    return [
      {value: this.HR, text: titles[this.HR]},
      {value: this.MARKETING, text: titles[this.MARKETING]},
      {value: this.GAME_DEV, text: titles[this.GAME_DEV]},
      {value: this.APP, text: titles[this.APP]},
    ]
  }
};

export default departmentEnum;