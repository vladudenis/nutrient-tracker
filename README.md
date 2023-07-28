# Nutrient Tracker

Nutrient Tracker is a web application that allows users to input foods they ate in a day and provides an overview of all the nutrients consumed.

If the user is signed in and wishes to save his daily inputs, these will be added to a collection that provides a nutrition weekly, monthly, yearly or custom overview. The user will also be warned in case there are any nutritional deficiencies.

## Getting Started

Run the Next.js development server (localhost:3000):

```bash
npm run dev
```

Run the Convex development environment:

```bash
npx convex dev
```

## TODO

- Nutrition Plan page
  - User should enter % instead of grams of macronutrients to ensure that 100% of caloric value cannot be surpassed (steps of 5)
  - User cannot set/update daily target unless the total is equal to 100%
  - Fix problems with insert/update
  - Update % Daily Value for every nutrientInfo of a signed in user that has configured their body info
- Profile hover menu
  - Caloric intake so far today out of recommended value / target
  - Caloric intake status: Red arrow down = heavy deficit, yellow wave = small deficit or surplus, green check = approximately reached goal, red arrow up = heavy surplus
  - Same for all macros
- Nutrition History page
  - Implement logic for calculating deficiencies and surpluses
  - Pagination or "load 10 more entries" logic

## Test cases and bug fix

- Nutrient intake + parse failure
