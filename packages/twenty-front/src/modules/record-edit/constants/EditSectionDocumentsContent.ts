import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const DOCUMENTS_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Media',
    groups: [
      {
        fields: [{ name: 'pictures', type: 'field' }],
      },
      {
        fields: [{ name: 'movies', type: 'field' }],
      },
    ],
  },
  {
    title: 'Documents',
    groups: [
      {
        fields: [{ name: 'documents', type: 'field' }],
      },
    ],
  },
  {
    title: 'External Links',
    groups: [
      {
        fields: [{ name: 'links', type: 'field' }],
      },
      {
        fields: [{ name: 'virtualTour', type: 'field' }],
      },
    ],
  },
  {
    title: 'Publications',
    groups: [
      {
        fields: [{ name: 'publications', type: 'field' }],
      },
    ],
  },
];
