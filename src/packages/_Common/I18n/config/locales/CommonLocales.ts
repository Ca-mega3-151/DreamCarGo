export const CommonLocales = {
  en: {
    type_required: '{{type}} is required',
    type_must_be_select: '{{type}} must be selected',
    type_invalid: '{{type}} is invalid',
    type_greater_than: '{{type}} must greater than {{number}}',
    type_greater_than_or_equal: '{{type}} must greater or equal {{number}}',
    select_type: 'Select {{type}}',

    error: 'Error',

    create_title: 'Create',
    create_success: 'Create successfully!',
    create_error: 'Create failed!',

    edit_title: 'Edit',
    save_success: 'Edit successfully!',
    save_error: 'Edit failed!',

    delete_success: 'Delete successfully!',
    delete_error: 'Delete failed!',
  },
  vi: {
    type_required: '{{type}} là bắt buộc',
    type_must_be_select: '{{type}} phải được chọn',
    type_invalid: '{{type}} không hợp lệ',
    type_greater_than: '{{type}} phải lớn hơn {{number}}',
    type_greater_than_or_equal: '{{type}} phải lớn hơn hoặc bằng {{number}}',
    select_type: 'Chọn {{type}}',

    error: 'Lỗi',

    create_title: 'Tạo',
    create_success: 'Tạo thành công!',
    create_error: 'Tạo thất bại!',

    edit_title: 'Chỉnh sửa',
    save_success: 'Lưu thành công!',
    save_error: 'Lưu thất bại!',

    delete_success: 'Xóa thành công!',
    delete_error: 'Xóa thất bại!',
  },
} as const;
