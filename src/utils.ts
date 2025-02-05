export default class AsyncIterableArray<T> implements AsyncIterable<T> {
  private readonly array: Array<T>

  constructor(array: Array<T>) {
    this.array = array
  }

  public [Symbol.asyncIterator](): AsyncIterator<T> {
    let i = 0

    return {
      next: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              value: this.array[i],
              done: i++ >= this.array.length,
            })
          })
        }),
    }
  }
}
