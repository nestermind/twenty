import { Button, IconSparkles } from 'twenty-ui';

import { isNavigationDrawerExpandedState } from '@/ui/navigation/states/isNavigationDrawerExpanded';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const StyledButtonContainer = styled.div<{
  isNavigationDrawerExpanded: boolean;
}>`
  display: flex;
  justify-content: ${({ isNavigationDrawerExpanded }) =>
    isNavigationDrawerExpanded ? 'center' : 'flex-start'};
  padding: 0 ${({ theme }) => theme.spacing(2)} 0 0;
`;

export const AskNesterButton = () => {
  const [isNavigationDrawerExpanded] = useRecoilState(
    isNavigationDrawerExpandedState,
  );

  return (
    <StyledButtonContainer
      isNavigationDrawerExpanded={isNavigationDrawerExpanded}
    >
      <Button
        variant="primary"
        accent="purple"
        fullWidth={isNavigationDrawerExpanded}
        title={isNavigationDrawerExpanded ? 'Ask Nester' : ''}
        Icon={IconSparkles}
        justify={isNavigationDrawerExpanded ? 'center' : 'flex-start'}
      />
    </StyledButtonContainer>
  );
};
