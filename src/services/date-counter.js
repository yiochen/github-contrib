export class ImmutableDate {
  constructor(date) {
    this.date = date;
  }

  toString() {
    return `${this.getDate()}/${this.getMonth()}/${this.getYear()}`;
  }

  getYear() {
    return this.date.getFullYear();
  }

  getMonth() {
    return this.date.getMonth();
  }

  getDate() {
    return this.date.getDate();
  }

  tomorrow() {
    let nextDate = new Date(this.date);
    nextDate.setDate(nextDate.getDate() + 1);
    return new ImmutableDate(nextDate);
  }

  compare(immDate) {
    let yearDiff = this.getYear() - immDate.getYear();
    let monthDiff = this.getMonth() - immDate.getMonth();
    let dateDiff = this.getDate() - immDate.getDate();
    if (yearDiff !== 0) {
      return yearDiff;
    }
    if (monthDiff !== 0) {
      return monthDiff;
    }
    return dateDiff;
  }

  static fromString(st) {
    return new ImmutableDate(new Date(st));
  }
}

export default class DateCounter {
  constructor() {
    this.sequence = new Map();
    this.initSequence();
  }

  initSequence() {
    let today = new Date();
    let lastYearToday = new Date(today);
    lastYearToday.setFullYear(lastYearToday.getFullYear() - 1);
    let i = new ImmutableDate(lastYearToday);
    let endDate = new ImmutableDate(today);
    while (i.compare(endDate) <= 0) {
      this.sequence.set("" + i, 0);
      i = i.tomorrow();
    }
  }

  saveStringArray(dateStringArray) {
    dateStringArray.forEach(st => {
      let date = ImmutableDate.fromString(st);
      if (this.sequence.has("" + date)) {
        this.sequence.set("" + date, this.sequence.get("" + date) + 1);
      }
    });
  }
}
