import { Platform } from '@/ui/layout/show-page/components/nm/types/Platform';
import styled from '@emotion/styled';
import { CircularProgressBar, IconCheck, IconExternalLink } from 'twenty-ui';

const StyledPublishingProcess = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)} 0;
`;

const StyledPlatformPublishItem = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledPlatformPublishIcon = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  width: 32px;
`;

const StyledPlatformPublishInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledPlatformPublishName = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledPlatformPublishStatus = styled.div<{ isPublished?: boolean }>`
  color: ${({ theme, isPublished }) =>
    isPublished ? theme.color.green50 : theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledPlatformPublishStatusIcon = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 24px;
  color: ${({ theme }) => theme.color.green};
`;

const StyledViewPublicationButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.font.color.secondary};
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  gap: ${({ theme }) => theme.spacing(1)};
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.font.color.primary};
  }
`;

type PublishingProps = {
  selectedPlatform: Platform;
  publishedPlatforms: Platform[];
  renderPlatformIcon: (platform: Platform) => React.ReactNode;
};

export const Publishing = ({
  selectedPlatform,
  publishedPlatforms,
  renderPlatformIcon,
}: PublishingProps) => {
  return (
    <StyledPublishingProcess>
      <StyledPlatformPublishItem key={selectedPlatform.id}>
        <StyledPlatformPublishIcon>
          {renderPlatformIcon(selectedPlatform)}
        </StyledPlatformPublishIcon>
        <StyledPlatformPublishInfo>
          <StyledPlatformPublishName>
            {selectedPlatform.name}
          </StyledPlatformPublishName>
          <StyledPlatformPublishStatus
            isPublished={publishedPlatforms.includes(selectedPlatform)}
          >
            {publishedPlatforms.includes(selectedPlatform) ? (
              <>
                Successfully published
                <IconCheck size={14} />
              </>
            ) : (
              'Publishing...'
            )}
          </StyledPlatformPublishStatus>
        </StyledPlatformPublishInfo>
        <StyledPlatformPublishStatusIcon>
          {publishedPlatforms.includes(selectedPlatform) ? (
            <StyledViewPublicationButton>
              View Publication
              <IconExternalLink size={14} />
            </StyledViewPublicationButton>
          ) : (
            <CircularProgressBar size={16} barWidth={2} barColor="black" />
          )}
        </StyledPlatformPublishStatusIcon>
      </StyledPlatformPublishItem>
    </StyledPublishingProcess>
  );
};
