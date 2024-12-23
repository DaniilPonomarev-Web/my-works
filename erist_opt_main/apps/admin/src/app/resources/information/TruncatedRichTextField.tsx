import React from 'react';
import { RichTextField } from 'react-admin';

const TruncatedRichTextField = ({
  record = {},
  source,
  length = 100,
  data,
  ...rest
}: any) => {
  const content: string | undefined = record[source];

  console.warn('=============');
  console.warn(source.content);
  console.warn('=============');

  const truncatedContent =
    content && typeof content === 'string'
      ? content.length > length
        ? content.slice(0, length) + '...' // Обрезаем и добавляем многоточие
        : content
      : '';

  return (
    <div {...rest}>
      <RichTextField
        source={source}
        record={{ ...record, [source]: truncatedContent }}
      />
    </div>
  );
};

export default TruncatedRichTextField;
