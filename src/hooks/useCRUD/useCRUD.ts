import { useState } from 'react';
import { useCreate, UseCreate } from './useCreate';
import { useDelete, UseDelete } from './useDelete';
import { UseListing, useListing } from './useListing';
import { useUpdate, UseUpdate } from './useUpdate';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface UseCRUD<
  SearchParams extends AnyRecord,
  FormValues extends AnyRecord,
  Model extends AnyRecord,
  ShortModel extends AnyRecord = Model,
> extends UseListing<SearchParams, Model>,
    Omit<UseCreate<FormValues, Model>, 'onSuccess' | 'onError'>,
    Omit<UseUpdate<FormValues, Model, ShortModel>, 'onSuccess' | 'onError' | 'record'>,
    Omit<UseDelete<Model>, 'onSuccess' | 'onError'> {}

export const useCRUD = <
  SearchParams extends AnyRecord,
  FormValues extends AnyRecord,
  Model extends AnyRecord,
  ShortModel extends AnyRecord = Model,
>({
  getList,
  defaultResponse,
  defaultSearchParams,
  export: export_,
  create,
  update,
  delete: delete_,
  getDetail,
}: UseCRUD<SearchParams, FormValues, Model, ShortModel>) => {
  const {
    data,
    isLoading,
    page,
    pageSize,
    searchParams,
    setSearchParams,
    totalRecords,
    handleGetList,
    handleExport,
    isExporting,
    totalPages,
  } = useListing<SearchParams, Model>({
    getList,
    export: export_,
    defaultSearchParams,
    defaultResponse,
  });

  const { isCreating, isOpenModalCreate, handleCreate, handleOpenModalCreate, handleCloseModalCreate } = useCreate<
    FormValues,
    Model
  >({
    create,
    onSuccess: handleGetList,
  });

  const {
    isUpdating,
    isOpenModalUpdate,
    isFetchingDetail,
    recordState,
    handleUpdate,
    handleCloseModalUpdate,
    handleOpenModalUpdate,
  } = useUpdate<FormValues, Model, ShortModel>({
    update,
    onSuccess: handleGetList,
    getDetail,
  });

  const [selectedRecordsState, setSelectedRecordsState] = useState<Model[]>([]);

  const { isDeleting, isOpenModalDelete, handleDelete, handleCloseModalDelete, handleOpenModalDelete } =
    useDelete<Model>({
      delete: delete_,
      onSuccess: () => {
        handleGetList();
        setSelectedRecordsState([]);
      },
    });

  return {
    data,
    isLoading,
    page,
    pageSize,
    searchParams,
    totalRecords,
    isExporting,
    totalPages,
    setSearchParams,
    handleGetList,
    handleExport,

    isCreating,
    isOpenModalCreate,
    handleCreate,
    handleOpenModalCreate,
    handleCloseModalCreate,

    isUpdating,
    isOpenModalUpdate,
    isFetchingDetail,
    recordState,
    handleUpdate,
    handleCloseModalUpdate,
    handleOpenModalUpdate,

    handleDelete,
    isDeleting,
    isOpenModalDelete,
    handleCloseModalDelete,
    handleOpenModalDelete,

    selectedRecordsState,
    setSelectedRecordsState,
  };
};
