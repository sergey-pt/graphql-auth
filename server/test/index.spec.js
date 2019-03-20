import { expect } from "chai"

describe("index test", () => {
  describe("sayHello function", () => {
    it("should say Hello guys!", () => {

      const str = sayHello();
      expect(str).to.equal("Hello guys!")
    })
  })
})
