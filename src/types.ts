
type ExtractName<T> = 
T extends `:${infer Name}`
? Name
: T extends `*${infer Name}`
? Name 
: never;


type ExtractParams<T> = 
T extends `${infer First}/${infer Rest}`
? ExtractName<First> | ExtractParams<Rest>
: ExtractName<T>


export type ParamsOf<P extends string> = Record<ExtractParams<P>, string>;
