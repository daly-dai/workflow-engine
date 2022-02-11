/**
 * @description 判断两个区间是否有交集
 * @param arrA
 * @param arrB
 * @returns
 */
function isIntersection(arrA: any[], arrB: any[]): boolean {
  const max = [arrA[0], arrB[0]];
  const min = [arrA[1], arrB[1]];

  if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
    return true;
  }

  return false;
}

const createDelay =
  ({ willResolve }: any) =>
  (ms: number, { value }: any) => {
    let timeoutId: any;
    let settle: Function;

    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        if (willResolve) {
          resolve(value);
          return;
        }

        reject(value);
      };

      timeoutId = setTimeout(settle, ms);
    });

    (delayPromise as any).clear = () => {
      clearTimeout(timeoutId);

      timeoutId = null;
      settle();
    };

    return delayPromise;
  };

export { isIntersection, createDelay };
