const TRAVELS = [
    [1000,3000,1,1000],
    [1000,7000,1,1000],
    [1111,3000,1,1000],
    [1000,3000,1,1111],
    [1111,3334,3,4444],
    [111,3333,3,2222],
    [111,3333,3,1000],
    [10000,1111111,3,1111],
    [10000,1111111,5,1111],
    [1000,1000000,2,1000],
    [1111,22222222,5,3333],
    [1000,12000,5,3000],
]


function travelCalculator(distance, nuts, consumptionRate, capacity) {

    let nutsTransported = 0;

    const travels = Math.ceil(nuts/capacity);

    const consumptionPerSegment = Math.ceil(consumptionRate * distance);

    if(capacity >= nuts){
        return nuts - consumptionPerSegment;
    }


    for (let i = 0; i < travels; i++) {
        if(capacity <= consumptionPerSegment) {
            break
        }

        if(capacity <= consumptionPerSegment * 2) {
            nutsTransported = nutsTransported + (capacity - consumptionPerSegment)
            break;
        } else {
            nutsTransported = nutsTransported + (capacity - consumptionPerSegment * 2)
        }
    }

    return nutsTransported;
}


for(let i = 0; i < TRAVELS.length; i++) {
    const [distance, nuts, consumptionRate, capacity] = TRAVELS[i];

    const currentTravelCost = travelCalculator(distance, nuts, consumptionRate, capacity);

    console.table([distance,nuts,consumptionRate,capacity,currentTravelCost]);
}


