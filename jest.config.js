export default {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "../$1", // @/をルートに変換する
  },
};
