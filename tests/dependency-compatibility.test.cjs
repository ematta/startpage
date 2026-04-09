const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const packageLockPath = path.join(__dirname, "..", "package-lock.json");
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, "utf8"));

function getDeclaredMajor(versionRange, packageName) {
  const match = versionRange.match(/\d+/);

  assert.ok(match, `Expected ${packageName} to declare a semver range`);

  return Number(match[0]);
}

test("gatsby/react versions stay compatible", () => {
  const dependencies = packageJson.dependencies;
  const gatsbyMajor = getDeclaredMajor(dependencies.gatsby, "gatsby");
  const reactMajor = getDeclaredMajor(dependencies.react, "react");
  const reactDomMajor = getDeclaredMajor(dependencies["react-dom"], "react-dom");

  assert.equal(
    reactMajor,
    reactDomMajor,
    "react and react-dom should stay on the same major version",
  );

  if (gatsbyMajor === 3) {
    assert.equal(
      reactMajor,
      17,
      "gatsby v3 only supports react v17 in this project",
    );
  }
});

test("root graphql major matches gatsby's graphql runtime", () => {
  const lockPackages = packageLock.packages;
  const rootGraphql = lockPackages["node_modules/graphql"];
  const gatsbyPackage = lockPackages["node_modules/gatsby"];

  assert.ok(rootGraphql, "Expected graphql to be present in the lockfile");
  assert.ok(gatsbyPackage, "Expected gatsby to be present in the lockfile");

  const rootGraphqlMajor = getDeclaredMajor(rootGraphql.version, "graphql");
  const gatsbyGraphqlMajor = getDeclaredMajor(
    gatsbyPackage.dependencies.graphql,
    "gatsby graphql",
  );

  assert.equal(
    rootGraphqlMajor,
    gatsbyGraphqlMajor,
    "gatsby should resolve the same graphql major at the project root",
  );
});

test("gatsby resolves to a single runtime in the lockfile", () => {
  const nestedGatsby = packageLock.packages["node_modules/gatsby/node_modules/gatsby"];

  assert.equal(
    nestedGatsby,
    undefined,
    "gatsby should not install a second nested gatsby runtime",
  );
});
