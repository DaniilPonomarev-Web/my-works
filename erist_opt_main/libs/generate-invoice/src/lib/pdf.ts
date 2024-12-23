import { OrderDTO } from '@erist-opt/shared';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { format } from '@vicimpa/rubles';

export const invoice: TDocumentDefinitions = {
  content: [
    {
      text: 'Оплату необходимо произвести до 20.07.2024г',
      style: 'center',
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [300, 'auto', '*'],
        headerRows: 2,
        body: [
          [
            {
              text: 'Реквизиты ФИЛИАЛ "ЕКАТЕРИНБУРГСКИЙ" АО "АЛЬФА-БАНК"',
              style: 'tableText',
            },
            { text: 'БИК', alignment: 'center', style: 'tableText' },
            { text: '046577964', alignment: 'left', style: 'tableText' },
          ],
          [
            { text: 'Банк получателя', style: 'tableText' },
            { text: 'Сч. №', alignment: 'center', style: 'tableText' },
            {
              text: '30101810100000000964',
              alignment: 'left',
              style: 'tableText',
            },
          ],
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === 2 ? 0.5 : 0;
        },
      },
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [300, 'auto', '*'],
        headerRows: 1,
        body: [
          [
            { text: 'ИП БУХНЕР СОФЬЯ ЛЕОНИДОВНА', style: 'tableText' },
            {
              text: 'Сч. №',
              alignment: 'center',
              rowSpan: 3,
              style: 'tableText',
            },
            {
              text: '40802810038260007398',
              alignment: 'left',
              rowSpan: 3,
              style: 'tableText',
            },
          ],
          [
            { text: 'ИНН 667015198696', style: 'tableText' },
            { text: '', style: 'tableText' },
            { text: '', style: 'tableText' },
          ],
          [
            { text: 'КПП', style: 'tableText' },
            { text: '', style: 'tableText' },
            { text: '', style: 'tableText' },
          ],
        ],
      },
    },
    {
      text: 'Счет на оплату №1234 от 05.07.2024',
      style: 'invoiceTitle',
      margin: [0, 10, 0, 10],
    },
    {
      style: 'normal',
      table: {
        widths: [100, '*'],
        body: [
          [
            {
              text: 'Поставщик',
              style: 'supplierHeader',
              margin: [0, 10, 0, 0],
            },
            {
              text: 'ИП Бухнер Софья Леонидовна, ИНН 667015198696, 620041,\nСвердловская обл., г. Екатеринбург, поселок Гринтер, д. 7',
              margin: [0, 10, 0, 0],
            },
          ],
          [
            { text: 'Покупатель', style: 'buyerHeader' },
            {
              text: 'ИП кто-то там, ИНН покупателя, 620041,\nСвердловская обл., г. Екатеринбург, ул Ленина, д.557',
            },
          ],
        ],
      },
    },
    {
      text: 'Основание: Заказ покупателя №12345 от 05.07.2024',
      style: 'normal',
    },
    {
      style: 'normal',
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 100, 100],
        body: [
          [
            '№',
            'Товары (услуги, работы)',
            'Кол-во',
            'Ед. изм',
            'НДС',
            'Цена за ед.',
            'Сумма, руб.',
          ],
          [
            '1',
            'Заказ №12345 от 05.07.2024',
            '1,00',
            'мес.',
            'без НДС.',
            '220 000,00',
            '220 000,00',
          ],
        ],
      },
    },
    {
      text: 'Итого: 220 000,00 \n В том числе НДС: 0,00 \n Всего к оплате: 290 000,00',
      style: 'tableTotal',
    },
    {
      text: 'Всего наименований 1 на сумму 290 000,00 руб.',
      style: 'normal',
    },
    {
      text: 'Двести девяносто тысяч рублей 00 копеек.',
      style: 'totalAmount',
    },
    {
      text: 'Счёт за товар',
      style: 'normal',
    },
    {
      text: 'Индивидуальный предприниматель БУХНЕР С. Л.',
      style: 'normal',
    },
    {
      text: 'Оплата данного счета означает согласие с условиями поставки товара. \n Товар отпускается по факту прихода денег на р/с Поставщика.',
      style: 'bottom',
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    bottom: {
      margin: [0, 100, 0, 0],
      alignment: 'left',
    },
    tableTotal: {
      margin: [0, 5, 0, 0],
      alignment: 'right',
      bold: true,
    },
    center: {
      margin: [0, 5, 0, 12],
      alignment: 'center',
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 0, 0, 0],
    },
    normal: {
      fontSize: 12,
      margin: [0, 10, 0, 5],
    },
    tableText: {
      fontSize: 10,
      margin: [0, 5, 0, 5],
    },
    invoiceTitle: {
      bold: true,
      fontSize: 17,
      margin: [0, 10, 0, 10],
    },
    supplierHeader: {
      bold: true,
      fontSize: 15,
      margin: [0, 10, 0, 0],
    },
    supplierText: {
      margin: [0, 10, 0, 0],
    },
    buyerHeader: {
      bold: true,
      fontSize: 15,
    },
    buyerText: {},
    totalAmount: {
      bold: true,
      fontSize: 12,
      margin: [0, 10, 0, 5],
    },
  },
};

