const chunks = <T>(a: Array<T>, size: number): Array<T[]> =>
  Array.from(new Array(Math.ceil(a.length / size)), (_, i) =>
    a.slice(i * size, i * size + size),
  );

export default chunks;
