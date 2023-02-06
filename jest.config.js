// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */

const nextJest = require("next/jest");
const { defaults } = require("jest-config");

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/data/db.json"],
};

module.exports = createJestConfig(customJestConfig);
