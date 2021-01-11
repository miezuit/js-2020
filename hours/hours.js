var hour = 0
while (hour < 24) {
    document.writeln(hour)
    document.writeln("<br>")
    hour++
}

for (var hour = 0; hour < 24; hour++) {
    document.writeln(hour)
    document.writeln("<br>")
}

var money = 1
var chocolates = 0 
var chocolatePrice = 1

do {
    chocolates++
    money -= chocolatePrice
} while(money > chocolatePrice)

while(money > chocolatePrice) {
    chocolates++
    money -= chocolatePrice
}

 
