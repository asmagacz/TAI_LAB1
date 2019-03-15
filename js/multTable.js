let tab = "";
for (let i = 1; i <= 10; i++) {
    tab += i + "\t";
    for (let j = 1; j <= 10; j++) {
        if (j != 1) {
            tab += (i * j) + "\t";
        }
    }
    tab += ("\n")
}
console.log(tab);