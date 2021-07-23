import { Row, Col, Button, Spinner } from '@paljs/ui';
import { InputGroup, Radio } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { companyTypes } from '../../../../helpers/consts';
import { insertPaymentPlanningApi, updatePaymentPlanningApi } from '../../../../services/api/payment-planning.api';

export default function PaymentPlanningForm(props) {

    const lang = getLanguage()

    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(props?.isOpen) {
            if(e.key == 'F1') sendData()
            else if(e.key == 'F12') closeForm()
        }
    }
    // --------------<ACTION>--------------

    function closeForm() {
        setFormState(null)
        props?.closeForm()
    }

    const [isLoading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const [formState, setFormState] = useState({})
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(props?.isEdit) {
            setFormState({
                ...formState,
                companyId: props?.data?.companyId,
                name: props?.data?.name,
                companyType: props?.data?.companyType,
                nameInKana: props?.data?.nameInKana,
                address: props?.data?.address,
                phone: props?.data?.phone
            })
        } else {
            setFormState({
                ...formState,
                companyId: "",
                name: "",
                companyType: "",
                nameInKana: "",
                address: "",
                phone: ""
            })
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            companyId: formState?.companyId,
            name: formState?.name,
            companyType: formState?.companyType,
            nameInKana: formState?.nameInKana,
            address: formState?.address,
            phone: formState?.phone
        }
        setErrorText(null)
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updatePaymentPlanningApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertPaymentPlanningApi(formData)
                props?.dataInserted(res)
            }
            setFormState({})
        } catch(err) {
            console.log(err)
            setErrorText({...errorText, error: err})
        }
        setLoading(false)
    }

    return <ReactHotkeys
        keyName={props?.isOpen ? "F1, F12" : ""}
        onKeyDown={handleKeyDown}>
        {isLoading && <Spinner>Loading...</Spinner>}
        <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
            <div className="mb-5">
                <h5 className="m-0">Payment Planning Form</h5>
            </div>
            {errorText?.error && <Row className="">
                <Col breakPoint={{ xs: 12, md: 12 }}>
                    <Alert status="Danger">{errorText?.error}</Alert>
                </Col>
            </Row>}
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
            <Row className="mb-3 mt-3">
                <Col breakPoint={{ xs: 12, md: 12 }}>
                    <Button 
                        status="Primary" 
                        size="Small"
                        className="me-3"
                        disabled={isLoading}
                        onClick={sendData}>
                        Execute (F1)
                    </Button>
                    <Button 
                        status="Basic" 
                        size="Small"
                        disabled={isLoading}
                        onClick={closeForm}>
                        EXIT (F12)
                    </Button>
                </Col>
            </Row>
        </div>
    </ReactHotkeys>
}