import { FieldGroup } from '../../types/EditSectionTypes';

export const FinancialOverviewGroup: FieldGroup[] = [
  {
    isHorizontal: true,
    fields: [
      { name: 'offerType', type: 'field' },
      { name: 'type', type: 'input' },
      {
        name: 'price',
        type: 'input',
        conditionFields: ['offerType'],
        // TODO: Use Enum Types once available
        conditionValues: ['sale'],
        fieldWidth: 100,
      },
      {
        name: 'rent',
        type: 'input',
        conditionFields: ['offerType'],
        // TODO: Use Enum Types once available
        conditionValues: ['rent'],
        fieldWidth: 100,
      },
      {
        name: 'financing',
        type: 'input',
        fieldWidth: 100,
      },
      {
        name: 'lastSaleDate',
        type: 'field',
        conditionFields: ['offerType'],
        // TODO: Use Enum Types once available
        conditionValues: ['sale'],
        fieldWidth: 100,
      },
    ],
  },
];
