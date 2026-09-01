
type ExtractName<T> = 
T extends `:${infer Name}`
? Name 
: never;


type A = ExtractName<':anime'>;
type B = ExtractName<':character'>
type C = ExtractName<'Sakura'>

type Split<T> = 
T extends `${infer First}/${infer Rest}`
? [First, Rest]
: never;

type D = Split<'anime/:name'>

type ExtractParams<T> = 
T extends `${infer First}/${infer Rest}`
? ExtractName<First> | ExtractParams<Rest>
: ExtractName<T>


type E = ExtractParams<"users/:id">
type F = ExtractParams<"users/:userId/posts/:postId">