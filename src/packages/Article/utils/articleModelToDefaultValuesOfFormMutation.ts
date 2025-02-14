import { FormArticleProps } from '../FormMutation/FormMutation';
import { Article } from '../models/article';

interface ArticleModelToDefaultValuesOfFormMutation {
  article: Article | undefined;
}

export const articleModelToDefaultValuesOfFormMutation = ({
  article,
}: ArticleModelToDefaultValuesOfFormMutation): FormArticleProps['defaultValues'] => {
  if (!article) {
    return {
      catalogue: undefined,
      content: undefined,
      createdAt: undefined,
      employeeAt: undefined,
      status: undefined,
      title: undefined,
      url: undefined,
    };
  }

  return {
    catalogue: article.catalogue,
    content: article.content,
    createdAt: article.createdAt,
    employeeAt: article.employeeAt,
    status: article.status,
    title: article.title,
    url: article.url,
  };
};
