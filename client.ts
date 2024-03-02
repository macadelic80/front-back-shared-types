import type { Player } from './types';

const Players: Record<string, Player> = {
    "foo": {
        name: "foo",
        age: 20,
        country: "bar"
    },
    "bar": {
        name: "bar",
        age: 30,
        country: "baz"
    }
};

const a = Players.foo;
console.log("ts client", a);