export const ingredients = [
  {
    id: 1,
    name: "wheat flour",
    estimatedCostInCents: 142,
  },
  {
    id: 2,
    name: "salt",
    estimatedCostInCents: 34,
  },
  {
    id: 3,
    name: "eggs",
    estimatedCostInCents: 472,
  },
  {
    id: 4,
    name: "sucrose",
    estimatedCostInCents: 902,
  },
  {
    id: 5,
    name: "tortillas",
    estimatedCostInCents: 520,
  },
  {
    id: 6,
    name: "shredded cheese",
    estimatedCostInCents: 660,
  },
  {
    id: 7,
    name: "black olives",
    estimatedCostInCents: 200,
  },
  {
    id: 8,
    name: "white bread",
    estimatedCostInCents: 325,
  },
  {
    id: 9,
    name: "deli turkey",
    estimatedCostInCents: 415,
  },
  {
    id: 10,
    name: "mayonaise",
    estimatedCostInCents: 45,
  },
  {
    id: 11,
    name: "lettuce",
    estimatedCostInCents: 95,
  },
];

export const recipes = [
  {
    id: 20,
    image: "https://example.com/1.jpg",
    ingredients: [
      {
        id: 1,
        quantity: {
          amount: 1.5,
          unit: "c",
        },
      },
      {
        id: 2,
        quantity: {
          amount: 1.5,
          unit: "tsp",
        },
      },
      {
        id: 3,
        quantity: {
          amount: 0.5,
          unit: "tsp",
        },
      },
      {
        id: 4,
        quantity: {
          amount: 0.5,
          unit: "tsp",
        },
      },
    ],
    instructions: [
      {
        instruction: "mix flour, salt and sugar together",
        number: 1,
      },
      {
        instruction: "Add egg and mix until combined.",
        number: 2,
      },
      {
        instruction: "heat griddle to 350 and cook unitl golden brown",
        number: 3,
      },
    ],
    name: "Pancakes",
    tags: ["breakfast", "snack", "appetizer"],
  },
  {
    id: 21,
    image: "https://example.com/2",
    ingredients: [
      {
        id: 5,
        quantity: {
          amount: 2,
          unit: "c",
        },
      },
      {
        id: 6,
        quantity: {
          amount: 1.5,
          unit: "c",
        },
      },
      {
        id: 7,
        quantity: {
          amount: 4,
          unit: "tsp",
        },
      },
    ],
    instructions: [
      {
        instruction: "place tortillas on a plate",
        number: 1,
      },
      {
        instruction: "cover evenly with shredded cheese and olives.",
        number: 2,
      },
      {
        instruction: "microwave on high for 1 and half minutes",
        number: 3,
      },
    ],
    name: "Notchos",
    tags: [
      "dinner",
      "snack",
      "appetizer",
      "hor d'oeuvre",
      "starter",
      "side dish",
    ],
  },
  {
    id: 22,
    image: "https://example.com/3",
    ingredients: [
      {
        id: 8,
        quantity: {
          amount: 2,
          unit: "slices",
        },
      },
      {
        id: 9,
        quantity: {
          amount: 4,
          unit: "oz",
        },
      },
      {
        id: 10,
        quantity: {
          amount: 2,
          unit: "oz",
        },
      },
      {
        id: 11,
        quantity: {
          amount: 2,
          unit: "oz",
        },
      },
    ],
    instructions: [
      {
        instruction: "place bread slices on plate",
        number: 1,
      },
      {
        instruction: "spread mayo onto bread",
        number: 2,
      },
      {
        instruction: "add lettuce",
        number: 3,
      },
    ],
    name: "Turkey Sandwich",
    tags: ["dinner", "snack", "lunch", "late night", "sandwiches"],
  },
];

export const users = [
  {
    name: "Saige O'Kon",
    id: 1,
    recipesToCook: [],
  },
  {
    name: "Ephraim Goyette",
    id: 2,
    recipesToCook: [],
  },
  {
    name: "Nelda Bosco",
    id: 3,
    recipesToCook: [],
  },
  {
    name: "Clinton Goodwin",
    id: 4,
    recipesToCook: [],
  },
  {
    name: "Buford DuBuque",
    id: 5,
    recipesToCook: [],
  },
];

export const currencies = [
  {name: canadianDollar, conversionRate: 1.38},
  {name: britishPound, conversionRate: 0.80},
  {name: euro, conversionRate: 0.94},
  {name: swedishKrona, conversionRate: 10.88},
  {name: japaneseYen, conversionRate: 153.28},
  {name: chineseYuan, conversionRate: 7.24},
  {name: australianDollar, conversionRate: 1.54},
  {name: indianRupee, conversionRate: 83.61},
  {name: hatianGourde, conversionRate: 132.27},
]

