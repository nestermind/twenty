import { Attachment } from '@/activities/files/types/Attachment';
import { useTheme } from '@emotion/react';

import styled from '@emotion/styled';
import { IconPhoto, LARGE_DESKTOP_VIEWPORT, MOBILE_VIEWPORT } from 'twenty-ui';

type ShowPageImageBannerProps = {
  images: Attachment[];
};

const SECONDARY_IMAGES_WIDTH_PERCENT = 40;
const IMAGE_HEIGHT_LARGE_DESKTOP = 400;
const IMAGE_HEIGHT = 230;
const IMAGE_HEIGHT_MOBILE = 190;

const StyledFirstImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledPhotoIconContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const StyledSecondImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledInnerFirstImageContainer = styled.div<{ isSingleImage?: boolean }>`
  display: flex;
  height: 100%;
  width: ${({ isSingleImage }) =>
    isSingleImage ? '100%' : `${100 - SECONDARY_IMAGES_WIDTH_PERCENT}%`};

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    width: 100%;
  }
`;

const StyledInnerSecondaryImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${SECONDARY_IMAGES_WIDTH_PERCENT}%;

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    display: none;
  }
`;

const StyledSecondImageContainer = styled.div<{ isFullHeight?: boolean }>`
  height: ${({ isFullHeight }) => (isFullHeight ? '100%' : '50%')};
  width: 100%;
`;

const StyledImageContainer = styled.div`
  display: flex;
  height: ${IMAGE_HEIGHT}px;
  width: 100%;

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    height: ${IMAGE_HEIGHT_MOBILE}px;
  }

  @media only screen and (min-width: ${LARGE_DESKTOP_VIEWPORT}px) {
    height: ${IMAGE_HEIGHT_LARGE_DESKTOP}px;
  }
`;

export const ShowPageImageBanner = ({ images }: ShowPageImageBannerProps) => {
  const theme = useTheme();
  return (
    <div style={{ position: 'relative' }}>
      <StyledImageContainer>
        {images[0] ? (
          <StyledInnerFirstImageContainer isSingleImage={images.length === 1}>
            <StyledFirstImage src={images[0].fullPath} alt="Property" />
          </StyledInnerFirstImageContainer>
        ) : (
          <StyledPhotoIconContainer>
            <IconPhoto size={40} color={theme.color.gray50} />
          </StyledPhotoIconContainer>
        )}
        {images.length > 1 && (
          <StyledInnerSecondaryImageContainer>
            {images[1] && (
              <StyledSecondImageContainer isFullHeight={images.length === 2}>
                <StyledSecondImage src={images[1].fullPath} alt="Property" />
              </StyledSecondImageContainer>
            )}
            {images[2] && (
              <StyledSecondImageContainer>
                <StyledSecondImage src={images[2].fullPath} alt="Property" />
              </StyledSecondImageContainer>
            )}
          </StyledInnerSecondaryImageContainer>
        )}
      </StyledImageContainer>
    </div>
  );
};
