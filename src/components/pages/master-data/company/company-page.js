import { Tabs, Tab } from '@paljs/ui/Tabs';
import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import CompanyPaymentForm from './company-payment-form';

export default function CompanyPage() {
    return <Layout title="Users">
        <CompanyPaymentForm />
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth>
                <Tab title="Payment" responsive>
                    <div className="display-space-between mb-5">
                        <SearchBar />
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Client ID</th>
                                <th>Email</th>
                                <th>Bank Code</th>
                                <th>Bank Name</th>
                                <th>Account Type</th>
                                <th>Account Holder</th>
                                <th>Closing Date</th>
                                <th>Regulated Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>

                {/* ------- */}
                {/* COMPANY */}
                {/* ------- */}
                <Tab title="Company" responsive>
                <div className="display-space-between mb-5">
                        <SearchBar />
                    </div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Company Name</td>
                                <td>Address</td>
                                <td>Phone Number</td>
                            </tr>
                            <tr>
                                <td>Company Name</td>
                                <td>Address</td>
                                <td>Phone Number</td>
                            </tr>
                            <tr>
                                <td>Company Name</td>
                                <td>Address</td>
                                <td>Phone Number</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
            </Tabs>
        </div>
    </Layout>
}