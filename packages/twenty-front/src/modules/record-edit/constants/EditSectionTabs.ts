import { FINANCE_SECTION_CONTENT } from '@/record-edit/constants/EditSectionFinanceContent';
import { OVERVIEW_SECTION_CONTENT } from '@/record-edit/constants/EditSectionPropertyOverviewContent';
import { Section } from '@/record-edit/types/EditSectionTypes';
// eslint-disable-next-line no-restricted-imports
import { IconHome2, IconReportMoney } from '@tabler/icons-react';

export const EDIT_SECTIONS_TABS: Section[] = [
  {
    id: 'property-overview',
    title: 'Property Overview',
    Icon: IconHome2,
    content: OVERVIEW_SECTION_CONTENT,
  },
  {
    id: 'property-financials',
    title: 'Financials',
    Icon: IconReportMoney,
    content: FINANCE_SECTION_CONTENT,
  },
];
