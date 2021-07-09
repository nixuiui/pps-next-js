import { Tabs, Tab } from '@paljs/ui/Tabs';
import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';

export default function TemplatePage() {
    return <Layout title="Template">
        <div className="card no-padding mb-5">
            <Tabs activeIndex={0} fullWidth>

                {/* ------- */}
                {/* PAYMENT */}
                {/* ------- */}
                <Tab title="Payment" responsive>
                    <div className="display-space-between mb-5">
                        <SearchBar />
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Payee ID</th>
                                <th>Payee Name</th>
                                <th>Amount</th>
                                <th>Payment Methods</th>
                                <th>Bank Name</th>
                                <th>Branch Name</th>
                                <th>Account Number</th>
                                <th>Description</th>
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
                {/* PAYEES */}
                {/* ------- */}
                <Tab title="Payees" responsive>
                <div className="display-space-between mb-5">
                        <SearchBar />
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Payee ID</th>
                                <th>Payee Name</th>
                                <th>Bank's Code</th>
                                <th>Bank' Name</th>
                                <th>Account Type</th>
                                <th>Account Number</th>
                                <th>Commission Fee</th>
                                <th>Payment Date</th>
                                <th>Payment Methods</th>
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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Client ID</th>
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
                            </tr>
                        </tbody>
                    </table>
                </Tab>
            </Tabs>
        </div>
    </Layout>
}