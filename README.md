# Refactoring Exercise

Refactor the existing code to print out an HTML statement as well as the text statement. Also be thinking to yourself, 'product is probably going to ask for another format soon', so keep in mind how extensible your solution is. When refactoring, we don't want to change the tests. They aren't the most comprehensive, but enough to keep yourself on the right track. When you add new functionality, the html statement, feel free to add or modify tests to verify your new code. The idea here is not a particular implementation. We want to see what you think of as well-factored code and your thought process getting there. Every implementation is different. Its a good idea to think out loud and ask questions.

# Business Logic

A customer can printout his statement. On the statement must appear:

- The customer's name
- Each movie he rents, with its price
- The total amount owed
- The frequent renter points he's earned

For each movie category, some rules apply.

Regular movies:

- amount is $2.00 for the first 2 days
- an extra $1.50 is added for each additional day
- you get 1 frequent renter point

New releases:

- amount is $3.00 per day rented
- you get 1 frequent renter point for the first day
- you get 1 extra frequent renter point if you rent more than a day

Children's movies:

- amount is $1.50 for the first 3 days
- an extra $1.50 is added for each additional day
- you get 1 frequent renter point
