import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';

export default function PayeesForm(props) {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <div className="card mb-5">
        <div className="mb-5">
            <h5 className="m-0">Payees Form</h5>
        </div>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Payee's ID
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="payee"
                    onChange={(val) => setFormState({...formState, payee: val?.value})}
                    placeholder="" />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Payee's Name
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="payeesName"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Name in Kana
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="nameInKana"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Payee's Bank Information
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
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
                Payment Date
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="paymentDate"
                    onChange={(val) => setFormState({...formState, paymentDate: val?.value})}
                    placeholder="" />
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="paymentOnLastDay"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Payment Method
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={[]}
                    name="paymentMethod"
                    onChange={(val) => setFormState({...formState, paymentMethod: val?.value})}
                    placeholder="" />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Register as Regular
            </Col>
            <Col breakPoint={{ xs: 12, sm: 4 }}>
                <Radio
                    name="registerAsRegular"
                    // onChange={onChangeRadio}
                    options={[
                      {
                        value: true,
                        label: 'Yes',
                        checked: true,
                      },
                      {
                        value: false,
                        label: 'No',
                        status: 'Info',
                      },
                    ]}
                />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Commission Fee
            </Col>
            <Col breakPoint={{ xs: 12, sm: 4 }}>
                <Radio
                    name="commissionFee"
                    // onChange={onChangeRadio}
                    options={[
                      {
                        value: '1',
                        label: 'Payee\'s Responsability',
                        checked: true,
                      },
                      {
                        value: '2',
                        label: 'At your expense',
                        status: 'Info',
                      },
                    ]}
                />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Payment Terms
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
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
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Remarks
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="remarks"
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