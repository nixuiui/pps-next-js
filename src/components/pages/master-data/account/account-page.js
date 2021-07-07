import { Row, Col, InputGroup } from '@paljs/ui';
import Layout from '../../../../Layouts/index';
import { Checkbox } from '@paljs/ui/Checkbox';
import SearchBar from '../../../widget/searchbar';

export default function AccountPage() {
    return <Layout title="Users">
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Account</h5>
                <SearchBar />
            </div>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2"><label>Account Name</label></div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="accountName"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2"><label>Supplementary Account</label></div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="supplementaryAccount"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2"><label>Tax Classification</label></div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="taxClassification"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2"><label>Tax Inclusive</label></div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="taxInclusive"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <div className="mb-2"><label>Useage Classification</label></div>
                    <Checkbox className="me-5">
                        Lender
                    </Checkbox>
                    <Checkbox>
                        Borrower
                    </Checkbox>
                </Col>
            </Row>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Account Code</th>
                        <th>Name</th>
                        <th>Account Key</th>
                        <th>Account Credit</th>
                        <th>Tax</th>
                        <th>Tax Category</th>
                        <th>Debit Useage Status</th>
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
        </div>
    </Layout>
}