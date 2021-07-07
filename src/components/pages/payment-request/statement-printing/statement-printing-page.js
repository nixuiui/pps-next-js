import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';
import Layout from '../../../../Layouts/index';

export default function InputDataPage() {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <Layout title="Statement Printing">
        <div className="card mb-5">
            <div className="mb-5">
                <h5 className="m-0">Statement Printing</h5>
            </div>
            <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Print Document
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 10 }}>
                            <Select 
                                size="Small" 
                                options={[]}
                                name="printDocument"
                                onChange={(val) => setFormState({...formState, printDocument: val?.value})}
                                placeholder="" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Division
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }}>
                            <Select 
                                size="Small" 
                                options={[]}
                                name="division"
                                onChange={(val) => setFormState({...formState, division: val?.value})}
                                placeholder="" />
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="text" 
                                    name="division2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Department
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }}>
                            <Select 
                                size="Small" 
                                options={[]}
                                name="department"
                                onChange={(val) => setFormState({...formState, department: val?.value})}
                                placeholder="" />
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="text" 
                                    name="department2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Recorded Date
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="recordedDate"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="recordedDate2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Payment Date
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="paymentDate"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="paymentDate2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Input Person
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }}>
                            <Select 
                                size="Small" 
                                options={[]}
                                name="inputPerson"
                                onChange={(val) => setFormState({...formState, inputPerson: val?.value})}
                                placeholder="" />
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="text" 
                                    name="inputPerson2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                            Input Date
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="inputDate"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 5 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="date" 
                                    name="inputDate2"
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                
            </Row>
            <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                </Col>
                <Col breakPoint={{ xs: 12, md: 10 }}>
                    <Button status="Primary">
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    </Layout>
}