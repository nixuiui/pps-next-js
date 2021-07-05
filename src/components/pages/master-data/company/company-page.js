import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import CompanyForm from './company-form';

export default function CompanyPage() {
    return <Layout title="Users">
        <CompanyForm />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Company Data</h5>
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
        </div>
    </Layout>
}