export const createInvoicePDF = (
  order: OrderDTO,
  orderPaymentDate: string,
  orderId1c: string,
  orderDocCode: string
): TDocumentDefinitions => ({
  content: [
    {
      text: `Оплату необходимо произвести до ${orderPaymentDate}`,
      style: 'center',
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [300, 'auto', '*'],
        headerRows: 2,
        body: [
          [
            {
              text: 'Реквизиты ФИЛИАЛ "ЕКАТЕРИНБУРГСКИЙ" АО "АЛЬФА-БАНК"',
              style: 'tableText',
            },
            { text: 'БИК', alignment: 'center', style: 'tableText' },
            { text: '046577964', alignment: 'left', style: 'tableText' },
          ],
          [
            { text: 'Банк получателя', style: 'tableText' },
            { text: 'Сч. №', alignment: 'center', style: 'tableText' },
            {
              text: '30101810100000000964',
              alignment: 'left',
              style: 'tableText',
            },
          ],
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === 2 ? 0.5 : 0;
        },
      },
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [300, 'auto', '*'],
        headerRows: 1,
        body: [
          [
            { text: 'ИП БУХНЕР СОФЬЯ ЛЕОНИДОВНА', style: 'tableText' },
            {
              text: 'Сч. №',
              alignment: 'center',
              rowSpan: 3,
              style: 'tableText',
            },
            {
              text: '40802810038260007398',
              alignment: 'left',
              rowSpan: 3,
              style: 'tableText',
            },
          ],
          [
            { text: 'ИНН 667015198696', style: 'tableText' },
            { text: '', style: 'tableText' },
            { text: '', style: 'tableText' },
          ],
          [
            { text: 'КПП', style: 'tableText' },
            { text: '', style: 'tableText' },
            { text: '', style: 'tableText' },
          ],
        ],
      },
    },
    {
      text: `Счет на оплату №${
        order.currentID
      } от ${order.registred.toString()}`,
      style: 'invoiceTitle',
      margin: [0, 10, 0, 10],
    },
    {
      style: 'normal',
      table: {
        widths: [100, '*'],
        body: [
          [
            {
              text: 'Поставщик',
              style: 'supplierHeader',
              margin: [0, 10, 0, 0],
            },
            {
              text: `ИП Бухнер Софья Леонидовна, ИНН 667015198696, 620041,\nСвердловская обл., г. Екатеринбург, поселок Гринтер, д. 7`,
              margin: [0, 10, 0, 0],
            },
          ],
          [
            { text: 'Покупатель', style: 'buyerHeader' },
            {
              text: `${order.userCompany_name}, ИНН ${order.userCompany_inn}, ${order.userCompany_urAddress}`,
            },
          ],
        ],
      },
    },
    {
      text: `Основание: Заказ покупателя №${orderDocCode} от ${order.registred.toString()}`,
      style: 'normal',
    },
    {
      style: 'normal',
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 100, 100],
        body: [
          [
            '№',
            'Товары (услуги, работы)',
            'Кол-во',
            'Ед. изм',
            'НДС',
            'Цена за ед.',
            'Сумма, руб.',
          ],
          [
            '1',
            `Заказ № ${orderDocCode} от ${order.registred}`,
            '1,00',
            'мес.',
            `без НДС.`,
            `${order.total}`,
            `${order.total}`,
          ],
        ],
      },
    },
    {
      text: `Итого: ${order.total} \n В том числе НДС: 0,00 \n Всего к оплате: ${order.total}`,
      style: 'tableTotal',
    },
    {
      text: `Всего наименований 1 на сумму ${order.total} руб.`,
      style: 'normal',
    },
    {
      text: `${format(order.total)}`,
      style: 'totalAmount',
    },
    {
      text: 'Счёт за товар',
      style: 'normal',
    },
    {
      text: 'Индивидуальный предприниматель БУХНЕР С. Л.',
      style: 'normal',
    },
    {
      text: 'Оплата данного счета означает согласие с условиями поставки товара. \n Товар отпускается по факту прихода денег на р/с Поставщика.',
      style: 'bottom',
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    bottom: {
      margin: [0, 100, 0, 0],
      alignment: 'left',
    },
    tableTotal: {
      margin: [0, 5, 0, 0],
      alignment: 'right',
      bold: true,
    },
    center: {
      margin: [0, 5, 0, 12],
      alignment: 'center',
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 0, 0, 0],
    },
    normal: {
      fontSize: 12,
      margin: [0, 10, 0, 5],
    },
    tableText: {
      fontSize: 10,
      margin: [0, 5, 0, 5],
    },
    invoiceTitle: {
      bold: true,
      fontSize: 17,
      margin: [0, 10, 0, 10],
    },
    supplierHeader: {
      bold: true,
      fontSize: 15,
      margin: [0, 10, 0, 0],
    },
    supplierText: {
      margin: [0, 10, 0, 0],
    },
    buyerHeader: {
      bold: true,
      fontSize: 15,
    },
    buyerText: {},
    totalAmount: {
      bold: true,
      fontSize: 12,
      margin: [0, 10, 0, 5],
    },
  },
});
