import {
    Platform,
    PLATFORMS,
} from '@/ui/layout/show-page/components/nm/types/Platform';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
// eslint-disable-next-line no-restricted-imports
import { IconBrandInstagram } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import {
    IconBrandGoogle,
    IconBuildingSkyscraper,
    IconCheck,
    IconSparkles,
    Toggle,
} from 'twenty-ui';

const StyledPlatformSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledPlatformSelectionTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledPlatformSelectionSubtitle = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.md};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPlatformGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  grid-template-columns: repeat(2, 1fr);
`;

const StyledPlatformCard = styled.button`
  align-items: flex-start;
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.md};
  cursor: pointer;
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: left;
  transition: all 0.1s ease-in-out;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.border.color.strong};
    transform: translateY(-2px);
  }
`;

const StyledPlatformIconContainer = styled.div<{ isConnected?: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.background.tertiary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  position: relative;
  width: 48px;
`;

const StyledPlatformInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledPlatformName = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledNewTag = styled.span`
  background: ${({ theme }) => theme.color.blue10};
  color: ${({ theme }) => theme.color.blue};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: ${({ theme }) => theme.spacing(0.5)}
    ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const StyledPlatformDescription = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: 1.4;
`;

const StyledConnectedTag = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.color.green50};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledBottomSettings = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border.color.light};
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledBottomSettingsTitle = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledSettingsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: repeat(2, 1fr);
`;

const StyledSettingsCard = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledSettingsHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledSettingsTitle = styled.div<{ isAI?: boolean }>`
  color: ${({ theme, isAI }) =>
    isAI ? theme.color.purple : theme.font.color.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledToggleLabel = styled.div`
  color: ${({ theme }) => theme.font.color.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledPlatformLogo = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.tertiary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  position: relative;
  width: 48px;
`;

const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledRadioOption = styled.button<{ isSelected?: boolean }>`
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.background.secondary : theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: left;
  transition: all 0.1s ease-in-out;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.border.color.strong};
    transform: translateY(-2px);
  }
`;

const StyledPlatformContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledOptionLabel = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledOptionDescription = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

type PlatformSelectProps = {
  handlePlatformSelect: (platform: Platform) => void;
  aiFeatures: {
    intelligentMatching: boolean;
    autoResponder: boolean;
    marketAnalysis: boolean;
  };
  setAiFeatures: (features: any) => void;
  selectedPlatform: Platform;
  setSelectedPlatform: Dispatch<SetStateAction<Platform>>;
};

export const PlatformSelect = ({
  handlePlatformSelect,
  aiFeatures,
  setAiFeatures,
  selectedPlatform,
  setSelectedPlatform,
}: PlatformSelectProps) => {
  const theme = useTheme();

  return (
    <StyledPlatformSelectionContainer>
      <div>
        <StyledPlatformSelectionTitle>
          Choose a platform
        </StyledPlatformSelectionTitle>
        <StyledPlatformSelectionSubtitle>
          Select where you want to publish your property listing
        </StyledPlatformSelectionSubtitle>
      </div>

      <StyledPlatformGrid>
        <StyledPlatformCard
          onClick={() => {
            setSelectedPlatform(PLATFORMS[0]);
            handlePlatformSelect(PLATFORMS[0]);
          }}
        >
          <StyledPlatformIconContainer>
            <IconBrandInstagram size={24} />
          </StyledPlatformIconContainer>
          <StyledPlatformInfo>
            <StyledPlatformName>
              Instagram
              <StyledNewTag>NEW</StyledNewTag>
            </StyledPlatformName>
            <StyledConnectedTag>
              <IconCheck size={12} />
              Connected as @nester.mind
            </StyledConnectedTag>
            <StyledPlatformDescription>
              Share engaging property videos and photos to your Instagram feed
              and stories
            </StyledPlatformDescription>
          </StyledPlatformInfo>
        </StyledPlatformCard>

        <StyledPlatformCard
          onClick={() => {
            setSelectedPlatform(PLATFORMS[1]);
            handlePlatformSelect(PLATFORMS[1]);
          }}
        >
          <StyledPlatformIconContainer>
            <IconBrandGoogle size={24} />
          </StyledPlatformIconContainer>
          <StyledPlatformInfo>
            <StyledPlatformName>Google Ads</StyledPlatformName>
            <StyledPlatformDescription>
              Create targeted property campaigns to reach potential buyers
            </StyledPlatformDescription>
          </StyledPlatformInfo>
        </StyledPlatformCard>

        <StyledPlatformCard
          onClick={() => {
            setSelectedPlatform(PLATFORMS[2]);
            handlePlatformSelect(PLATFORMS[2]);
          }}
        >
          <StyledPlatformIconContainer>
            <StyledPlatformLogo>SMG</StyledPlatformLogo>
          </StyledPlatformIconContainer>
          <StyledPlatformInfo>
            <StyledPlatformName>Swiss Marketplace Group</StyledPlatformName>
            <StyledPlatformDescription>
              This includes the following platforms: ImmoScout24, Homegate, and
              more.
            </StyledPlatformDescription>
          </StyledPlatformInfo>
        </StyledPlatformCard>

        <StyledPlatformCard
          onClick={() => {
            setSelectedPlatform(PLATFORMS[3]);
            handlePlatformSelect(PLATFORMS[3]);
          }}
        >
          <StyledPlatformIconContainer>
            <StyledPlatformLogo>NH</StyledPlatformLogo>
          </StyledPlatformIconContainer>
          <StyledPlatformInfo>
            <StyledPlatformName>Newhome</StyledPlatformName>
            <StyledPlatformDescription>
              List your property conveniently to newhome.ch.
            </StyledPlatformDescription>
          </StyledPlatformInfo>
        </StyledPlatformCard>
      </StyledPlatformGrid>

      <StyledBottomSettings>
        <StyledBottomSettingsTitle>
          Additional Settings
        </StyledBottomSettingsTitle>
        <StyledSettingsGrid>
          <StyledSettingsCard>
            <StyledSettingsHeader>
              <IconBuildingSkyscraper size={16} />
              <StyledSettingsTitle>Publishing Agent</StyledSettingsTitle>
            </StyledSettingsHeader>
            <StyledRadioGroup>
              <StyledRadioOption isSelected>
                <StyledPlatformContent>
                  <StyledOptionLabel>Pello Immo AG</StyledOptionLabel>
                  <StyledOptionDescription>
                    Main real estate agency in Zurich
                  </StyledOptionDescription>
                </StyledPlatformContent>
              </StyledRadioOption>
            </StyledRadioGroup>
          </StyledSettingsCard>

          <StyledSettingsCard>
            <StyledSettingsHeader>
              <StyledSettingsTitle isAI>
                <IconSparkles size={16} />
                Nester Settings
              </StyledSettingsTitle>
            </StyledSettingsHeader>
            <StyledToggleContainer>
              <StyledToggleRow>
                <Toggle
                  color={theme.color.purple}
                  value={aiFeatures.intelligentMatching}
                  onChange={() =>
                    setAiFeatures((prev: any) => ({
                      ...prev,
                      intelligentMatching: !prev.intelligentMatching,
                    }))
                  }
                />
                <StyledToggleLabel>Intelligent Matching</StyledToggleLabel>
              </StyledToggleRow>
              <StyledToggleRow>
                <Toggle
                  color={theme.color.purple}
                  value={aiFeatures.autoResponder}
                  onChange={() =>
                    setAiFeatures((prev: any) => ({
                      ...prev,
                      autoResponder: !prev.autoResponder,
                    }))
                  }
                />
                <StyledToggleLabel>Auto Responder</StyledToggleLabel>
              </StyledToggleRow>
            </StyledToggleContainer>
          </StyledSettingsCard>
        </StyledSettingsGrid>
      </StyledBottomSettings>
    </StyledPlatformSelectionContainer>
  );
};
