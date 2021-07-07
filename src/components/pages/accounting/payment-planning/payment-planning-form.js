import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';

export default function PaymentPlanningForm(props) {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <div className="card mb-5">
        <div className="mb-5">
            <h5 className="m-0">Payment Planning Form</h5>
        </div>
        <Row>
            <Col breakPoint={{ xs: 12, md: 5 }}>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        Company
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <Select 
                            size="Small" 
                            options={[]}
                            name="company"
                            onChange={(val) => setFormState({...formState, company: val?.value})}
                            placeholder="" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        Invoice Number
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <Select 
                            size="Small" 
                            options={[]}
                            name="invoiceNumber"
                            onChange={(val) => setFormState({...formState, invoiceNumber: val?.value})}
                            placeholder="" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        Payment Date
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="date" 
                                name="paymentDate"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        Payee
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="payee"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
            <Col breakPoint={{ xs: 12, md: 7 }}>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 5 }} className="flex-center">
                        Financial institutions used
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 7 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="financialInstitutionsUsed"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 5 }} className="flex-center">
                        Commission fee paid by our company
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 7 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="commissionDeePaidByOurCompany"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 5 }} className="flex-center">
                        Commission fee paid by the payee
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 7 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="commissionDeePaidByPayee"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Total Amount</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="totalAmount"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Commission Return</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="commissionReturn"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Offset Amount</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="offsetAmount"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Payment Amount</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="paymentAmount"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Total Debit</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="totalDebit"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Total Credit</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="totalCredit"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" breakPoint={{ xs: 12, md: 3 }}>
                        <div className="mb-2">Amount Difference</div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="amountDifference"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="mb-3 mt-5">
            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
            </Col>
            <Col breakPoint={{ xs: 12, md: 8 }}>
                <Button status="Primary">
                    Save
                </Button>
            </Col>
        </Row>
    </div>
}