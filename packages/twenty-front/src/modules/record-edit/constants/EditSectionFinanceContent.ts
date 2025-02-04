import { SectionContent } from '@/record-edit/types/EditSectionTypes';
import { FinancialOverviewGroup } from './snippets/FinancialOverviewGroup';

// Field will use inline fields and input will use form inputs
export const FINANCE_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Financial Details',
    groups: FinancialOverviewGroup,
  },
];
