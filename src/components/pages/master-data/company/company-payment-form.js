import { Row, Col, Button, Spinner } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { convertListToOptions, dateFormatInput } from '../../../../helpers/general';
import { getCompaniesApi } from '../../../../services/api/master-data.api'
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { acountTypeOptions } from '../../../../helpers/consts';
import { insertCompanyPaymentsApi, updateCompanyPaymentsApi } from '../../../../services/api/company-payment.api';

export default function CompanyPaymentForm(props) {

    const lang = getLanguage()

    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        console.log("SAVE PAYMENT")
        if(props?.isOpen) {
            console.log("SAVE2 PAYMENT")
            if(e.key == 'F1') sendData()
        }
    }
    // --------------<ACTION>--------------

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
                company: companies?.find((val) => val?.value?._id == props?.data?.company?._id),
                clientId: props?.data?.clientId,
                bankCode: props?.data?.bankCode,
                bankName: props?.data?.bankName,
                bankNameJa: props?.data?.bankNameJa,
                branchCode: props?.data?.branchCode,
                branchName: props?.data?.branchName,
                branchNameJa: props?.data?.branchNameJa,
                accountType: acountTypeOptions?.find((val) => val?.value == props?.data?.accountType),
                accountNumber: props?.data?.accountNumber,
                accountHolder: props?.data?.accountHolder,
                closingDate: dateFormatInput(props?.data?.closingDate),
                regulatedAmount: props?.data?.regulatedAmount,
            })
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            company: formState?.company?.value?._id,
            clientId: formState?.clientId,
            bankCode: formState?.bankCode,
            bankName: formState?.bankName,
            bankNameJa: formState?.bankNameJa,
            branchCode: formState?.branchCode,
            branchName: formState?.branchName,
            branchNameJa: formState?.branchNameJa,
            accountType: formState?.accountType?.value,
            accountNumber: formState?.accountNumber,
            accountHolder: formState?.accountHolder,
            closingDate: formState?.closingDate,
            regulatedAmount: formState?.regulatedAmount,
        }
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updateCompanyPaymentsApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertCompanyPaymentsApi(formData)
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
        keyName={"F1"} 
        onKeyDown={handleKeyDown}>
        {isLoading && <Spinner>Loading...</Spinner>}
        <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
            <div className="mb-5">
                <h5 className="m-0">Company Payment Form</h5>
            </div>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Company
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <Select 
                        size="Small" 
                        options={companies}
                        name="company"
                        value={formState?.company}
                        onChange={(val) => setFormState({...formState, company: val})} />
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
                            value={formState?.clientId}
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
                            placeholder="Name In Ja" />
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
                    Closing Date
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="date" 
                            name="closingDate"
                            value={formState?.closingDate}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
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
                            value={formState?.regulatedAmount}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <Button 
                        status="Primary" 
                        size="Small"
                        disabled={isLoading}
                        onClick={sendData}>
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    </ReactHotkeys>
}