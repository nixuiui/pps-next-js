import { Tabs, Tab } from '@paljs/ui/Tabs';
import { useState } from 'react';
import Layout from '../../../../Layouts/index';
import TableCompany from './table-company';

export default function TemplatePage() {
    
    const [tab, setTab] = useState('payment')
    const [paymentCounter, setPaymentCounter] = useState(0)
    const [payeesCounter, setPayeesCounter] = useState(0)
    const [companyCounter, setCompanyCounter] = useState(0)

    const [selectedItem, setSelectedItem] = useState(null)

    function selectTab(num) {
        setSelectedItem(null)
        if(num == 0) {
            setTab('payment')
        } else if(1) {
            setTab('payees')
        } else {
            setTab('company')
        }
    }

    return <Layout title="Template">
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth onSelect={(number) => selectTab(number)}>
                <Tab title="Payment" responsive>
                    {/* <TablePayment 
                        isOpen={tab == 'payment'}
                        closeForm={closeForm}
                        counter={paymentCounter}
                        onSelectItem={(item) => setSelectedItem(item)}
                        openEditForm={() => openEditForm()}
                        openForm={() => setOpenForm(true)}
                        /> */}
                </Tab>
                <Tab title="Payees" responsive>
                    {/* <TableCompany 
                        isOpen={tab == 'payees'}
                        counter={payeesCounter}
                        onSelectItem={(item) => setSelectedItem(item)}
                        openEditForm={() => openEditForm()}
                        openForm={() => setOpenForm(true)}
                        /> */}
                </Tab>
                <Tab title="Company" responsive>
                    <TableCompany 
                        isOpen={tab == 'company'}
                        counter={companyCounter}
                        // onSelectItem={(item) => setSelectedItem(item)}
                        // openEditForm={() => openEditForm()}
                        // openForm={() => setOpenForm(true)}
                        />
                </Tab>
            </Tabs>
        </div>
    </Layout>
}