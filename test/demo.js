const except = require("chai").expect;

function add(a, b) {
  return a + b;
}

describe("add", () => {
  it("positive test", () => {
    except(add(5, 2)).equal(7);
  });

  it("negative test", () => {
    except(add(5, 9)).not.equal(8);
  });
});
