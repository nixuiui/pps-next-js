import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';

export default function CompanyForm(props) {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <div className="card mb-5">
        <div className="mb-5">
            <h5 className="m-0">Company Form</h5>
        </div>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Company ID
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="company"
                    onChange={(val) => setFormState({...formState, company: val?.value})}
                    placeholder="" />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Company Name
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="companyName"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Supplier Account Information
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Client ID
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="clientId"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Bank Code
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="bankCode"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Bank Name
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="bankName"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="bankName2"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Branch Code
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="branchCode"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Branch Name
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="branchName"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="branchName2"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Account Type
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="accountType"
                    onChange={(val) => setFormState({...formState, accountType: val?.value})}
                    placeholder="" />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Account Number
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="accountNumber"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Account Holder
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="accountHolder"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Closing Date
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="closingDate"
                    onChange={(val) => setFormState({...formState, paymentDate: val?.value})}
                    placeholder="" />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Regulated Amount
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="regulatedAmount"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3 mt-5">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Button status="Primary">
                    Save
                </Button>
            </Col>
        </Row>
    </div>
}