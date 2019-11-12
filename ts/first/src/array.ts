//
const carMakers: string[] = ["ford", "toyota"];
const carMakers2: string[] = [];
const dates = [new Date(), new Date()];

const carsByMake: string[][] = [["f150"], ["corolla"], ["camaro"]];
const carsByMake2 = [{ 1: "f150" }, { 2: "corolla" }, { 3: "camaro" }];

// help with inferece when extract value from arr;

const cars = carMakers[0];
const carMy = carMakers.pop();

// prevent incompatible vals
// carMakers.push(100);
carMakers.map((car: string): string => {
  return car;
});

// flexible types
const importantDates: (Date | string)[] = [new Date(), "2002-10-10"];
importantDates.push("strign");
