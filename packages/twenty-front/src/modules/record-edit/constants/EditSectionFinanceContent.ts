import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const FINANCIAL_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Pricing',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'sellingPrice', type: 'input', fieldWidth: 160 },
          { name: 'priceUnit', type: 'field' },
          { name: 'valuation', type: 'input', fieldWidth: 160 },
        ],
      },
      {
        isHorizontal: true,
        fields: [
          { name: 'rentNet', type: 'input', fieldWidth: 160 },
          { name: 'rentExtra', type: 'input', fieldWidth: 160 },
        ],
      },
    ],
  },
  {
    title: 'Stakeholders',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'seller', type: 'field' },
          { name: 'agency', type: 'field' },
          { name: 'assignee', type: 'field' },
        ],
      },
    ],
  },
  {
    title: 'Leads',
    groups: [
      {
        fields: [{ name: 'buyerLeads', type: 'field' }],
      },
    ],
  },
];
