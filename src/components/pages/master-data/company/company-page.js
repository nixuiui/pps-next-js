import { Tabs, Tab } from '@paljs/ui/Tabs';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getLanguage } from '../../../../helpers/language';
import Layout from '../../../../Layouts/index';
import { getListCompaniesApi } from '../../../../services/api/company.api';
import { getListCompanyPaymentsSwr } from '../../../../services/swr/company-payment.swr';
import { getListCompaniesSwr } from '../../../../services/swr/company.swr';
import SearchBar from '../../../widget/searchbar';
import CompanyPaymentForm from './company-payment-form';
import TableCompany from './table-company';
import TablePayment from './table-payment';

export default function CompanyPage() {

    return <Layout title="Users">
        <CompanyPaymentForm />
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth>
                <Tab title="Payment" responsive>
                    <TablePayment/>
                </Tab>

                {/* ------- */}
                {/* COMPANY */}
                {/* ------- */}
                <Tab title="Company" responsive>
                    <TableCompany/>
                </Tab>
            </Tabs>
        </div>
    </Layout>
}