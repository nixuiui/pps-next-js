import { Row, Col, InputGroup, Checkbox } from '@paljs/ui';
import Layout from '../../../../Layouts/index';
import { Button } from '@paljs/ui/Button';
import SearchBar from '../../../widget/searchbar';

export default function DeadlineProcessingPage() {
    return <Layout title="Users">
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">Deadline Processing</h5>
            </div>
            <Row className="mb-3 flex-center">
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2">Recorded Month</div>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="date" 
                            name="supplementaryAccount"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Select</th>
                        <th>Company ID</th>
                        <th>Company Name</th>
                        <th>Reason Cancelled</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td className="text-center" style={{width: 20}}>
                            <Checkbox />
                        </td>
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