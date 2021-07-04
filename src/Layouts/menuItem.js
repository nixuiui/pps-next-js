import { MenuItemType } from '@paljs/ui/types';
import getRoute from 'helpers/route';
import { language } from 'helpers/language';

const items = [
  {
    title: language().menu.home,
    icon: { name: 'home' },
    link: { href: getRoute('home') },
  },
  {
    title: language().menu.paymentRequest,
    icon: { name: 'credit-card-outline' },
    children: [
      {
        title: language().menu.inputPaymentData,
        link: { href: getRoute('input.payment.data') },
      },
      {
        title: language().menu.statementPrinting,
        link: { href: getRoute('statement.printing') },
      },
    ],
  },
  {
    title: language().menu.masterData,
    icon: { name: 'archive-outline' },
    children: [
      {
        title: language().menu.payees,
        link: { href: getRoute('payees') },
      },
      {
        title: language().menu.users,
        link: { href: getRoute('users') },
      },
      {
        title: language().menu.company,
        link: { href: getRoute('company') },
      },
      {
        title: language().menu.account,
        link: { href: getRoute('account') },
      },
      {
        title: language().menu.general,
        link: { href: getRoute('general') },
      },
      {
        title: language().menu.template,
        link: { href: getRoute('template') },
      },
    ],
  },
  {
    title: language().menu.accounting,
    icon: { name: 'bar-chart-outline' },
    children: [
      {
        title: language().menu.deadlineProcessing,
        link: { href: getRoute('deadline.processing') },
      },
      {
        title: language().menu.paymentPlanning,
        link: { href: getRoute('payment.planning') },
      },
      {
        title: language().menu.paymentConfirmation,
        link: { href: getRoute('payment.confirmation') },
      },
    ],
  },
  {
    title: language().menu.export,
    icon: { name: 'download' },
    children: [
      {
        title: language().menu.exportDataForBankTransfer,
        link: { href: getRoute('export.bank.transfer') },
      },
      {
        title: language().menu.exportDataForTkc,
        link: { href: getRoute('export.tkc') },
      },
    ],
  },
];

export default items;
