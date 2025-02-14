import { useMemo } from 'react';
import { FormArticle } from '../FormMutation/FormMutation';
import { Article } from '../models/article';
import { articleModelToDefaultValuesOfFormMutation } from '../utils/articleModelToDefaultValuesOfFormMutation';

interface Props {
  article: Article;
}

export const ArticleDetail = ({ article }: Props) => {
  const defaultValues = useMemo(() => {
    return articleModelToDefaultValuesOfFormMutation({
      article,
    });
  }, [article]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FormArticle defaultValues={defaultValues} uid="" isSubmitting={false} />
      </div>
    </div>
  );
};
