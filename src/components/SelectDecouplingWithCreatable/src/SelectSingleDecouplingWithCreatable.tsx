import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalWithI18n } from '../../ModalWithI18n';
import { useCreate } from '~/hooks/useCRUD/useCreate';
import { Button, Empty, SelectSingleDecoupling, SelectSingleDecouplingProps } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type Props<Model extends AnyRecord, ModelId extends string, FormValues extends AnyRecord> = Omit<
  SelectSingleDecouplingProps<Model, ModelId>,
  'notFoundContent' | 'initializingText' | 'additionalModels'
> & {
  Form: (params: {
    onSubmit: (data: FormValues) => Promise<Model | null>;
    isSubmitting: boolean;
    formUid: string;
  }) => ReactNode;
  formUid: string;
  createModel: (data: FormValues) => Promise<Model>;
  modalWidth?: number;
};

export const SelectSingleDecouplingWithCreatable = <
  Model extends AnyRecord,
  ModelId extends string,
  FormValues extends AnyRecord,
>({
  onChange,
  transformToOption,
  Form,
  formUid,
  createModel,
  modalWidth = 1200,
  ...props
}: Props<Model, ModelId, FormValues>) => {
  const { t } = useTranslation(['components']);

  const [sessionCreateModels, setSessionCreateModels] = useState<Model[]>([]);
  const { handleCreate, isCreating, isOpenModalCreate, handleCloseModalCreate, handleOpenModalCreate } = useCreate({
    create: async data => {
      const model = await createModel(data);
      const option = transformToOption(model);
      setSessionCreateModels(state => {
        return state.concat(model);
      });
      if (option) {
        onChange?.(option?.value, option);
      }
      return model;
    },
  });

  return (
    <>
      {/* @ts-ignore */}
      <SelectSingleDecoupling<Model, ModelId>
        {...props}
        initializingText={() => {
          return t('components:SelectDecoupling.loading_data');
        }}
        onChange={onChange}
        transformToOption={transformToOption}
        additionalModels={sessionCreateModels}
        notFoundContent={
          <div className="flex flex-col items-center gap-4">
            <Empty />
            <Button block color="primary" onClick={handleOpenModalCreate}>
              {t('components:SelectDecoupling.create')}
            </Button>
          </div>
        }
      />
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreate}
        onCancel={handleCloseModalCreate}
        onOk={() => {
          return undefined;
        }}
        title={t('components:SelectDecoupling.create_title')}
        okText={t('components:SelectDecoupling.create')}
        okButtonProps={{
          form: formUid,
          htmlType: 'submit',
        }}
        confirmLoading={isCreating}
        width={modalWidth}
      >
        <div className="py-4">{Form({ onSubmit: handleCreate, isSubmitting: isCreating, formUid })}</div>
      </ModalWithI18n>
    </>
  );
};
