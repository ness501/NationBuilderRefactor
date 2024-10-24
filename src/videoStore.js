/**
 * Problem statement:
 * You will be refactoring code for a video rental store’s point of sale
 * system. The system generates statements for customers’ rental transactions.
 * The current system provides a plain text statement. Please add the ability
 * to print out an HTML statement. Additionally, keep in mind that the Product
 * team has already expressed a desire to be able to output statements in
 * more unspecified formats in the future.
 *
 * Business logic:
 * https://gist.github.com/fourtwentyfour/46de4742d2b9406e60ae230959804da1
 *
 * Things to note:
 * The tests here, while not completely comprehensive, cover the current
 * requirements. Do not focus on changing the tests, but feel free to modify
 * and/or add any tests to validate your new functionality. We want to see
 * what you think of as well-factored code and understand your thought
 * process getting there. There is no “right” answer, and every implementation
 * will be different.
 *
 * It is highly encouraged to think out loud and ask questions. It will help
 * us gain insight into your critical thinking skills.
 **/

// What if a movie is returned before the two days?
// Should return both html and text, with future enhancements like a pdf etc
// Could add timestamps to track days rented ( time in/out )
// TODO create a Statement class ( notes below )

// priceCodes - UPDATED VARIABLE NAMES & MOVED TO TOP OF FILE
export const REGULAR_MOVIE_PRICECODE = 0;
export const NEW_RELEASE_MOVIE_PRICECODE = 1;
export const CHILDRENS_MOVIE_PRICECODE = 2;

export class Movie {
  constructor(title, priceCode) {
    this.title = title;
    this.priceCode = priceCode;
  }
}

export class Rental {
  constructor(movie, daysRented) {
    this.movie = movie;
    this.daysRented = daysRented;
    this.rentalFee = this.getRentalFee();
    this.frequentRenterPoints = this.getFrequentRenterPoints();
  }

  // Initially, I suggested using if-else conditions instead of switch cases,
  // but switch cases offer better clarity and are more readable.
  // Refactored the logic from Customer to Rental to ensure that each movie's fee is calculated
  // per rental, allowing for easy addition or modification of cases in the future.
  getRentalFee() {
    let feeAmount = 0;
    switch (this.movie.priceCode) {
      case REGULAR_MOVIE_PRICECODE:
        feeAmount += 2; // $2.00 for the first 2 days
        if (this.daysRented > 2) {
          feeAmount += (this.daysRented - 2) * 1.5; // extra $1.50 for each additional day
        }
        break;
      case NEW_RELEASE_MOVIE_PRICECODE:
        feeAmount += this.daysRented * 3; // $3.00 per day rented
        break;
      case CHILDRENS_MOVIE_PRICECODE:
        feeAmount += 1.5; // $1.50 for the first 3 days
        if (this.daysRented > 3) {
          feeAmount += (this.daysRented - 3) * 1.5; // extra $1.50 for each additional day
        }
        break;
    }
    return feeAmount;
  }

  // Implemented a frequent renter points calculation to determine points based on the movie type.
  // This approach allows for easy extension in the future to accommodate additional edge cases if needed.
  getFrequentRenterPoints() {
    let frequentRenterPoints = 1;

    if (
      this.movie.priceCode === NEW_RELEASE_MOVIE_PRICECODE &&
      this.daysRented > 1
    ) {
      // new releases get 1 extra point if you rent more than a day
      frequentRenterPoints += 1;
    }
    return frequentRenterPoints;
  }
}

export class Customer {
  constructor(name) {
    this.name = name;
    this.rentals = [];
  }

  addRental(rental) {
    this.rentals.push(rental);
  }

  // Another option is to pass an argument like desiredFormat = "text" into the statement() method,
  // then use conditionals to implement the desired output format for the result.
  statement() {
    let totalAmount = 0;
    let frequentRenterPoints = 0;

    // Currently, we are outputting both text and HTML.
    // In the future, a new Statement class could be created to handle
    // methods like generateHTMLStatement() or generatePDFStatement(), enabling more flexible output formats.
    let textResult = "Rental record for " + this.name + "\n";
    let htmlResult = `<h1>Rental Record for <strong>${this.name}</strong></h1>\n<ul>\n`;

    for (const rental of this.rentals) {
      const currentRentalAmount = rental.rentalFee;
      const currentFrequentRenterPoints = rental.frequentRenterPoints;

      totalAmount += currentRentalAmount;
      frequentRenterPoints += currentFrequentRenterPoints;

      textResult +=
        "\t" + rental.movie.title + "\t" + currentRentalAmount + "\n";
      htmlResult += `<li>${rental.movie.title}: $${currentRentalAmount}</li>\n`;
    }

    textResult += `Amount owed is $${totalAmount}\nYou earned ${frequentRenterPoints} frequent renter points`;
    htmlResult += `</ul>\n<p>Amount owed is $${totalAmount}</p>\n<p>You earned ${frequentRenterPoints} frequent renter points</p>`;

    return textResult + "\n" + htmlResult;
  }
}
