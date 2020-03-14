const floorEnum = {
  ONE: '1',
  TWO: '2',

  getTitles() {
    return {
      [this.ONE]: 'First',
      [this.TWO]: 'Second',
    }
  },

  getSelectOptions() {
    return [
      {value: this.ONE, text: 'First'},
      {value: this.TWO, text: 'Second'},
    ]
  }
};

export default floorEnum;