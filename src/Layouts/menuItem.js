import { MenuItemType } from '@paljs/ui/types';
import getRoute from 'helpers/route';

const items = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: getRoute('home') },
  },
  {
    title: 'Payment Request',
    icon: { name: 'credit-card-outline' },
    children: [
      {
        title: 'Input Payment Data',
        link: { href: getRoute('input.payment.data') },
      },
      {
        title: 'Statement Printing',
        link: { href: getRoute('statement.printing') },
      },
    ],
  },
  {
    title: 'Master Data',
    icon: { name: 'archive-outline' },
    children: [
      {
        title: 'Payees',
        link: { href: getRoute('payees') },
      },
      {
        title: 'Users',
        link: { href: getRoute('users') },
      },
      {
        title: 'Company',
        link: { href: getRoute('company') },
      },
      {
        title: 'Account',
        link: { href: getRoute('account') },
      },
      {
        title: 'General',
        link: { href: getRoute('general') },
      },
      {
        title: 'Template',
        link: { href: getRoute('template') },
      },
    ],
  },
  {
    title: 'Accountintg',
    icon: { name: 'bar-chart-outline' },
    children: [
      {
        title: 'Deadline Processing',
        link: { href: getRoute('deadline.processing') },
      },
      {
        title: 'Payment Planning',
        link: { href: getRoute('payment.planning') },
      },
      {
        title: 'Payment Confirmation',
        link: { href: getRoute('payment.confirmation') },
      },
    ],
  },
  {
    title: 'Export',
    icon: { name: 'download' },
    children: [
      {
        title: 'Export Data for Bank Transfer',
        link: { href: getRoute('export.bank.transfer') },
      },
      {
        title: 'Export Data for TKC',
        link: { href: getRoute('export.tkc') },
      },
    ],
  },
];

export default items;
