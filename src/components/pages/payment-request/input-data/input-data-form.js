import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';

export default function InputDataForm(props) {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <div className="card mb-5">
        <div className="mb-5">
            <h5 className="m-0">Input Payment Data Form</h5>
        </div>
        <Row>
            <Col breakPoint={{ xs: 12, md: 5 }}>
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
                        Input Date
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="date" 
                                name="inputDate"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
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
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <Select 
                            size="Small" 
                            options={[]}
                            name="payee"
                            onChange={(val) => setFormState({...formState, payee: val?.value})}
                            placeholder="" />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="payee2"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        Amount
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 8 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="amount"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
            <Col breakPoint={{ xs: 12, md: 7 }}>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row>
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Payment Methods
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <Select 
                                    size="Small" 
                                    options={[]}
                                    name="paymentMethods"
                                    onChange={(val) => setFormState({...formState, paymentMethods: val?.value})}
                                    placeholder="" />
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row>
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Payment Amount
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="paymentAmount"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Offset Account
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <Select 
                                    size="Small" 
                                    options={[]}
                                    name="offsetAccount"
                                    onChange={(val) => setFormState({...formState, offsetAccount: val?.value})}
                                    placeholder="" />
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row>
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Offset Amount
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="offsetAmount"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Commission Fees
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="commissionFees"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Bill Statement Date
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="date" 
                                        name="billStatementDate"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Fees
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="fees"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Used Cheque
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="usedCheque"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Bank Name
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="bankName"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Account Type
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="accountType"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Branch Name
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="branchName"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Row className="mb-3">
                            <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                Account Number
                            </Col>
                            <Col breakPoint={{ xs: 12, md: 8 }}>
                                <InputGroup fullWidth size="Small">
                                    <input 
                                        type="text" 
                                        name="accountNumber"
                                        onChange={(e) => onChangeInput(e)}
                                        placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                        Payment Terms
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 10 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="paymentTerms"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 2 }} className="flex-center">
                        Remarks
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 10 }}>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="remarks"
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