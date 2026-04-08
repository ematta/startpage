const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

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
