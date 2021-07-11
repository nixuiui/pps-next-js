import { Tabs, Tab } from '@paljs/ui/Tabs';
import Layout from '../../../../Layouts/index';
import CompanyPaymentForm from './company-payment-form';
import CompanyForm from './company-form';
import TableCompany from './table-company';
import TablePayment from './table-payment';
import { useState } from 'react';
import { getListCompaniesSwr } from '../../../../services/swr/company.swr';
import { Button } from '@paljs/ui';

export default function CompanyPage() {
    
    const [tab, setTab] = useState('payment')
    const [paymentCounter, setPaymentCounter] = useState(0)
    const [companyCounter, setCompanyCounter] = useState(0)

    function selectTab(num) {
        setSelectedItem(null)
        if(num == 0) {
            setTab('payment')
        } else {
            setTab('company')
        }
    }

    // --------------<FROM>--------------
    const [isOpenForm, setOpenForm] = useState(false)
    const [isEdit, setEdit] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null)
    
    function onCompletedForm() {
        closeForm()
        if(tab == 'payment')
            setPaymentCounter(paymentCounter+1)
        else 
            setCompanyCounter(companyCounter+1)
    }

    function openEditForm() {
        console.log("EFIT")
        if(selectedItem != null) {
            console.log("EFIT2")
            setEdit(true)
            setOpenForm(true)
        }
    }
    
    function closeForm() {
        setSelectedItem(null)
        setOpenForm(false)
        setEdit(false)
    }
    // --------------<FROM>--------------

    return <Layout title="Users">
        <CompanyPaymentForm 
            dataUpdated={(res) => onCompletedForm()}
            dataInserted={(res) => onCompletedForm()}
            data={selectedItem}
            isEdit={isEdit}
            isOpen={isOpenForm && tab=='payment'} />
        <CompanyForm  
            dataUpdated={(res) => onCompletedForm()}
            dataInserted={(res) => onCompletedForm()}
            isOpen={isOpenForm && tab=='company'}
            isEdit={isEdit}
            data={selectedItem} />
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth onSelect={(number) => selectTab(number)}>
                <Tab title="Payment" responsive>
                    <TablePayment 
                        isOpen={tab == 'payment'}
                        closeForm={closeForm}
                        counter={paymentCounter}
                        onSelectItem={(item) => setSelectedItem(item)}
                        openEditForm={() => openEditForm()}
                        openForm={() => setOpenForm(true)}/>
                </Tab>
                <Tab title="Company" responsive>
                    <TableCompany 
                        isOpen={tab == 'company'}
                        closeForm={closeForm}
                        counter={companyCounter}
                        onSelectItem={(item) => setSelectedItem(item)}
                        openEditForm={() => openEditForm()}
                        openForm={() => setOpenForm(true)}/>
                </Tab>
            </Tabs>
        </div>
    </Layout>
}