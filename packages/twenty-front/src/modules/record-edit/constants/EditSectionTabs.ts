import { OVERVIEW_SECTION_CONTENT } from '@/record-edit/constants/EditSectionPropertyOverviewContent';
import { Section } from '@/record-edit/types/EditSectionTypes';
// eslint-disable-next-line no-restricted-imports
import {
  IconBuildingCommunity,
  IconFile,
  IconHistory,
  IconHome2,
  IconMapPin,
  IconTool,
} from '@tabler/icons-react';

export const EDIT_SECTIONS_TABS: Section[] = [
  {
    id: 'property-overview',
    title: 'Property Overview',
    Icon: IconHome2,
    content: OVERVIEW_SECTION_CONTENT,
  },
  {
    id: 'property-amenities',
    title: 'Amenities',
    Icon: IconBuildingCommunity,
    content: [],
  },
  {
    id: 'property-location',
    title: 'Location',
    Icon: IconMapPin,
    content: [],
  },
  {
    id: 'property-documents',
    title: 'Documents',
    Icon: IconFile,
    content: [],
  },
  {
    id: 'property-history',
    title: 'History',
    Icon: IconHistory,
    content: [],
  },
  {
    id: 'property-maintenance',
    title: 'Maintenance',
    Icon: IconTool,
    content: [],
  },
];
