import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import PaymentPlanningForm from './payment-planning-form';

export default function PaymentPlanningPage() {
    return <Layout title="Users">
        <PaymentPlanningForm />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Payment Planning</h5>
                <SearchBar />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Debit Account</th>
                        <th>Amount</th>
                        <th>Credit Account</th>
                        <th>Auxiliary Account</th>
                        <th>Amount</th>
                        <th>Billing Date</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
}