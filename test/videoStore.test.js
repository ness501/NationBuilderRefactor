import {
  Movie,
  Rental,
  Customer,
  REGULAR_MOVIE_PRICECODE,
  NEW_RELEASE_MOVIE_PRICECODE,
  CHILDRENS_MOVIE_PRICECODE,
} from "../src/videoStore.js";

import Mocha from "mocha";
import { assert } from "chai";

var mocha = new Mocha({ ui: "bdd" });

// Bit of a hack, sorry!
// mocha.suite.emit("pre-require", this, "solution", mocha);

describe("a customer", () => {
  let customer;
  let regularMovie = new Movie("Mad Max", REGULAR_MOVIE_PRICECODE);
  let newMovie = new Movie("The Hobbit", NEW_RELEASE_MOVIE_PRICECODE);
  let childrensMovie = new Movie("Bambi", CHILDRENS_MOVIE_PRICECODE);

  beforeEach(() => {
    customer = new Customer("Martin");
  });

  // updated test spec to include html statement
  describe("without any rentals", () => {
    it("should have an empty statement in both text and HTML formats", () => {
      const expectedTextStatement =
        "Rental record for Martin\nAmount owed is $0\nYou earned 0 frequent renter points";
      const expectedHtmlStatement = `<h1>Rental Record for <strong>Martin</strong></h1>\n<ul>\n</ul>\n<p>Amount owed is $0</p>\n<p>You earned 0 frequent renter points</p>`;

      const expectedStatement =
        expectedTextStatement + "\n" + expectedHtmlStatement;

      assert.equal(customer.statement(), expectedStatement);
    });
  });

  describe("with rentals", () => {
    beforeEach(() => {
      customer.addRental(new Rental(regularMovie, 1));
    });

    it("should have a statement in both text and HTML formats", () => {
      const expectedTextStatement =
        "Rental record for Martin\n\tMad Max\t2\nAmount owed is $2\nYou earned 1 frequent renter points";
      const expectedHtmlStatement = `<h1>Rental Record for <strong>Martin</strong></h1>\n<ul>\n<li>Mad Max: $2</li>\n</ul>\n<p>Amount owed is $2</p>\n<p>You earned 1 frequent renter points</p>`;

      const expectedStatement =
        expectedTextStatement + "\n" + expectedHtmlStatement;

      assert.equal(customer.statement(), expectedStatement);
    });
  });

  describe("with one regular rental", () => {
    describe("for 1 day", () => {
      beforeEach(() => {
        customer.addRental(new Rental(regularMovie, 1));
      });

      it("should owe $2", () => {
        assert.include(customer.statement(), "Amount owed is $2");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("for 2 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(regularMovie, 2));
      });

      it("should owe $2", () => {
        assert.include(customer.statement(), "Amount owed is $2");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("for 3 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(regularMovie, 3));
      });

      it("should owe $3.5", () => {
        assert.include(customer.statement(), "Amount owed is $3.5");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });
  });

  describe("with one new release rental", () => {
    describe("for 1 day", () => {
      beforeEach(() => {
        customer.addRental(new Rental(newMovie, 1));
      });

      it("should owe $3", () => {
        assert.include(customer.statement(), "Amount owed is $3");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("for 2 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(newMovie, 2));
      });

      it("should owe $6", () => {
        assert.include(customer.statement(), "Amount owed is $6");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 2 frequent renter points"
        );
      });
    });

    describe("for 3 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(newMovie, 3));
      });

      it("should owe $9", () => {
        assert.include(customer.statement(), "Amount owed is $9");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 2 frequent renter points"
        );
      });
    });
  });

  describe("with one childrens release rental", () => {
    describe("for 1 day", () => {
      beforeEach(() => {
        customer.addRental(new Rental(childrensMovie, 1));
      });

      it("should owe $1.5", () => {
        assert.include(customer.statement(), "Amount owed is $1.5");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("for 3 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(childrensMovie, 3));
      });

      it("should owe $1.5", () => {
        assert.include(customer.statement(), "Amount owed is $1.5");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("for 4 days", () => {
      beforeEach(() => {
        customer.addRental(new Rental(childrensMovie, 4));
      });

      it("should owe $3", () => {
        assert.include(customer.statement(), "Amount owed is $3");
      });

      it("should have a frequent renter point", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("calculates the correct rental fee and frequent renter points for multiple movies", () => {
      beforeEach(() => {
        customer.addRental(new Rental(newMovie, 3));
        customer.addRental(new Rental(regularMovie, 3));
      });

      it("should owe $12.5", () => {
        assert.include(customer.statement(), "Amount owed is $12.5");
      });

      it("should have 3 frequent renter points", () => {
        assert.include(
          customer.statement(),
          "You earned 3 frequent renter points"
        );
      });
    });

    describe("calculates the correct rental fee and frequent renter points for a regular movie", () => {
      beforeEach(() => {
        customer.addRental(new Rental(regularMovie, 4));
      });

      it("should owe $5", () => {
        assert.include(customer.statement(), "Amount owed is $5");
      });

      it("should have 1 frequent renter points", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });

    describe("calculates the correct rental fee and frequent renter points for a new movie", () => {
      beforeEach(() => {
        customer.addRental(new Rental(newMovie, 4));
      });

      it("should owe $12", () => {
        assert.include(customer.statement(), "Amount owed is $12");
      });

      it("should have 2 frequent renter points", () => {
        assert.include(
          customer.statement(),
          "You earned 2 frequent renter points"
        );
      });
    });

    describe("calculates the correct rental fee and frequent renter points for a childrens movie", () => {
      beforeEach(() => {
        customer.addRental(new Rental(childrensMovie, 4));
      });

      it("should owe $3", () => {
        assert.include(customer.statement(), "Amount owed is $3");
      });

      it("should have 1 frequent renter points", () => {
        assert.include(
          customer.statement(),
          "You earned 1 frequent renter points"
        );
      });
    });
  });
});

mocha.run(() => {});
