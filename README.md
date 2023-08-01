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

- Nutrition History page
  - Implement logic for calculating deficiencies and surpluses
  - Pagination or "load 10 more entries" logic
- Add Statistics

## Test cases and bug fix

- Make app responsive for tablet and smart phone
- Nutrient intake + parse failure
