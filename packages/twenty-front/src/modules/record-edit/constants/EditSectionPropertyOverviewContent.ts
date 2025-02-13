import { SectionContent } from '@/record-edit/types/EditSectionTypes';
import { FinancialOverviewGroup } from './snippets/FinancialOverviewGroup';

// TODO use graphql types of standard entities to reference the field names!
// Field will use inline fields and input will use form inputs
export const OVERVIEW_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Basic Information',
    groups: [
      {
        fields: [
          { name: 'name', type: 'input', fieldWidth: 0 },
          { name: 'description', type: 'multiLine', fieldWidth: 0 },
        ],
      },
    ],
  },
  {
    title: 'Key Details',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'category', type: 'field' },
          { name: 'stage', type: 'field' },
          { name: 'availableFrom', type: 'field' },
        ],
      },
    ],
  },
  {
    title: 'Price Overview',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'sellingPrice', type: 'input' },
          { name: 'rentNet', type: 'input' },
          { name: 'rentExtra', type: 'input' },
        ],
      },
    ],
  },
  {
    title: 'Property Dimensions',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'rooms', type: 'input', fieldWidth: 80 },
          { name: 'surface', type: 'input', fieldWidth: 120 },
          { name: 'volume', type: 'input', fieldWidth: 120 },
        ],
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
