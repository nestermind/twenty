import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const AMENITIES_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Property Type',
    groups: [
      {
        isHorizontal: true,
        fields: [{ name: 'category', type: 'field' }],
      },
      {
        isHorizontal: true,
        fields: [
          {
            name: 'apartmentSubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['apartment'],
          },
          {
            name: 'houseSubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['house'],
          },
          {
            name: 'plotSubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['plot'],
          },
          {
            name: 'propertySubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['property'],
          },
          {
            name: 'gastronomySubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['gastronomy'],
          },
          {
            name: 'industrialSubtype',
            type: 'field',
            conditionFields: ['category'],
            conditionValues: ['industrial'],
          },
        ],
      },
    ],
  },
  {
    title: 'Building Details',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'constructionYear', type: 'input', fieldWidth: 120 },
          { name: 'renovationYear', type: 'input', fieldWidth: 120 },
          { name: 'numberOfFloors', type: 'input', fieldWidth: 140 },
        ],
      },
      {
        isHorizontal: true,
        fields: [
          { name: 'floor', type: 'input', fieldWidth: 80 },
          { name: 'ceilingHeight', type: 'input', fieldWidth: 120 },
          { name: 'hallHeight', type: 'input', fieldWidth: 120 },
        ],
      },
    ],
  },
  {
    title: 'Technical Specifications',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'maximalFloorLoading', type: 'input', fieldWidth: 160 },
          { name: 'carryingCapacityCrane', type: 'input', fieldWidth: 160 },
          { name: 'carryingCapacityElevator', type: 'input', fieldWidth: 160 },
        ],
      },
    ],
  },
  {
    title: 'Property Features',
    groups: [
      {
        fields: [{ name: 'features', type: 'field' }],
      },
    ],
  },
];
