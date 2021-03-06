import {
  observable,
  computed,
  action,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'kuaifuping' }) {
    this.count = count
    this.name = name
  }
  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} say count stash12 is ${this.count}`
  }
  @action add() {
    this.count += 7
  }
  @action changeName(name) {
    this.name = name
  }
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}

