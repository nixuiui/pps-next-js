import { Row, Col, Button, Spinner } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { insertUserApi, updateUserApi } from '../../../../services/api/user.api';
import { convertListToOptions } from '../../../../helpers/general';
import { getCompaniesApi } from '../../../../services/api/master-data.api'
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';

export default function CompanyForm(props) {

    const lang = getLanguage()

    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(e.key == 'F1') sendData()
    }
    // --------------<ACTION>--------------

    const roles = [
        {label: "Administrator", value: "administrator"},
        {label: "Accounting", value: "accounting_dept"},
        {label: "Sales", value: "sales_dept"},
    ]

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
            console.log("EDIT")
            console.log(props?.data)
            console.log(props?.isEdit)
            setFormState({
                ...formState,
                userId: props?.data?.userId,
                name: props?.data?.name,
                email: props?.data?.email,
                nameInKana: props?.data?.nameInKana,
                department: props?.data?.department,
                searchKey: props?.data?.searchKey,
                division: props?.data?.division,
                remarks: props?.data?.remarks,
                company: companies?.find((val) => val?.value?._id == props?.data?.company?._id),
                role: roles?.find((val) => val?.value == props?.data?.role)
            })
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            userId: formState?.userId,
            name: formState?.name,
            email: formState?.email,
            nameInKana: formState?.nameInKana,
            department: formState?.department,
            searchKey: formState?.searchKey,
            division: formState?.division,
            remarks: formState?.remarks,
            password: formState?.password,
            company: formState?.company?.value?._id,
            role: formState?.role?.value,
        }
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updateUserApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertUserApi(formData)
                props?.dataInserted(res)
            }
        } catch(err) {
            console.log(err)
            setErrorText({...errorText, error: err})
        }
        setFormState({})
        setErrorText(null)
        setLoading(false)
    }

    return <ReactHotkeys
        keyName="F1" 
        onKeyDown={handleKeyDown}>
        {isLoading && <Spinner>Loading...</Spinner>}
        <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
            <div className="mb-5">
                <h5 className="m-0">Company Payment Form</h5>
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
    </ReactHotkeys>
}