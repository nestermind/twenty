import { SectionContent } from '@/record-edit/types/EditSectionTypes';
import { FinancialOverviewGroup } from './snippets/FinancialOverviewGroup';

// TODO use graphql types of standard entities to reference the field names!
// Field will use inline fields and input will use form inputs
export const OVERVIEW_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Title and Description',
    groups: [
      {
        // fieldWidth = 0 means 100% width
        fields: [{ name: 'name', type: 'input', fieldWidth: 0 }],
      },
      {
        fields: [{ name: 'description', type: 'multiLine', fieldWidth: 0 }],
      },
    ],
  },
  {
    title: 'Property Details',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'squareMeters', type: 'input', fieldWidth: 120 },
          { name: 'rooms', type: 'input', fieldWidth: 80 },
          { name: 'yearBuilt', type: 'input', fieldWidth: 80 },
          {
            name: 'useableSurface',
            type: 'input',
            fieldWidth: 140,
          },
        ],
      },
      {
        isHorizontal: true,
        fields: [{ name: 'floors', type: 'input', fieldWidth: 120 }],
      },
      {
        isHorizontal: true,
        fields: [
          { name: 'category', type: 'field' },
          { name: 'subType', type: 'field' },
          { name: 'availableFrom', type: 'field' },
        ],
      },
      {
        isHorizontal: true,
        fields: [{ name: 'traits', type: 'field' }],
      },
    ],
  },
  {
    title: 'Financial Details',
    groups: FinancialOverviewGroup,
  },
  {
    title: 'Address',
    groups: [
      {
        fields: [{ name: 'address', type: 'input', hideLabel: true }],
      },
    ],
  },
];
