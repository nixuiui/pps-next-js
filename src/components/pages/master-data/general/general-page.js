import { Row, Col, InputGroup } from '@paljs/ui';
import Layout from '../../../../Layouts/index';
import { Button } from '@paljs/ui/Button';
import SearchBar from '../../../widget/searchbar';

export default function GeneralPage() {
    return <Layout title="Users">
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Account</h5>
                <SearchBar />
            </div>
            <Row className="mb-3 flex-center">
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <div className="mb-2">General Classification</div>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="supplementaryAccount"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="taxClassification"
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <Button 
                        status="Primary" 
                        size="Small"
                        type="button" 
                        style={{ position: 'relative' }}>
                        Search
                    </Button>
                </Col>
            </Row>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>General Code</th>
                        <th>Name</th>
                        <th>Item 1</th>
                        <th>Item 2</th>
                        <th>Item 3</th>
                        <th>Item 4</th>
                        <th>Item 5</th>
                        <th>Item 6</th>
                        <th>Item 7</th>
                        <th>Order</th>
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
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
}