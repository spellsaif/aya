import { Context } from "./context";


export function compose(fns: Function[]) {
    return function dispatch(context: Context) {
        function run(index: number) {
            const f = fns[index];

            if(!f) return;

            return f(context, ()=> run(index+1))
        }

        return run(0);
    }
}