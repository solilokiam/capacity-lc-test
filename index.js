const TRAVELS = [
    [1000, 3000, 1, 1000],
    [1000, 7000, 1, 1000],
    [1111, 3000, 1, 1000],
    [1000, 3000, 1, 1111],
    [1111, 3334, 3, 4444],
    [111, 3333, 3, 2222],
    [111, 3333, 3, 1000],
    [10000, 1111111, 3, 1111],
    [10000, 1111111, 5, 1111],
    [1000, 1000000, 2, 1000],
    [1111, 22222222, 5, 3333],
    [1000, 12000, 5, 3000],
];

function travelCalculator(distance, nuts, consumptionRate, capacity) {
    if (capacity <= 0 || distance < 0 || consumptionRate < 0 || nuts <= 0) return 0;

    const trips = Math.ceil(nuts / capacity);

    const consumptionPerSegment = Math.ceil(consumptionRate * distance);

    if (capacity >= nuts) {
        return Math.max(0, nuts - consumptionPerSegment);
    }

    let netDelivered = 0;

    for (let i = 0; i < trips; i++) {
        if (capacity <= consumptionPerSegment) break;

        if (capacity <= consumptionPerSegment * 2) {
            netDelivered += Math.max(0, capacity - consumptionPerSegment);
            break;
        }

        netDelivered += capacity - consumptionPerSegment * 2;
    }

    return netDelivered;
}

const results = TRAVELS.map(([distance, nuts, consumptionRate, capacity]) => {
    return {
        distance,
        nuts,
        consumptionRate,
        capacity,
        delivered: travelCalculator(distance, nuts, consumptionRate, capacity),
    };
});

// Only print results when this file is executed directly, not when imported by tests
if (require.main === module) {
    console.table(results);
}

// Export for testing
module.exports = {
    travelCalculator,
    TRAVELS,
};


