import { Row, Col, InputGroup, Checkbox, Select } from '@paljs/ui';
import Layout from '../../../../Layouts/index';

export default function PaymentConfirmationPage() {
    return <Layout title="Users">
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">Payment Confirmation</h5>
            </div>
            <Row className="mb-3 flex-center">
                <Col breakPoint={{ xs: 12, md: 3 }}>
                    <div className="mb-2">Payment due date</div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="date" 
                            name="paymentDueDate"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                    <div className="mb-2">Payment date</div>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="date" 
                            name="paymentDate"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                    <div className="mb-2">Printed Form</div>
                    <Select 
                        size="Small" 
                        options={[]}
                        fullWidth
                        name="printedForm"
                        onChange={(val) => setFormState({...formState, printedForm: val?.value})}
                        placeholder="Printed Form" />
                </Col>
            </Row>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Select</th>
                        <th>Company ID</th>
                        <th>Company Name</th>
                        <th>Processing Slip Printing</th>
                        <th>Request Printing</th>
                        <th>Number of Payment</th>
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
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
}