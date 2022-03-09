export default class Token {
  constructor(public readonly key: string, public readonly value: string, public type: string = 'color') {}

  toCssToken() {
    return `${this.getCssKey()}: ${this.value}`;
  }

  getCssKey(): string {
    return `--${this.type}-${this.key}`
  }
}