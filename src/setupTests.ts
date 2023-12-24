import '@testing-library/jest-dom';

Object.defineProperty(global.self, 'crypto', {
	value: {
		randomUUID() {
			return '1234';
		}
	}
});
