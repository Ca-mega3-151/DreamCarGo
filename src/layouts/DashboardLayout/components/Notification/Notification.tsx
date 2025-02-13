import { BellOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { isEmpty, range } from 'ramda';
import { FC, UIEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { useIsMobile } from '~/hooks/useIsMobile';
import { Badge, Button, Drawer, Dropdown, DropdownItem, Empty, Loading } from '~/shared/ReactJS';
import { humanizeTimeago } from '~/shared/Utilities';
import './styles.css';

enum NotificationEvent {
  CREATE_SOMETHING = 'CREATE_SOMETHING',
}
interface NotificationItem {
  _id: string;
  content: string;
  createdAt: number;
  isRead: boolean;
  event: NotificationEvent;
}
interface Props {}
export const Notification: FC<Props> = () => {
  const { t } = useTranslation(['dashboard_layout', 'common']);

  const isMobile = useIsMobile();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenMenu = useCallback(() => {
    if (isMobile) {
      setIsOpenDrawer(true);
    }
  }, [isMobile]);

  //#region Listing
  const [listingDataState, setListingDataState] = useState<{
    items: NotificationItem[];
    page: number;
    isLoading: boolean;
    isLoadingMore: boolean;
    unreadCount: number;
    totalRecords: number;
  }>({ isLoading: false, isLoadingMore: false, items: [], page: 1, unreadCount: 0, totalRecords: 0 });
  const isLoadmorable = useMemo(() => {
    return listingDataState.items.length < listingDataState.totalRecords;
  }, [listingDataState]);

  const handleGetListingData = async () => {
    setListingDataState(state => {
      return { ...state, isLoading: true };
    });
    try {
      // const getNotificationsResponse = await getNotifications({ page: 1 });
      const getNotificationsResponse = {
        unreadCount: 200,
        total: 200,
        items: range(0, 50).map(() => {
          return {
            _id: v4(),
            isRead: false,
            createdAt: Date.now(),
            content: 'Welcome to ReactJS CRUD boilerplate with Restful API',
            event: NotificationEvent.CREATE_SOMETHING,
          };
        }),
      };
      setListingDataState(state => {
        return {
          ...state,
          unreadCount: getNotificationsResponse.unreadCount,
          isLoading: false,
          isLoadingMore: false,
          totalRecords: getNotificationsResponse.total,
          items: getNotificationsResponse.items,
        };
      });
    } catch {
      setListingDataState(state => {
        return {
          ...state,
          isLoading: false,
        };
      });
    }
  };

  const handleLoadmore = async () => {
    if (!listingDataState.isLoadingMore && isLoadmorable) {
      setListingDataState(state => {
        return { ...state, isLoadingMore: true };
      });
      const nextPage = listingDataState.page + 1;
      try {
        // const getNotificationsResponse = await getNotifications({ page: nextPage });
        const getNotificationsResponse = {
          items: range(0, 10).map(() => {
            return {
              _id: v4(),
              isRead: false,
              createdAt: Date.now(),
              content: 'Welcome to ReactJS CRUD boilerplate with Restful API',
              event: NotificationEvent.CREATE_SOMETHING,
            };
          }),
        };

        setListingDataState(state => {
          return {
            ...state,
            items: state.items.concat(getNotificationsResponse.items),
            isLoadingMore: false,
            page: nextPage,
          };
        });
      } catch (error) {
        setListingDataState(state => {
          return {
            ...state,
            isLoadingMore: false,
          };
        });
      }
    }
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = event => {
    const scrollableDiv = event.currentTarget as HTMLDivElement;
    const scrollPosition = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
    const scrollHeight = scrollableDiv.scrollHeight;
    if (scrollHeight - scrollPosition <= 100) {
      handleLoadmore();
    }
  };

  useEffect(() => {
    handleGetListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region Mark all as read
  const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false);

  const handleMarkAllAsRead = async () => {
    setMarkAllAsReadLoading(true);
    try {
      // await markAllAsRead({});
      console.log('markAllAsRead API');
      setListingDataState(state => {
        return {
          ...state,
          unreadCount: 0,
          items: state.items.map(item => {
            return {
              ...item,
              isRead: true,
            };
          }),
        };
      });
    } finally {
      setMarkAllAsReadLoading(false);
    }
  };
  //#endregion

  //#region Mark as read
  const handleMarkAsRead = (notification: NotificationItem) => {
    setListingDataState(state => {
      return {
        ...state,
        unreadCount: state.unreadCount - (notification.isRead ? 0 : 1),
        items: state.items.map(item => {
          if (item._id === notification._id) {
            return { ...item, isRead: true };
          }
          return item;
        }),
      };
    });
    // markAsRead({ _id: notification._id });
    console.log('markAsRead API');
    console.log('Do something else');
  };
  //#endregion

  //#region Socket
  // const connectionRef = useRef<Socket | null>(null);

  // const handleOffTopics = () => {
  //   Object.values(NotificationEvent).forEach(topic => {
  //     connectionRef.current?.off(topic);
  //   });
  // };

  // useEffect(() => {
  //   if (isBrowser() && sessionData?.accessToken) {
  //     connectionRef.current = io('SOCKET_API', {
  //       forceNew: true,
  //       reconnection: true,
  //       autoConnect: true,
  //     });

  //     connectionRef.current?.on('connect', () => {
  //       console.log('Connected');
  //       connectionRef.current?.emit('identify', sessionData?.accessToken);
  //     });
  //     connectionRef.current?.on('disconnect', () => {
  //       console.log('Disconnected');
  //       handleOffTopics();
  //     });

  //     Object.values(NotificationEvent).forEach(topic => {
  //       connectionRef.current?.on(topic, (data: NotificationItem) => {
  //         setListingDataState(state => {
  //           return {
  //             ...state,
  //             unreadCount: state.unreadCount + 1,
  //             totalRecords: state.totalRecords + 1,
  //             items: [data, ...state.items],
  //           };
  //         });
  //         notification.info({
  //           message: t('dashboard_layout:have_new_notification'),
  //           description: data.content,
  //         });
  //       });
  //     });
  //   }
  //   return () => {
  //     connectionRef.current?.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sessionData]);
  //#endregion

  type MergedDropdownItem = Omit<DropdownItem, 'children'>;
  const dropdownItems: MergedDropdownItem[] = useMemo(() => {
    if (listingDataState.isLoading) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-[100vw]',
          label: (
            <div className="flex items-center justify-center py-6">
              <Loading />
            </div>
          ),
        },
      ];
    }

    if (isEmpty(listingDataState.items)) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-[100vw]',
          label: (
            <div className="grid grid-cols-1 py-3 text-center">
              <Empty />
              <div>{t('dashboard_layout:no_notification')}</div>
            </div>
          ),
        },
      ];
    }

    return listingDataState.items
      .map<MergedDropdownItem>(item => {
        return {
          key: item._id,
          className: 'w-[420px] max-w-[100vw] !cursor-pointer',
          onClick: () => {
            return handleMarkAsRead(item);
          },
          label: (
            <div className="flex justify-between gap-4">
              <div className="grid flex-1 grid-cols-1">
                <div className="whitespace-normal font-medium">{item.content}</div>
                <div className="text-xs">{humanizeTimeago({ date: item.createdAt })}</div>
              </div>
              <div className="w-2 shrink-0 grow-0 basis-2 pt-1.5">
                <div className={classNames('bg-yy-info h-2 w-2 rounded-full', item.isRead ? 'hidden' : '')} />
              </div>
            </div>
          ),
        };
      })
      .concat({
        key: 'loadmore',
        disabled: true,
        hidden: !isLoadmorable,
        className: '!cursor-default w-[420px] max-w-[100vw]',
        label: (
          <div className="flex items-center justify-center py-6">
            <Loading />
          </div>
        ),
      });
  }, [listingDataState, isLoadmorable, t]);

  return (
    <>
      <Dropdown
        open={isMobile ? false : undefined}
        footer={
          <div className="flex justify-center">
            <Button loading={markAllAsReadLoading} onClick={handleMarkAllAsRead} type="link">
              {t('dashboard_layout:mark_all_as_read')}
            </Button>
          </div>
        }
        menuMaxHeight="calc(100dvh - 160px)"
        onMenuScroll={handleScroll}
        items={dropdownItems}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpenMenu}
          onKeyUp={handleOpenMenu}
          className="mr-4 flex size-6 cursor-pointer items-center justify-center"
        >
          <Badge content={listingDataState.unreadCount}>
            <BellOutlined className="text-base md:text-xl" />
          </Badge>
        </div>
      </Dropdown>
      <Drawer
        width={900}
        open={isOpenDrawer}
        onClose={() => {
          return setIsOpenDrawer(false);
        }}
        className="Notification__DrawerContainer"
        title={t('dashboard_layout:notification')}
        loading={listingDataState.isLoading}
        footer={
          <div className="flex justify-center">
            <Button loading={markAllAsReadLoading} onClick={handleMarkAllAsRead} type="link">
              {t('dashboard_layout:mark_all_as_read')}
            </Button>
          </div>
        }
      >
        <div className="h-full overflow-y-auto overflow-x-hidden" onScroll={handleScroll}>
          {dropdownItems.map(dropdownItem => {
            if (dropdownItem.hidden) {
              return null;
            }
            return (
              <div
                className={classNames(
                  dropdownItem.disabled ? '' : 'cursor-pointer hover:bg-neutral-100',
                  'border border-x-0 border-t-0 border-solid border-b-neutral-200 p-3 transition-all ',
                )}
                key={dropdownItem.key}
              >
                {dropdownItem.label}
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};
