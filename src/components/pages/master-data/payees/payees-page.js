import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';

export default function PayeesPage() {
    return <Layout title="Payees">
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Payees</h5>
                <SearchBar />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Payee ID</th>
                        <th>Payee Name</th>
                        <th>Bank's Code</th>
                        <th>Bank's Name</th>
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
        </div>
    </Layout>
}