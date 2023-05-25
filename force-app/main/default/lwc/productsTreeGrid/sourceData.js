/**
 * Default settings values
 */
export const KEYFIELD = 'name';

/**
 * Columns definition
 * :: used in examples
 */
export const EXAMPLES_COLUMNS_DEFINITION_BASIC = [
    {
        type: 'text',
        fieldName: 'productName',
        label: 'Product Name',
        initialWidth: 300,
    },
    {
        type: 'currency',
        fieldName: 'price',
        label: 'Price',
    },
];

/**
 * Sample data
 * :: used by examples
 */
export const EXAMPLES_DATA_BASIC = [
    {
        id: '0',
        productName: 'P.Kit 1',
        price: 60.00,
        _children: [
            {
                id: '1',
                productName: 'Simple 1',
                price: 10.00
            },
            {
                id: '2',
                productName: 'Simple 2',
                price: 20.00
            },
            {
                id: '3',
                productName: 'Simple 3',
                price: 30.00
            }
        ]
    },
    {
        id: '4',
        productName: 'Simple 4',
        price: 100.00
    },
    {
        id: '5',
        productName: 'P.Kit 2',
        price: 10.00,
        _children: [
            {
                id: '6',
                productName: 'Simple 5',
                price: 1.00
            },
            {
                id: '7',
                productName: 'Simple 6',
                price: 9.00
            }
        ]
    }
];
