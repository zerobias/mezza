//@flow

declare module 'mezza' {
  declare type Pred = (val: mixed) => boolean
  declare export function match<T: { [key: string]: Pred }>(matchBy: T, value: mixed): $Keys<T>
  declare export function match<T: { [key: string]: Pred }>(matchBy: T): (value: mixed) => $Keys<T>

  declare export function remap<
    T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T, mapper: M, value: mixed): V
  declare export function remap<
    T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T, mapper: M): (value: mixed) => V
  declare export function remap<
    T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T): (mapper: M, value: mixed) => V
  declare export function remap<
    T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T): (mapper: M) => (value: mixed) => V
  //eslint-disable-next-line
  declare export default match<*>
}
