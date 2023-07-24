# Nutrient Tracker

Nutrient Tracker is a web application that allows users to input foods they ate in a day and provides an overview of all the nutrients consumed.

If the user is signed in and wishes to save his daily inputs, these will be added to a collection that provides a nutrition weekly, monthly, yearly or custom overview. The user will also be warned in case there are any nutritional deficiencies.

## About

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the Next.js development server (localhost:3000):

```bash
npm run dev
```

Run Convex development environment:

```bash
npx convex dev
```

## TODO

- Button for calculating the total nutrients if there are multiple nutrient cards being shown
  .
- Functionality to the save nutrient intake button when not signed in
- After first signing in, redirect to My Body and open a configuration dialog
  - Let user enter his sex, height, weight, training intensity, optionally bodyfat%
  - Optionally let user enter a nutrition plan
    - Three accordion options: default="I want to maintain my weight", "I want to gain weight", "I want to lose weight"
    - Let user enter target weight
    - Let user enter target macro intake
    - Calculate caloric intake for reaching weight target
  - Calculate BMI
  - Show recommended caloric intake to maintain weight
  - Show caloric intake thresholds for weight loss/gain
  - Update % Daily Value for every nutrientInfo of a signed in user that has configured their body info
    .
- Design pages Nutrition History, My Statistics, Nutrition Plan and My Body
  .
- Profile hover menu
  - Caloric intake so far today out of recommended value / target
  - Caloric intake status: Red arrow down = heavy deficit, yellow wave = small deficit or surplus, green check = approximately reached goal, red arrow up = heavy surplus
  - Same for all macros
- Report Bug button next to profile area in navbar
  .
- Profile picture placeholder (in case user doesn't have image on third party platform)
