import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { formatFieldMetadataItemAsColumnDefinition } from '@/object-metadata/utils/formatFieldMetadataItemAsColumnDefinition';
import { getLinkToShowPage } from '@/object-metadata/utils/getLinkToShowPage';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { RecordInlineEntry } from '@/object-record/record-inline-cell/components/nm/RecordInlineEntry';
import { InlineCellHotkeyScope } from '@/object-record/record-inline-cell/types/InlineCellHotkeyScope';
import { useRecordShowContainerActions } from '@/object-record/record-show/hooks/useRecordShowContainerActions';
import { useRecordShowContainerData } from '@/object-record/record-show/hooks/useRecordShowContainerData';
import { isFieldCellSupported } from '@/object-record/utils/isFieldCellSupported';
import { ShowPagePropertySummaryCard } from '@/ui/layout/show-page/components/nm/ShowPagePropertySummaryCard';
import { ShowPageSummaryCardSkeletonLoader } from '@/ui/layout/show-page/components/ShowPageSummaryCardSkeletonLoader';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import styled from '@emotion/styled';
import { Trans } from '@lingui/react/macro';
import groupBy from 'lodash.groupby';
import { Link } from 'react-router-dom';
import { isDefined } from 'twenty-shared';
import { Button, IconPencil } from 'twenty-ui';
import { FieldMetadataType } from '~/generated/graphql';

const StyledFormBorder = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  margin: ${({ theme }) => theme.spacing(4)};
  max-width: 800px;
`;

const StyledHeader = styled.div`
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledTitle = styled.div<{ disabled?: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? 'inherit' : theme.font.color.primary};
  display: flex;
  flex: 1 0 auto;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  justify-content: flex-start;
`;

const StyledBottomBorder = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
`;

const StyledContent = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledEditButtonLink = styled(Link)`
  text-decoration: none;
`;

