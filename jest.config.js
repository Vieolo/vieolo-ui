module.exports = {
	roots: ['<rootDir>/'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	//coveragePathIgnorePatterns: [        
		
    //],
	testPathIgnorePatterns: [
		"/node_modules"
	],
	transformIgnorePatterns: [
        '<rootDir>/node_modules/@vieolo/*'
    ],
	setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
	transform: {
		"\\.jsx?$": "babel-jest"
	},
	snapshotSerializers: ["enzyme-to-json/serializer"],
	verbose: true,
	testURL: "http://localhost/"
	//globals: {
		
	//}
	//coverageReporters: ['html']
	/*coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	}*/
}