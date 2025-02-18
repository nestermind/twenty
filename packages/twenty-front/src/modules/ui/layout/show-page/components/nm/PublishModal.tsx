import { useAttachments } from '@/activities/files/hooks/useAttachments';
import { Modal, ModalRefType } from '@/ui/layout/modal/components/Modal';
import { ModalHotkeyScope } from '@/ui/layout/modal/components/types/ModalHotkeyScope';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
// eslint-disable-next-line no-restricted-imports

import { motion } from 'framer-motion';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Button, IconUpload, LARGE_DESKTOP_VIEWPORT } from 'twenty-ui';

import { useRecordShowContainerData } from '@/object-record/record-show/hooks/useRecordShowContainerData';
import { ContentCustomize } from './modal-pages/ContentCustomize';
import { PlatformSelect } from './modal-pages/PlatformSelect';
import { Platform, PlatformId } from './types/Platform';

const StyledModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  @media only screen and (min-width: ${LARGE_DESKTOP_VIEWPORT}px) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  padding: 0 ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const StyledModalHeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledModalTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledModalTitleContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

type Step =
  | 'platform-select'
  | 'upload-assets'
  | 'content-customize'
  | 'real-estate-config';

const ANIMATION_DURATION = 0.2;

type PublishModalProps = {
  onClose: () => void;
  targetableObject: {
    id: string;
    targetObjectNameSingular: string;
  };
};

export const PublishModal = forwardRef<ModalRefType, PublishModalProps>(
  ({ onClose, targetableObject }, ref) => {
    const { t } = useLingui();

    const [currentStep, setCurrentStep] = useState<Step>('platform-select');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [description, setDescription] = useState('');
    const [publishedPlatforms, setPublishedPlatforms] = useState<Platform[]>(
      [],
    );
    const [isVideoSelected, setIsVideoSelected] = useState(false);
    const [aiFeatures, setAiFeatures] = useState({
      intelligentMatching: true,
      autoResponder: true,
      marketAnalysis: false,
    });

    const {
      recordFromStore,
      objectMetadataItem,
      isPrefetchLoading,
      recordLoading,
    } = useRecordShowContainerData({
      objectNameSingular: targetableObject.targetObjectNameSingular,
      objectRecordId: targetableObject.id,
    });

    const agency = recordFromStore?.agency;

    const [selectedPlatforms, setSelectedPlatforms] = useState<
      PlatformId[] | null
    >(null);

    const { attachments = [] } = useAttachments(targetableObject);

    const images = useMemo(
      () => attachments.filter((attachment) => attachment.type === 'Image'),
      [attachments],
    );

    const [selectedImagesForPost, setSelectedImagesForPost] = useState<
      string[]
    >(images.map((image) => image.id));

    const handlePlatformSelect = (platformId: PlatformId) => {
      setSelectedPlatforms((prev) =>
        prev?.includes(platformId)
          ? prev?.filter((id) => id !== platformId)
          : [...(prev || []), platformId],
      );
    };

    const handlePublish = () => {
      // TODO: Implement publish logic
    };

    useEffect(() => {
      if (images.length > 0 && currentStep === 'upload-assets') {
        setTimeout(() => {
          setCurrentStep('content-customize');
        }, 500);
      }
    }, [images, currentStep]);

    // Set the selected images for the post once images are uploaded
    useEffect(() => {
      if (images.length > 0) {
        setSelectedImagesForPost(images.map((image) => image.id));
      }
    }, [images]);

    const renderStepContent = () => {
      switch (currentStep) {
        case 'platform-select':
          return (
            <StyledModalContent
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            >
              <PlatformSelect
                handlePlatformSelect={handlePlatformSelect}
                aiFeatures={aiFeatures}
                setAiFeatures={setAiFeatures}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                agency={agency}
              />
            </StyledModalContent>
          );

        case 'content-customize':
          return (
            <StyledModalContent
              key="customize"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            >
              <ContentCustomize
                images={images}
                selectedImagesForPost={selectedImagesForPost}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                isVideoSelected={isVideoSelected}
                description={description}
                setDescription={setDescription}
                isGenerating={isGenerating}
                generationProgress={generationProgress}
                setIsGenerating={setIsGenerating}
                setGenerationProgress={setGenerationProgress}
                setIsVideoSelected={setIsVideoSelected}
              />
            </StyledModalContent>
          );
      }
    };

    return (
      <Modal
        size="large"
        onClose={onClose}
        isClosable
        ref={ref}
        closedOnMount
        hotkeyScope={ModalHotkeyScope.Default}
        padding="none"
      >
        <StyledModalHeader>
          <StyledModalTitleContainer>
            <IconUpload size={16} />
            <StyledModalTitle>Publication Draft</StyledModalTitle>
          </StyledModalTitleContainer>
          <StyledModalHeaderButtons>
            <Button variant="tertiary" title={t`Cancel`} onClick={onClose} />
          </StyledModalHeaderButtons>
        </StyledModalHeader>
        {renderStepContent()}
      </Modal>
    );
  },
);

PublishModal.displayName = 'PublishModal';
