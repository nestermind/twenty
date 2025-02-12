import { useAttachments } from '@/activities/files/hooks/useAttachments';
import { useUploadAttachmentFile } from '@/activities/files/hooks/useUploadAttachmentFile';
import { Modal, ModalRefType } from '@/ui/layout/modal/components/Modal';
import { ModalHotkeyScope } from '@/ui/layout/modal/components/types/ModalHotkeyScope';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
// eslint-disable-next-line no-restricted-imports

import { motion } from 'framer-motion';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, IconUpload, IconX } from 'twenty-ui';

import { ContentCustomize } from './modal-pages/ContentCustomize';
import { PlatformSelect } from './modal-pages/PlatformSelect';
import { Publishing } from './modal-pages/Publishing';
import { RealEstateConfig } from './modal-pages/RealEstateConfig';
import { UploadAssets } from './modal-pages/UploadAssets';
import { Platform, PLATFORMS } from './types/Platform';

const StyledModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  min-height: 660px;
  padding: ${({ theme }) => theme.spacing(4)};
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
  | 'real-estate-config'
  | 'publishing';

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

    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
      PLATFORMS[0],
    );

    const { attachments = [] } = useAttachments(targetableObject);
    const { uploadAttachmentFile } = useUploadAttachmentFile();

    const images = useMemo(
      () => attachments.filter((attachment) => attachment.type === 'Image'),
      [attachments],
    );

    const [selectedImagesForPost, setSelectedImagesForPost] = useState<
      string[]
    >(images.map((image) => image.id));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: async (acceptedFiles: File[]) => {
        try {
          await Promise.all(
            acceptedFiles.map((file) =>
              uploadAttachmentFile(file, targetableObject),
            ),
          );
        } catch (error) {
          console.error('Error uploading images:', error);
        }
      },
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      },
      multiple: true,
    });

    const handlePlatformSelect = (platform: Platform) => {
      setSelectedPlatform(platform);
      if (platform.type === 'social_media') {
        if (images.length === 0) {
          setCurrentStep('upload-assets');
        } else {
          setCurrentStep('content-customize');
        }
      } else {
        setCurrentStep('real-estate-config');
      }
    };

    const handlePublish = () => {
      setCurrentStep('publishing');
      setPublishedPlatforms([]);

      setTimeout(() => {
        setPublishedPlatforms((prev) => [...prev, selectedPlatform]);
      }, 2000);
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

    const renderPlatformIcon = (platformId: Platform['id']) => {
      switch (platformId) {
        case 'Instagram':
          return 'IG';
        case 'Google Ads':
          return 'GA';
        case 'Swiss Marketplace Group (SMG)':
          return 'SMG';
        case 'Newhome':
          return 'NH';
        default:
          return null;
      }
    };

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
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
              />
            </StyledModalContent>
          );

        case 'upload-assets':
          return (
            <StyledModalContent
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            >
              <UploadAssets
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
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

        case 'real-estate-config':
          return (
            <StyledModalContent
              key="real-estate-config"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            >
              <RealEstateConfig
                platform={selectedPlatform}
                onPublish={handlePublish}
              />
            </StyledModalContent>
          );

        case 'publishing':
          return (
            <StyledModalContent
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            >
              <Publishing
                selectedPlatform={selectedPlatform}
                publishedPlatforms={publishedPlatforms}
                renderPlatformIcon={(platform) =>
                  renderPlatformIcon(platform.id)
                }
              />
            </StyledModalContent>
          );
      }
    };

    return (
      <Modal
        size="extraLarge"
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
            <StyledModalTitle>Publish</StyledModalTitle>
          </StyledModalTitleContainer>
          <StyledModalHeaderButtons>
            {currentStep === 'platform-select' ? (
              <Button title={t`Cancel`} Icon={IconX} onClick={onClose} />
            ) : currentStep === 'upload-assets' ? (
              <>
                <Button
                  title={t`Back`}
                  onClick={() => setCurrentStep('platform-select')}
                />
                <Button
                  title={t`Next`}
                  accent="blue"
                  onClick={() => setCurrentStep('content-customize')}
                  disabled={images.length === 0}
                />
              </>
            ) : currentStep === 'content-customize' ? (
              <>
                <Button
                  title={t`Back`}
                  onClick={() =>
                    setCurrentStep(
                      images.length === 0 ? 'upload-assets' : 'platform-select',
                    )
                  }
                />
                <Button
                  title={t`Publish`}
                  accent="blue"
                  onClick={handlePublish}
                  disabled={isGenerating}
                />
              </>
            ) : currentStep === 'real-estate-config' ? (
              <>
                <Button
                  title={t`Back`}
                  onClick={() => setCurrentStep('platform-select')}
                />
                <Button
                  title={t`Publish`}
                  accent="blue"
                  onClick={handlePublish}
                />
              </>
            ) : (
              <Button
                title={t`Done`}
                accent="blue"
                onClick={() => {
                  // reset state
                  setCurrentStep('platform-select');
                  setPublishedPlatforms([]);
                  setSelectedPlatform(PLATFORMS[0]);
                  setDescription('');
                  setIsVideoSelected(false);
                  onClose();
                }}
              />
            )}
          </StyledModalHeaderButtons>
        </StyledModalHeader>
        {renderStepContent()}
      </Modal>
    );
  },
);

PublishModal.displayName = 'PublishModal';
