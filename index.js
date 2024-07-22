import { from, filter, map, of, distinct, take, count, concat } from "rxjs";
let obs = of("Curitiba", 200, 4.5, true);
let obs2 = of(1, 2, 3, 4);
let cidades = [
    "Mariluz",
    "Curitiba",
    "Londrina",
    "Umuarama",
    "Foz do iguaçu",
    "Londrina",
];
obs.subscribe({
    next(v) {
        console.log(v);
    },
    error(e) {
        console.log("Error:", e);
    },
    complete() {
        console.log("Completed");
    },
});
obs2
    .pipe(filter((v) => v > 1), //filters
map((v) => v * 2))
    .subscribe((v) => console.log(v));
//expected output 4,6,8
from(cidades)
    .pipe(distinct())
    .subscribe({
    next: (cidade) => {
        console.log(`Cidade: ${cidade}`);
    },
    error: (e) => console.log("Error:" + e),
    complete: () => console.log("acabou"),
});
const evenNumberObs = from([5, 10, 15, 20, 25, 30, 35, 40]).pipe(filter((n) => n % 2 === 0));
evenNumberObs.subscribe({
    next(number) {
        console.log(number);
    },
});
//expected output: 10,20,30,40
evenNumberObs
    .pipe(map((n) => n / 10), take(2), count())
    .subscribe({
    next(mappedNumber) {
        console.log(mappedNumber);
    },
});
//expected output: 2
console.log("here");
concat(obs, obs2, from(cidades).pipe(distinct())).subscribe({
    next: (v) => console.log(v),
});
