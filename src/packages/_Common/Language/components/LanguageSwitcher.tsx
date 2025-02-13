import { values } from 'ramda';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageMappingToImages } from '../constants/LanguageMappingToImages';
import { getLanguageMappingToLabels } from '../constants/LanguageMappingToLabels';
import { Language } from '../models/Language';
import { useIsMobile } from '~/hooks/useIsMobile';
import { useChangeLanguage } from '~/overrides/RemixJS/client';
import { SelectSingle } from '~/shared/ReactJS';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation(['language']);
  const { i18n, changeLanguage } = useChangeLanguage();
  const isMobile = useIsMobile();

  const LanguageMappingToLabels = useMemo(() => {
    return getLanguageMappingToLabels(t);
  }, [t]);

  return (
    <div className="flex w-14 items-center md:w-40">
      <SelectSingle
        size={isMobile ? 'small' : undefined}
        className="border-none"
        options={values(Language).map(item => {
          return {
            label: (
              <div className="flex items-center gap-2">
                {LanguageMappingToImages[item]}
                <div className="hidden md:block">{LanguageMappingToLabels[item]}</div>
              </div>
            ),
            searchValue: '',
            rawData: item,
            value: item,
          };
        })}
        showSearch={false}
        allowClear={false}
        placeholder=""
        value={i18n.language}
        onChange={value => {
          if (value) {
            changeLanguage(value);
          }
        }}
      />
    </div>
  );
};

export default LanguageSwitcher;
