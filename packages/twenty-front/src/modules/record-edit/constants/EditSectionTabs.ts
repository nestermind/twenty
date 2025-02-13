import { Section } from '@/record-edit/types/EditSectionTypes';
import {
  IconBuildingSkyscraper,
  IconFile,
  IconHome,
  IconMap,
  IconMoneybag,
} from 'twenty-ui';
import { AMENITIES_SECTION_CONTENT } from './EditSectionAmenitiesContent';
import { DOCUMENTS_SECTION_CONTENT } from './EditSectionDocumentsContent';
import { FINANCIAL_SECTION_CONTENT } from './EditSectionFinanceContent';
import { LOCATION_SECTION_CONTENT } from './EditSectionLocationContent';
import { OVERVIEW_SECTION_CONTENT } from './EditSectionPropertyOverviewContent';

export const EDIT_SECTIONS_TABS: Section[] = [
  {
    id: 'property-overview',
    title: 'Overview',
    Icon: IconHome,
    content: OVERVIEW_SECTION_CONTENT,
  },
  {
    id: 'property-financial',
    title: 'Financial',
    Icon: IconMoneybag,
    content: FINANCIAL_SECTION_CONTENT,
  },
  {
    id: 'property-amenities',
    title: 'Features & Details',
    Icon: IconBuildingSkyscraper,
    content: AMENITIES_SECTION_CONTENT,
  },
  {
    id: 'property-location',
    title: 'Location',
    Icon: IconMap,
    content: LOCATION_SECTION_CONTENT,
  },
  {
    id: 'property-documents',
    title: 'Media & Documents',
    Icon: IconFile,
    content: DOCUMENTS_SECTION_CONTENT,
  },
];
