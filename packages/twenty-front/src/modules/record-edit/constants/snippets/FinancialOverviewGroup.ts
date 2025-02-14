import { FieldGroup } from '../../types/EditSectionTypes';

export const FinancialOverviewGroup: FieldGroup = {
  isHorizontal: true,
  fields: [
    {
      name: 'priceUnit',
      type: 'field',
    },
    {
      name: 'rentNet',
      type: 'input',
      fieldWidth: 150,
      conditionFields: ['priceUnit'],
      conditionValues: [
        'monthly',
        'yearly',
        'yearly_square_meter',
        'weekly',
        'daily',
      ],
    },
    {
      name: 'rentExtra',
      type: 'input',
      fieldWidth: 150,
      conditionFields: ['priceUnit'],
      conditionValues: [
        'monthly',
        'yearly',
        'yearly_square_meter',
        'weekly',
        'daily',
      ],
    },

    {
      name: 'sellingPrice',
      type: 'input',
      conditionFields: ['priceUnit'],
      conditionValues: ['sell', 'sell_square_meter'],
    },
  ],
};
