import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import UsersForm from './users-form';

export default function UsersPage() {
    return <Layout title="Users">
        <UsersForm />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Users</h5>
                <SearchBar />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Division</th>
                        <th>Department</th>
                        <th>Search Key</th>
                        <th>Role</th>
                        <th>Remarks</th>
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