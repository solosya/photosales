export const discounts = {
    lineItems: [
        {
            id: 1,
            ammount : 2,
            type: 'subtract',
            applyTo: 'rest',
            quantity: 2
        },
        {
            id: 2,
            ammount : 10,
            type: 'fixed',
            applyTo: 'rest',
            quantity: 2,
        },
        {
            id: 3,
            ammount : 20,
            type: 'fixed',
            applyTo: 'rest',
            quantity: 3,
        },
        {
            id: 4,
            ammount : 25,
            type: 'fixed',
            applyTo: 'rest',
            quantity: 2,
        },
        {
            id: 5,
            ammount : 50,
            type: 'fixed',
            applyTo: 'rest',
            quantity: 2,
        },

    ],
    // category: [],
    cart: [
        {
            id: 51,
            priority: 7,
            discount : [
                {
                    id:66,
                    quantity: 2,
                    ammount:10,
                    type: 'percent',
                    applyTo: 'all',
                },
                {
                    id:77,
                    quantity: 6,
                    ammount:20,
                    type: 'fixed',
                    applyTo: 'all',
                }
            ],
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
                },
                {
                    id:46,
                    quantity: 6,
                    ammount:10,
                    type: 'fixed',
                    applyTo: 'all',
                }
            ],
            rules: {
                // productType: 'photo',
                // category: "digitals",
                // tags: [],
                products: [22],
            }
        },
        {
            id: 53,
            priority: 12,
            discount : [
                {
                    id:99,
                    quantity: 2,
                    ammount:555,
                    type: 'fixed',
                    applyTo: 'all',
                },
                {
                    id:87,
                    quantity: 4,
                    ammount:444,
                    type: 'fixed',
                    applyTo: 'all',
                }
            ],
            rules: {
                // productType: 'photo',
                category: "digital",
                // tags: [],
                // products: [1],
            }
        },

    ]
};

export const products = {
    print: [
        {
            id: 3,
            label: '6" x 4" ($5, additional copies $2)',
            price : 5,
            priceTotal: 5,
            priceTotalFull: 5,
            discount: [1],
            category: 'print',

        },
        {
            id: 4,
            label: '7" x 5" ($7, additional copies $2)',
            price : 7,
            priceTotal: 7,
            priceTotalFull: 7,
            discount: [1],
            category: 'print',

        },
        {
            id: 5,
            label: '8" x 6" ($7, additional copies $2)',
            price : 7,
            priceTotal: 7,
            priceTotalFull: 7,
            discount: [1],
            category: 'print',

        },
        {
            id: 6,
            label: '12" x 8" ($15, additional copies $10)',
            price : 15,
            priceTotal: 15,
            priceTotalFull: 15,
            discount: [2],
            category: 'print',
        },
        {
            id: 6,
            label: '14" x 11" ($25, additional copies $20)',
            price : 25,
            priceTotal: 25,
            priceTotalFull: 25,
            discount: [3],
            category: 'print',
        },
        {
            id: 7,
            label: '18" x 12" ($30, additional copies $25)',
            price : 30,
            priceTotal: 30,
            priceTotalFull: 30,
            discount: [4],
            category: 'print',
        },
        {
            id: 8,
            label: '36" x 24" ($55, additional copies $50)',
            price : 55,
            priceTotal: 55,
            priceTotalFull: 55,
            discount: [5],
            category: 'print',
        }
    ],
    digital: [
        {
            id: 22,
            label: 'Personal or single use',
            price :  20, // original price per item
            priceTotal: 20, // accumulated total with discount
            priceTotalFull: 20, // accumulated total without discount
            category: 'digital',
        },
        {
            id: 33,
            label: 'Commercial use',
            price : 50,
            priceTotal: 50,
            priceTotalFull: 50,
            category: 'digital',
        },
    ]
}