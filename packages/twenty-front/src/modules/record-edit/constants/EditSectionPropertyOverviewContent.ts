import { SectionContent } from '@/record-edit/types/EditSectionTypes';

// TODO use graphql types of standard entities to reference the field names!
// Field will use inline fields and input will use form inputs
export const OVERVIEW_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Basic Information',
    width: 'half',
    groups: [
      {
        fields: [
          { name: 'name', type: 'input', fieldWidth: 0 },
          { name: 'description', type: 'multiLine', fieldWidth: 0 },
        ],
      },
      {
        isHorizontal: true,
        fields: [
          { name: 'category', type: 'field' },
          { name: 'stage', type: 'field' },
        ],
      },
    ],
  },
  {
    title: 'Key Numbers',
    width: 'half',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'rooms', type: 'input', fieldWidth: 80 },
          { name: 'surface', type: 'input', fieldWidth: 120 },
        ],
      },
      {
        isHorizontal: true,
        fields: [
          { name: 'volume', type: 'input', fieldWidth: 120 },
          { name: 'numberOfFloors', type: 'input', fieldWidth: 150 },
        ],
      },
      {
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
            conditionValues: ['monthly'],
          },
          {
            name: 'rentExtra',
            type: 'input',
            fieldWidth: 150,
            conditionFields: ['priceUnit'],
            conditionValues: ['monthly'],
          },

          {
            name: 'sellingPrice',
            type: 'input',
            conditionFields: ['priceUnit'],
            conditionValues: ['sell'],
          },
        ],
      },
    ],
  },
  {
    title: 'Location',
    width: 'third',
    groups: [
      {
        fields: [
          { name: 'address', type: 'input', hideLabel: true },
          { name: 'availableFrom', type: 'field' },
        ],
      },
    ],
  },
];
