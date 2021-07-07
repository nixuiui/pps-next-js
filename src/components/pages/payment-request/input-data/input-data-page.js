import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import InputDataForm from './input-data-form';

export default function InputDataPage() {
    return <Layout title="Input Payment Data">
        <InputDataForm />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">Input Payment Data</h5>
                <SearchBar />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Debit Account</th>
                        <th>Auxiliary Account</th>
                        <th>Credit Account</th>
                        <th>Division</th>
                        <th>Department</th>
                        <th>Amount (Include Tax)</th>
                        <th>Tax</th>
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
        </div>
    </Layout>
}