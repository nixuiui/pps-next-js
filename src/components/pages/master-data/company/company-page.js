import { Tabs, Tab } from '@paljs/ui/Tabs';
import Layout from '../../../../Layouts/index';
import CompanyPaymentForm from './company-payment-form';
import CompanyForm from './company-form';
import TableCompany from './table-company';
import TablePayment from './table-payment';
import { useState } from 'react';

export default function CompanyPage() {
    
    const [tab, setTab] = useState('payment')

    function selectTab(num) {
        if(num == 0) {
            setTab('payment')
        } else {
            setTab('company')
        }
    }

    return <Layout title="Users">
        <CompanyPaymentForm isOpen={false} />
        <CompanyForm isOpen={false} />
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth onSelect={(number) => selectTab(number)}>
                <Tab title="Payment" responsive>
                    <TablePayment isOpen={tab == 'payment'}/>
                </Tab>
                <Tab title="Company" responsive>
                    <TableCompany isOpen={tab == 'company'}/>
                </Tab>
            </Tabs>
        </div>
    </Layout>
}