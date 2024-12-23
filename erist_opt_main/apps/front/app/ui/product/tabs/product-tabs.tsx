import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@erist-opt/shadcn/components/ui/tabs';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@erist-opt/shadcn/components/ui/accordion';

const tabsConfig = [
  { value: 'description', title: 'Описание' },
  { value: 'parameters', title: 'Параметры изделия' },
  { value: 'compound', title: 'Состав' },
  { value: 'care', title: 'Уход' },
  { value: 'model_parameters', title: 'Параметры модели' },
  { value: 'delivery', title: 'Условия доставки и оплаты' },
];

export default function InfoTabs({
  description,
  hrefCloudPhotos,
}: {
  description: any;
  hrefCloudPhotos: string | null;
}) {
  const filteredTabs = tabsConfig.filter((tab) => description[tab.value]);

  if (hrefCloudPhotos) {
    filteredTabs.push({ value: 'cloud_photos', title: 'Фото товара' });
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      {/* Мобилка */}
      <div className=" mb-10">
        <Accordion type="single" collapsible className="w-full">
          {filteredTabs.map((t, key) => (
            <AccordionItem key={'accordion' + key} value={t.value}>
              <AccordionTrigger className="text-lg text-gray-800">
                {t.title}
              </AccordionTrigger>
              <AccordionContent>
                {t.value === 'cloud_photos' ? (
                  <a
                    href={hrefCloudPhotos as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    Посмотреть фото товара
                  </a>
                ) : (
                  description[t.value] && (
                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: description[t.value],
                      }}
                    />
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
