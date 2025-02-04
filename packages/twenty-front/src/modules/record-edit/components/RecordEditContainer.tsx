import styled from '@emotion/styled';

import { Attachment } from '@/activities/files/types/Attachment';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { getLinkToShowPage } from '@/object-metadata/utils/getLinkToShowPage';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { isNewViewableRecordLoadingState } from '@/object-record/record-right-drawer/states/isNewViewableRecordLoading';
import { useRecordShowPage } from '@/object-record/record-show/hooks/useRecordShowPage';
import { RecordEditField } from '@/record-edit/components/RecordEditField';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { ShowPageImageBanner } from '@/ui/layout/show-page/components/nm/ShowPageImageBanner';
import { SingleTabProps, TabList } from '@/ui/layout/tab/components/TabList';
import { useTabList } from '@/ui/layout/tab/hooks/useTabList';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import { Trans } from '@lingui/react/macro';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isDefined } from 'twenty-shared';
import { Button } from 'twenty-ui';

const StyledEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
`;

const StyledTabListContainer = styled.div<{ shouldDisplay: boolean }>`
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing(2)};
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  box-sizing: border-box;
  display: ${({ shouldDisplay }) => (shouldDisplay ? 'flex' : 'none')};
  gap: ${({ theme }) => theme.spacing(2)};
  height: 40px;
  flex: 1;
`;

const StyledButtonContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
`;

const StyledScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const StyledContentOuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledSection = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  max-width: 385px;
  width: 100%;
  overflow: hidden;
  height: fit-content;
`;

const StyledSectionTitle = styled.div`
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.background.secondary};
`;

const StyledSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledGroup = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const TAB_LIST_COMPONENT_ID = 'edit-record-right-tab-list';

type RecordEditContainerProps = {
  recordId: string;
  objectNameSingular: string;
  recordLoading: boolean;
  tabs: SingleTabProps[];
  isInRightDrawer?: boolean;
  isNewRightDrawerItemLoading?: boolean;
};

export const RecordEditContainer = ({
  recordId,
  objectNameSingular,
  recordLoading,
  isInRightDrawer,
  tabs,
}: RecordEditContainerProps) => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();
  const { objectMetadataItem } = useObjectMetadataItem({
    objectNameSingular,
  });

  const tabListComponentId = `${TAB_LIST_COMPONENT_ID}-${isInRightDrawer}-${recordId}`;

  const { activeTabId } = useTabList(tabListComponentId);

  const { record } = useRecordShowPage(objectNameSingular, recordId);

  const { getUpdatedFields, resetFields, isDirty } = useRecordEdit();

  const { updateOneRecord } = useUpdateOneRecord({
    objectNameSingular,
  });

  const availableFields = objectMetadataItem.fields.filter(
    (field) => !field.isSystem && isDefined(field.name),
  );

  const isNewViewableRecordLoading = useRecoilValue(
    isNewViewableRecordLoadingState,
  );

  const fieldsByName = availableFields.reduce<
    Record<string, (typeof availableFields)[0]>
  >((acc, field) => {
    if (isDefined(field.name)) {
      acc[field.name] = field;
    }
    return acc;
  }, {});

  const images = record?.attachments?.filter((attachment: Attachment) =>
    attachment.name?.includes('propertyimage'),
  );

  // This saves the whole record with the updated fields from the form
  const handleSave = async () => {
    try {
      // If no fields are dirty, don't save
      if (isDirty) {
        const updatedFields = getUpdatedFields();

        await updateOneRecord({
          idToUpdate: recordId,
          updateOneRecordInput: updatedFields,
        });
        resetFields();
      }

      const link = getLinkToShowPage(objectNameSingular, {
        id: recordId,
      });
      setTimeout(() => {
        navigate(link);
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackBar(
          `Something went wrong while saving the record: ${error.message}`,
          {
            variant: SnackBarVariant.Error,
          },
        );
      }
    }
  };

  const renderActiveTabContent = () => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    if (!activeTab?.content?.length) return null;

    return activeTab.content.map((section) => {
      const sectionFieldCount = section.groups.flatMap((group) =>
        group.fields
          .map((field) => ({
            field,
          }))
          .filter(({ field }) => isDefined(field)),
      ).length;

      const hasSectionFields = sectionFieldCount > 0;

      if (!hasSectionFields) {
        return null;
      }
      return (
        <StyledSection key={section.title}>
          <StyledSectionTitle>
            <Trans>{section.title}</Trans>
          </StyledSectionTitle>
          <StyledSectionContent>
            {section.groups.map((group, groupIndex) => {
              const groupFields = group.fields
                .map((field) => ({
                  field: fieldsByName[field.name],
                  type: field.type,
                  hideLabel: field.hideLabel,
                  maxWidth: field.fieldWidth,
                  conditionFieldNames: field.conditionFields,
                  conditionValues: field.conditionValues,
                }))
                .filter(({ field }) => isDefined(field));

              if (!groupFields.length) return null;

              return (
                <StyledGroup key={groupIndex} isHorizontal={group.isHorizontal}>
                  {groupFields.map(
                    ({
                      field,
                      type,
                      hideLabel,
                      maxWidth,
                      conditionFieldNames,
                      conditionValues,
                    }) => {
                      const conditionFields = conditionFieldNames?.map(
                        (conditionFieldName) =>
                          fieldsByName[conditionFieldName],
                      );

                      const concreteConditionValues = conditionValues?.map(
                        (conditionValue) => conditionValue,
                      );

                      // Handles if field should show or not
                      const shouldRender =
                        conditionFields?.every((conditionField) => {
                          const conditionFieldValue = String(
                            getUpdatedFields()[conditionField.name] ??
                              record?.[conditionField.name] ??
                              '',
                          ).toLowerCase();

                          return concreteConditionValues?.some(
                            (value) =>
                              String(value ?? '').toLowerCase() ===
                              conditionFieldValue,
                          );
                        }) ?? true;

                      return shouldRender ? (
                        <RecordEditField
                          key={field.id}
                          field={field}
                          type={type}
                          showLabel={!hideLabel}
                          maxWidth={maxWidth}
                          objectMetadataItem={objectMetadataItem}
                          record={record}
                          objectNameSingular={objectNameSingular}
                          loading={recordLoading || isNewViewableRecordLoading}
                        />
                      ) : null;
                    },
                  )}
                </StyledGroup>
              );
            })}
          </StyledSectionContent>
        </StyledSection>
      );
    });
  };

  return (
    <StyledEditContainer>
      {images && <ShowPageImageBanner images={images} />}

      <StyledTabListContainer shouldDisplay={true}>
        <TabList
          behaveAsLinks={!isInRightDrawer}
          loading={recordLoading || isNewViewableRecordLoading}
          tabListInstanceId={tabListComponentId}
          tabs={tabs}
          isInRightDrawer={isInRightDrawer}
        />
        <StyledButtonContainer>
          <Button
            title="Save"
            variant="primary"
            accent="blue"
            onClick={handleSave}
          />
        </StyledButtonContainer>
      </StyledTabListContainer>

      <StyledScrollableContainer>
        <ScrollWrapper
          componentInstanceId="record-edit-scroll"
          contextProviderName="showPageContainer"
        >
          <StyledContentOuterContainer>
            {renderActiveTabContent()}
          </StyledContentOuterContainer>
        </ScrollWrapper>
      </StyledScrollableContainer>
    </StyledEditContainer>
  );
};
