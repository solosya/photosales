export const Discounts = [
    {
        id: 200,
        discount : [
            {
                id:66,
                quantity: 2,
                ammount:14,
                type: 'percent',
                applyTo: 'all',
                name: "Additional copies $2",
                active: true
            },
        ],
        dates: {
            from: '2019-05-08',
            to: '2019-10-01'
        },
        type: 'lineitem',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [3,4,5],
        }
    },
    {
        id: 201,
        discount : [
            {
                id:67,
                quantity: 3,
                ammount:3,
                type: 'subtract',
                applyTo: 'rest',
                name: "additional copies $10",
                active: true
            },
        ],
        dates: {
            from: '2019-05-08',
            to: '2019-10-01'
        },
        type: 'lineitem',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [6],
        }
    },
    {
        id: 202,
        discount : [
            {
                id:745,
                quantity: 2,
                ammount:20,
                type: 'fixed',
                applyTo: 'rest',
                name: "additional copies $20",
                active: true
            },
        ],
        dates: {
            from: '2019-05-08',
            to: '2019-10-01'
        },
        type: 'lineitem',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [7],
        }
    },
    {
        id: 203,
        discount : [
            {
                id:745,
                quantity: 2,
                ammount:25,
                type: 'fixed',
                applyTo: 'rest',
                name: "additional copies $25",
                active: true
            },
        ],
        dates: {
            from: '2019-05-08',
            to: '2019-10-01'
        },
        type: 'lineitem',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [8],
        }
    },
    {
        id: 204,
        discount : [
            {
                id:745,
                quantity: 2,
                ammount:2,
                type: 'fixed',
                applyTo: 'rest',
                name: "additional copies $50",
                active: true
            },
        ],
        dates: {
            from: '2019-05-08',
            to: '2019-10-01'
        },
        type: 'lineitem',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [],
        }
    },

    {
        id: 51,
        discount : [
            {
                id:66,
                quantity: 2,
                ammount:30,
                type: 'fixed',
                applyTo: 'all',
                name: "2 or more Commercial",
                active: true
            },
            {
                id:77,
                quantity: 6,
                ammount:20,
                type: 'fixed',
                applyTo: 'all',
                name: "6 or more Commercial",
                active: true
            }
        ],
        type: 'cart',
        rules: {
            // productType: 'photo',
            // category: "digital",
            // tags: [],
            products: [33],
        }
    },
    {
        id: 52,
        priority: 8,
        discount : [
            {
                id: 45,
                quantity: 2,
                ammount:15,
                type: 'fixed',
                applyTo: 'all',
                active: true
            },
            {
                id:46,
                quantity: 6,
                ammount:10,
                type: 'fixed',
                applyTo: 'all',
                active: true
            }
        ],
        type: 'cart',
        rules: {
            // productType: 'photo',
            // category: "digitals",
            // tags: [],
            products: [23],
        }
    },
    {
        id: 53,
        priority: 12,
        active: true,
        discount : [
            {
                id:99,
                quantity: 2,
                ammount:555,
                type: 'fixed',
                applyTo: 'all',
                active: true

            },
            {
                id:87,
                quantity: 4,
                ammount:444,
                type: 'fixed',
                applyTo: 'all',
                active: true
            }
        ],
        rules: {
            // productType: 'photo',
            category: "digital",
            // tags: [],
            // products: [1],
        }
    },
    {
        id: 53,
        priority: 12,
        active: true,
        discount : [
            {
                id:99,
                quantity: 2,
                ammount:100,
                type: 'fixed',
                applyTo: 'all',
            },
            {
                id:87,
                quantity: 4,
                ammount:75,
                type: 'fixed',
                applyTo: 'all',
            }
        ],
        rules: {
            // productType: 'photo',
            category: "print",
            // tags: [],
            // products: [1],
        }
    }

];

export const products = [
    {
        id: 3,
        label: '6" x 4" ($5, additional copies $2)',
        name: '6" x 4"',
        price : 5,
        category: 'print',
    },
    {
        id: 4,
        label: '7" x 5" ($7, additional copies $2)',
        name: '7" x 5"',
        price : 7,
        category: 'print',

    },
    {
        id: 5,
        label: '8" x 6" ($7, additional copies $2)',
        name: '7" x 5"',
        price : 7,
        category: 'print',

    },
    {
        id: 6,
        label: '12" x 8" ($15, additional copies $10)',
        name: '7" x 5"',
        price : 15,
        category: 'print',
    },
    {
        id: 7,
        label: '14" x 11" ($25, additional copies $20)',
        name: '7" x 5"',
        price : 25,
        category: 'print',
    },
    {
        id: 8,
        label: '18" x 12" ($30, additional copies $25)',
        name: '7" x 5"',
        price : 30,
        category: 'print',
    },
    {
        id: 9,
        label: '36" x 24" ($55, additional copies $50)',
        name: '7" x 5"',
        price : 55,
        category: 'print',
    },
    {
        id: 22,
        label: 'Personal or single use',
        name: '7" x 5"',
        price :  20, // original price per item
        category: 'digital',
    },
    {
        id: 33,
        label: 'Commercial use',
        name: '7" x 5"',
        price : 50,
        category: 'digital',
    }
];

