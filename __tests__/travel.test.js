const { travelCalculator } = require('../index');

describe('travelCalculator', () => {
	test('returns 0 for non-positive inputs', () => {
		expect(travelCalculator(1000, 0, 1, 1000)).toBe(0);
		expect(travelCalculator(1000, 1000, -1, 1000)).toBe(0);
		expect(travelCalculator(-1, 1000, 1, 1000)).toBe(0);
		expect(travelCalculator(1000, 1000, 1, 0)).toBe(0);
	});

	test('single trip where capacity >= nuts subtracts one-way consumption', () => {
		// consumptionPerSegment = ceil(1 * 1000) = 1000
		// nuts = 900, capacity = 1000 -> delivered = max(0, 900 - 1000) = 0
		expect(travelCalculator(1000, 900, 1, 1000)).toBe(0);

		// nuts = 2000, capacity = 3000 -> delivered = max(0, 2000 - 1000) = 1000
		expect(travelCalculator(1000, 2000, 1, 3000)).toBe(1000);
	});

	test('no delivery when capacity <= consumptionPerSegment', () => {
		// consumptionPerSegment = ceil(2 * 100) = 200, capacity = 100 -> no delivery
		expect(travelCalculator(100, 1000, 2, 100)).toBe(0);
	});

	test('last partial trip where capacity <= 2*consumptionPerSegment results in one-way delivery', () => {
		// consumptionPerSegment = ceil(3 * 100) = 300, capacity = 500 (<= 600) -> one-way delivered = 500 - 300 = 200
		expect(travelCalculator(100, 1000, 3, 500)).toBe(200);
	});

	test('full round-trips deliver capacity - 2*consumptionPerSegment per trip', () => {
		// consumptionPerSegment = ceil(1 * 100) = 100, capacity = 500
		// per full trip delivered = 500 - 200 = 300
		// if nuts = 1500 -> trips = ceil(1500/500)=3 => delivered = 3 * 300 = 900
		expect(travelCalculator(100, 1500, 1, 500)).toBe(900);
	});
});
