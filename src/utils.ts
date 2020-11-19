/* eslint-disable  @typescript-eslint/no-explicit-any */
export const handlePromise = (
    promise: Promise<any>,
): Promise<any[] | (Error | null)[]> =>
    promise
        .then((response: any) => [null, response])
        .catch((error: Error) => [error, null]);
