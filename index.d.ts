declare module 'mezza' {
  type Pred = (val: any) => boolean
  export function match<T extends { [key: string]: Pred }>(matchBy: T): (value: any) => string
  export function remap<
    T extends { [key: string]: Pred },
    V,
    M extends { [key: string]: V }
  >(matchBy: T): (mapper: M) => (value: any) => V
  export function choose<
    T extends { [key: string]: Pred },
    V,
    M extends { [key: string]: (value: any) => V }
  >(matchBy: T): (mapper: M) => (value: any) => V
  //eslint-disable-next-line
  export default choose
}