import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { StatusBadge } from '@/object-record/record-show/components/nm/publication/StatusBadge';
import { useRecordShowContainerData } from '@/object-record/record-show/hooks/useRecordShowContainerData';
import styled from '@emotion/styled';
// eslint-disable-next-line no-restricted-imports
import {
    IconCalendarStats,
    IconChartBar,
    IconMessageCircle2,
} from '@tabler/icons-react';
import { IconBuildingSkyscraper, IconUsers } from 'twenty-ui';
import { ObjectOverview } from './ObjectOverview';
import { KPICard } from './publication/KPICard';

const StyledContentContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledRightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  margin: ${({ theme }) => theme.spacing(4)} 0;
  width: 100%;
`;

const StyledSection = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  width: 100%;
`;

const StyledSectionTitle = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.primary};
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
`;

const StyledSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledKPIGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StyledEmptyTable = styled.div`
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.light};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  justify-content: center;
  min-height: 120px;
  width: 100%;
`;

const StyledChartPlaceholder = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.light};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  height: 200px;
  justify-content: center;
  width: 100%;
`;

const StyledTwoColumns = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

const StyledLoadingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  width: 100%;
`;

type PublicationDetailsProps = {
  targetableObject: Pick<
    ActivityTargetableObject,
    'id' | 'targetObjectNameSingular'
  >;
};

export const PublicationDetails = ({
  targetableObject,
}: PublicationDetailsProps) => {
  const { recordFromStore: publication, recordLoading } =
    useRecordShowContainerData({
      objectNameSingular: targetableObject.targetObjectNameSingular,
      objectRecordId: targetableObject.id,
    });

  if (recordLoading || !publication) {
    return <StyledLoadingContainer>Loading...</StyledLoadingContainer>;
  }

  return (
    <StyledContentContainer>
      <ObjectOverview
        targetableObject={targetableObject}
        isInRightDrawer={false}
        isNewRightDrawerItemLoading={false}
        isPublication
      />
      <StyledRightContentContainer>
        <StyledKPIGrid>
          <KPICard
            label="Inquiries"
            value={publication.metrics?.inquiries || 0}
            icon={<IconMessageCircle2 size={16} />}
          />
          <KPICard
            label="Days Published"
            value={publication.metrics?.daysPublished || 0}
            icon={<IconCalendarStats size={16} />}
          />
          <KPICard
            label="Status"
            value={<StatusBadge status={publication.status} />}
            icon={<IconBuildingSkyscraper size={16} />}
          />
        </StyledKPIGrid>

        <StyledTwoColumns>
          <StyledSection>
            <StyledSectionTitle>
              <IconChartBar size={16} />
              Visitor Activity
            </StyledSectionTitle>
            <StyledSectionContent>
              <StyledChartPlaceholder>
                Visitor activity chart coming soon
              </StyledChartPlaceholder>
            </StyledSectionContent>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>
              <IconUsers size={16} />
              Recent Visitors
            </StyledSectionTitle>
            <StyledSectionContent>
              <StyledEmptyTable>No recent visitors yet</StyledEmptyTable>
            </StyledSectionContent>
          </StyledSection>
        </StyledTwoColumns>

        <StyledSection>
          <StyledSectionTitle>
            <IconMessageCircle2 size={16} />
            Recent Inquiries
          </StyledSectionTitle>
          <StyledSectionContent>
            <StyledEmptyTable>No inquiries yet</StyledEmptyTable>
          </StyledSectionContent>
        </StyledSection>

        <StyledTwoColumns>
          <StyledSection>
            <StyledSectionTitle>
              <IconChartBar size={16} />
              Price History
            </StyledSectionTitle>
            <StyledSectionContent>
              <StyledChartPlaceholder>
                Price history chart coming soon
              </StyledChartPlaceholder>
            </StyledSectionContent>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>
              <IconBuildingSkyscraper size={16} />
              Similar Properties
            </StyledSectionTitle>
            <StyledSectionContent>
              <StyledEmptyTable>No similar properties found</StyledEmptyTable>
            </StyledSectionContent>
          </StyledSection>
        </StyledTwoColumns>
      </StyledRightContentContainer>
    </StyledContentContainer>
  );
};