export const ObjectOverview = ({
  targetableObject,
  isInRightDrawer,
  isNewRightDrawerItemLoading,
}: {
  targetableObject: Pick<
    ActivityTargetableObject,
    'targetObjectNameSingular' | 'id'
  >;
  isNewRightDrawerItemLoading?: boolean;
  isInRightDrawer?: boolean;
}) => {
  const {
    recordFromStore,
    recordLoading,
    objectMetadataItem,
    labelIdentifierFieldMetadataItem,
    isPrefetchLoading,
    objectMetadataItems,
  } = useRecordShowContainerData({
    objectNameSingular: targetableObject.targetObjectNameSingular,
    objectRecordId: targetableObject.id,
  });

  const availableFieldMetadataItems = objectMetadataItem.fields
    .filter(
      (fieldMetadataItem) =>
        isFieldCellSupported(fieldMetadataItem, objectMetadataItems) &&
        fieldMetadataItem.id !== labelIdentifierFieldMetadataItem?.id,
    )
    .sort((fieldMetadataItemA, fieldMetadataItemB) =>
      fieldMetadataItemA.name.localeCompare(fieldMetadataItemB.name),
    );

  const { inlineFieldMetadataItems, relationFieldMetadataItems } = groupBy(
    availableFieldMetadataItems.filter(
      (fieldMetadataItem) =>
        fieldMetadataItem.name !== 'createdAt' &&
        fieldMetadataItem.name !== 'deletedAt' &&
        fieldMetadataItem.name !== 'address' &&
        fieldMetadataItem.name !== 'description',
    ),
    (fieldMetadataItem) =>
      fieldMetadataItem.type === FieldMetadataType.RELATION
        ? 'relationFieldMetadataItems'
        : 'inlineFieldMetadataItems',
  );

  // Use this for object cover images
  const { useUpdateOneObjectRecordMutation } = useRecordShowContainerActions({
    objectNameSingular: targetableObject.targetObjectNameSingular,
    objectRecordId: targetableObject.id,
    recordFromStore,
  });

  const isMobile = useIsMobile() || isInRightDrawer;

  if (isNewRightDrawerItemLoading || !isDefined(recordFromStore)) {
    return <ShowPageSummaryCardSkeletonLoader />;
  }
  return (
    <>
      <StyledFormBorder>
        {recordLoading ? (
          // TODO: Add skeleton loader
          <div>Loading...</div>
        ) : (
          <>
            <StyledHeader>
              <StyledTitle>
                <Trans>Object Overview</Trans>
              </StyledTitle>
              <StyledEditButtonLink
                to={`${getLinkToShowPage(
                  targetableObject.targetObjectNameSingular,
                  recordFromStore,
                )}/edit`}
              >
                <Button title="Edit" Icon={IconPencil} />
              </StyledEditButtonLink>
            </StyledHeader>
            <StyledContent>
              <ShowPagePropertySummaryCard
                date={recordFromStore.createdAt ?? ''}
                loading={isPrefetchLoading || recordLoading}
                title={
                  recordFromStore.name?.firstName
                    ? recordFromStore.name.firstName
                    : recordFromStore.name
                }
                description={recordFromStore.description}
                address={
                  recordFromStore.address &&
                  (recordFromStore.address.addressStreet1 ||
                    recordFromStore.address.addressCity)
                    ? `${recordFromStore.address?.addressStreet1} ${recordFromStore.address?.addressCity} ${recordFromStore.address?.addressState} ${recordFromStore.address?.addressPostcode}`
                    : undefined
                }
                isMobile={isMobile}
              />

              {relationFieldMetadataItems?.map((FieldMetadataitem, index) => (
                <>
                  <FieldContext.Provider
                    key={FieldMetadataitem.id + 'relation' + index}
                    value={{
                      recordId: targetableObject.id,
                      maxWidth: 200,
                      recoilScopeId: targetableObject.id + FieldMetadataitem.id,
                      isLabelIdentifier: false,
                      fieldDefinition:
                        formatFieldMetadataItemAsColumnDefinition({
                          field: FieldMetadataitem,
                          position: index,
                          objectMetadataItem,
                          showLabel: true,
                          labelWidth: 90,
                        }),
                      useUpdateRecord: useUpdateOneObjectRecordMutation,
                      hotkeyScope: InlineCellHotkeyScope.InlineCell,
                    }}
                  >
                    <RecordInlineEntry
                      key={FieldMetadataitem.id + 'relation' + index}
                      loading={recordLoading}
                    />
                  </FieldContext.Provider>
                  {inlineFieldMetadataItems?.length === 0 ? (
                    index < relationFieldMetadataItems.length - 1 ? (
                      <StyledBottomBorder />
                    ) : null
                  ) : (
                    <StyledBottomBorder />
                  )}
                </>
              ))}

              {inlineFieldMetadataItems?.map((fieldMetadataItem, index) => (
                <>
                  <FieldContext.Provider
                    key={fieldMetadataItem.id + 'inline' + index}
                    value={{
                      recordId: targetableObject.id,
                      maxWidth: 200,
                      recoilScopeId: targetableObject.id + fieldMetadataItem.id,
                      isLabelIdentifier: false,
                      fieldDefinition:
                        formatFieldMetadataItemAsColumnDefinition({
                          field: fieldMetadataItem,
                          position: index,
                          objectMetadataItem,
                          showLabel: true,
                          labelWidth: 90,
                        }),
                      useUpdateRecord: useUpdateOneObjectRecordMutation,
                      hotkeyScope: InlineCellHotkeyScope.InlineCell,
                    }}
                  >
                    <RecordInlineEntry
                      key={fieldMetadataItem.id + 'inline' + index}
                      loading={recordLoading}
                    />
                  </FieldContext.Provider>
                  {index < inlineFieldMetadataItems.length - 1 && (
                    <StyledBottomBorder />
                  )}
                </>
              ))}
            </StyledContent>
          </>
        )}
      </StyledFormBorder>
    </>
  );
};
