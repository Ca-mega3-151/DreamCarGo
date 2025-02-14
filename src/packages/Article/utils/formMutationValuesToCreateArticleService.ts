import { FormArticleValues } from '../FormMutation/FormMutation';

interface CreateArticle {
  title: string;
  catalogue: string;
  status: string;
  url: string;
  content: string;
}

interface FormMutationValuesToCreateArticleService {
  values: FormArticleValues;
}

export const formMutationValuesToCreateArticleService = ({
  values,
}: FormMutationValuesToCreateArticleService): CreateArticle => {
  return {
    title: values.title,
    catalogue: values.catalogue,
    status: values.status,
    url: values.url,
    content: values.content,
  };
};
