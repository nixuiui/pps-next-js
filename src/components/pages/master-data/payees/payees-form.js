import { Row, Col, Button, Spinner } from '@paljs/ui';
import Alert from '@paljs/ui/Alert';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { convertListToOptions } from '../../../../helpers/general';
import { getCompaniesApi } from '../../../../services/api/master-data.api'
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { comissionFeeOptions, paymentDateOptions, paymentMethodOptions, roles } from '../../../../helpers/consts';
import { acountTypeOptions } from '../../../../helpers/consts';
import { getPayeeId, insertPayeeApi, updatePayeeApi } from '../../../../services/api/payees.api';

export default function PayeesForm(props) {

    const lang = getLanguage()

    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(e.key == 'F1') sendData()
        else if(e.key == 'F12') closeForm()
    }
    // --------------<ACTION>--------------

    function closeForm() {
        setFormState(null)
        props?.closeForm()
    }

    const [companies, setCompanies] = useState([])
    useEffect(() => {
        getCompaniesApi().then(res => {
        var options = convertListToOptions(res, lang == 'jp' ? 'nameJa' : 'name')
        setCompanies([...options])
        })
    }, [])

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
                payeesID: props?.data?.payeesID,
                payeesName: props?.data?.payeesName,
                nameInKana: props?.data?.nameInKana,
                bankCode: props?.data?.bankCode,
                bankName: props?.data?.bankName,
                bankNameJa: props?.data?.bankNameJa,
                branchCode: props?.data?.branchCode,
                branchName: props?.data?.branchName,
                branchNameJa: props?.data?.branchNameJa,
                accountType: acountTypeOptions?.find((val) => val?.value == props?.data?.accountType),
                accountNumber: props?.data?.accountNumber,
                accountHolder: props?.data?.accountHolder,
                paymentDate: paymentDateOptions?.find((val) => val?.value == props?.data?.paymentDate),
                paymentDateDescription: props?.data?.paymentDateDescription,
                paymentMethod: paymentMethodOptions?.find((val) => val?.value == props?.data?.paymentDate),
                comissionFee: props?.data?.comissionFee,
                paymentTerms: props?.data?.paymentTerms,
                remarks: props?.data?.remarks,
                isRegular: props?.data?.isRegular,
            })
        } else {
            setFormState({
                ...formState,
                payeesID: "",
                payeesName: "",
                nameInKana: "",
                bankCode: "",
                bankName: "",
                bankNameJa: "",
                branchCode: "",
                branchName: "",
                branchNameJa: "",
                accountType: null,
                accountNumber: "",
                accountHolder: "",
                paymentDate: null,
                paymentDateDescription: "",
                paymentMethod: null,
                comissionFee: "",
                paymentTerms: "",
                remarks: "",
                isRegular: "",
            })
            getPayeeId().then(res => setFormState({...formState, payeesID: res}))
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            payeesID: formState?.payeesID,
            payeesName: formState?.payeesName,
            nameInKana: formState?.nameInKana,
            bankCode: formState?.bankCode,
            bankName: formState?.bankName,
            bankNameJa: formState?.bankNameJa,
            branchCode: formState?.branchCode,
            branchName: formState?.branchName,
            branchNameJa: formState?.branchNameJa,
            accountType: formState?.accountType?.value,
            accountNumber: formState?.accountNumber,
            accountHolder: formState?.accountHolder,
            paymentDate: formState?.paymentDate?.value,
            paymentDateDescription: formState?.paymentDateDescription,
            paymentMethod: formState?.paymentMethod?.value,
            comissionFee: formState?.comissionFee,
            paymentTerms: formState?.paymentTerms,
            remarks: formState?.remarks,
            isRegular: formState?.isRegular,
        }
        console.log(formData)
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updatePayeeApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertPayeeApi(formData)
                props?.dataInserted(res)
            }
            setFormState({})
        } catch(err) {
            console.log(err)
            setErrorText({...errorText, error: err})
        }
        setErrorText(null)
        setLoading(false)
    }

    return <ReactHotkeys
        keyName="F1, F12"
        onKeyDown={handleKeyDown}>
        {isLoading && <Spinner>Loading...</Spinner>}
        <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
            <div className="mb-5">
                <h5 className="m-0">Payees Form</h5>
            </div>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Payee ID
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="payeesID"
                            disabled={true}
                            value={formState?.payeesID}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
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
                            value={formState?.payeesName}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="nameInKana"
                            value={formState?.nameInKana}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="Name in Ja" />
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
                            value={formState?.bankCode}
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
                            value={formState?.bankName}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="bankNameJa"
                            value={formState?.bankNameJa}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="Bank's Name in Ja" />
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
                            value={formState?.branchCode}
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
                            value={formState?.branchName}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="branchNameJa"
                            value={formState?.branchNameJa}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="Branch's Name in Ja" />
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
                        options={acountTypeOptions}
                        name="accountType"
                        value={formState?.accountType}
                        onChange={(val) => setFormState({...formState, accountType: val})} />
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
                            value={formState?.accountNumber}
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
                            value={formState?.accountHolder}
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
                        options={paymentDateOptions}
                        name="paymentDate"
                        value={formState?.paymentDate}
                        onChange={(val) => setFormState({...formState, paymentDate: val})} />
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="paymentDateDescription"
                            value={formState?.paymentDateDescription}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="Payment Date Description" />
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
                        options={paymentMethodOptions}
                        name="paymentMethod"
                        value={formState?.paymentMethod}
                        onChange={(val) => setFormState({...formState, paymentMethod: val})} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Register as Regular
                </Col>
                <Col breakPoint={{ xs: 12, sm: 4 }}>
                    <Radio
                        name="isRegular"
                        onChange={(val) => setFormState({...formState, isRegular: Boolean(val)})}
                        options={[
                        {
                            value: true,
                            label: "Yes",
                            checked: formState?.isRegular === true,
                        },
                        {
                            value: false,
                            label: "No",
                            checked: formState?.isRegular === false,
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
                        name="comissionFee"
                        onChange={(val) => setFormState({...formState, comissionFee: val})}
                        options={
                            comissionFeeOptions?.map(item => {
                                return {
                                    value: item?.value,
                                    label: item?.label,
                                    checked: formState?.isRegular == item?.value,
                                }        
                            })
                        }
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
                            value={formState?.paymentTerms}
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
                            value={formState?.remarks}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            {errorText?.error && <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <Alert status="Danger">{errorText?.error}</Alert>
                </Col>
            </Row>}
            <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
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