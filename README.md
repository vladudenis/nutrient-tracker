# Nutrient Tracker

Nutrient Tracker is a web application that allows users to input foods they ate in a day and provides an overview of all the nutrients consumed.

If the user is signed in and wishes to save his daily inputs, these will be added to a collection that provides a nutrition weekly, monthly, yearly or custom overview. The user will also be warned in case there are any nutritional deficiencies.

## Getting Started

Run the Next.js development server (localhost:3000):

```bash
npm run dev
```

## TODO

- Nutrition Plan Page
  - Optionally let user enter a nutrition plan
    - Three accordion options: default="I want to maintain my weight", "I want to gain weight", "I want to lose weight"
    - Let user enter target weight
    - Let user enter target macro intake
    - Calculate caloric intake for reaching weight target
  - Calculate BMI
  - Show caloric intake thresholds for weight loss/gain
  - Update % Daily Value for every nutrientInfo of a signed in user that has configured their body info
    .
- Profile hover menu
  - Caloric intake so far today out of recommended value / target
  - Caloric intake status: Red arrow down = heavy deficit, yellow wave = small deficit or surplus, green check = approximately reached goal, red arrow up = heavy surplus
  - Same for all macros
    .
- Profile picture placeholder (in case user doesn't have image on third party platform)

## Test cases and bug fix

- Nutrient intake + parse failure
