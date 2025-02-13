export const ErrorMessageLocales = {
  en: {
    HTTP_SERVER_ERROR: 'The server encountered an internal error',
    HTTP_REQUEST_TIMEOUT: 'Network error',
    HTTP_BAD_REQUEST: 'Your browser sent a request that this server could not understand',
    HTTP_UNAUTHORIZED: 'You are not authorized',
    HTTP_FORBIDDEN: "You don't have permission to access this resource",
    HTTP_NOT_FOUND: 'Not found',
    HTTP_UNPROCESSABLE_ENTITY: 'The server was unable to process the request',
    HTTP_TOO_MANY_REQUESTS: 'You have made too many requests in a given amount of time',
    HTTP_BAD_GATEWAY:
      'The server received an invalid response from a upstream server while attempting to fulfill the request',
    HTTP_GATEWAY_TIMEOUT:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server it accessed in attempting to complete the request',
    UNKNOWN: 'Something went wrong',
  },
  vi: {
    HTTP_SERVER_ERROR: 'Máy chủ gặp lỗi nội bộ',
    HTTP_REQUEST_TIMEOUT: 'Lỗi mạng',
    HTTP_BAD_REQUEST: 'Trình duyệt của bạn đã gửi một yêu cầu mà máy chủ không thể hiểu',
    HTTP_UNAUTHORIZED: 'Bạn không được ủy quyền',
    HTTP_FORBIDDEN: 'Bạn không có quyền truy cập tài nguyên này',
    HTTP_NOT_FOUND: 'Không tìm thấy',
    HTTP_UNPROCESSABLE_ENTITY: 'Máy chủ không thể xử lý yêu cầu',
    HTTP_TOO_MANY_REQUESTS: 'Bạn đã thực hiện quá nhiều yêu cầu trong một khoảng thời gian nhất định',
    HTTP_BAD_GATEWAY: 'Máy chủ nhận được phản hồi không hợp lệ từ máy chủ ngược dòng khi cố gắng xử lý yêu cầu',
    HTTP_GATEWAY_TIMEOUT:
      'Máy chủ, khi hoạt động như một cổng hoặc proxy, không nhận được phản hồi kịp thời từ máy chủ ngược dòng khi cố gắng hoàn thành yêu cầu',
    UNKNOWN: 'Đã xảy ra lỗi',
  },
} as const;
