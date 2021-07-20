import { Row, Col, Button, Spinner } from '@paljs/ui';
import Alert from '@paljs/ui/Alert';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { convertListToOptions, dateFormatInput } from '../../../../helpers/general';
import { getCompaniesApi } from '../../../../services/api/master-data.api'
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { comissionFeeOptions, offsetAccountOptions, paymentDateOptions, paymentMethodOptions, roles } from '../../../../helpers/consts';
import { acountTypeOptions } from '../../../../helpers/consts';
import { getInvoiceNumber, insertPaymentRequestApi, updatePaymentRequestApi } from '../../../../services/api/payment-request.api';
import SelectCustom from '../../../widget/select-custom';
import { getListPayeesSwr } from '../../../../services/swr/payees.swr';

export default function InputDataForm(props) {

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

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [payeeList, setPayeeList] = useState([])
    var listPayeeSwr = getListPayeesSwr({
        search: search, 
        page: page+1, 
        limit: limit,
        orderBy: "",
        sortBy: "",
    })
    useEffect(() => {
        if(listPayeeSwr?.data?.data) {
            var options = convertListToOptions(listPayeeSwr?.data?.data, lang == 'jp' ? 'nameInKana' : 'payeesName')
            setPayeeList([...options])
            console.log(formState?.payee)
            console.log(options)
            console.log(props?.data?.payee?._id)
            if(formState?.payee == "load") {
                console.log("LOADDDSS")
                setFormState({...formState, payee: options?.find((val) => val?.value?._id == props?.data?.payee?._id)})
            }
        }
    }, [listPayeeSwr?.data])
    
    function searchPayee(val) {
        setPayeeList([])
        setSearch(val)
    }

    const [isLoading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const [formState, setFormState] = useState({})
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        listPayeeSwr.mutate()
        if(props?.isEdit) {
            setFormState({
                ...formState,
                invoiceNumber: props?.data?.isnvoiceNumber,
                paymentDate: dateFormatInput(props?.data?.paymentDate),
                payee: "load",
                amount: props?.data?.amount,
                offsetAccount: offsetAccountOptions?.find((val) => val?.value == props?.data?.offsetAccount),
                commisionFee: props?.data?.commisionFee,
                fees: props?.data?.fees,
                bankName: props?.data?.bankName,
                branchName: props?.data?.branchName,
                paymentTerms: props?.data?.paymentTerms,
                remarks: props?.data?.remarks,
                paymentAmount: props?.data?.paymentAmount,
                paymentMethod: paymentMethodOptions?.find((val) => val?.value == props?.data?.paymentMethod),
                offsetAmount: props?.data?.offsetAmount,
                billSettlementDate: dateFormatInput(props?.data?.billSettlementDate),
                accountType: props?.data?.accountType,
                accountNumber: props?.data?.accountNumber,
            })
        } else {
            setFormState({
                ...formState,
                invoiceNumber: null,
                paymentDate: null,
                payee: null,
                amount: "",
                offsetAccount: null,
                commisionFee: "",
                fees: "",
                bankName: "",
                branchName: "",
                paymentTerms: "",
                remarks: "",
                paymentAmount: "",
                paymentMethod: null,
                offsetAmount: null,
                billSettlementDate: null,
                accountType: "",
                accountNumber: "",
            })
            getInvoiceNumber().then(res => setFormState({...formState, invoiceNumber: res}))
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            invoiceNumber: formState?.invoiceNumber,
            paymentDate: formState?.paymentDate,
            payee: formState?.payee?.value?._id,
            amount: formState?.amount,
            offsetAccount: formState?.offsetAccount?.value,
            commisionFee: formState?.commisionFee,
            fees: formState?.fees,
            bankName: formState?.bankName,
            branchName: formState?.branchName,
            paymentTerms: formState?.paymentTerms,
            remarks: formState?.remarks,
            paymentAmount: formState?.paymentAmount,
            paymentMethod: formState?.paymentMethod?.value,
            offsetAmount: formState?.offsetAmount,
            billSettlementDate: formState?.billSettlementDate,
            accountType: formState?.accountType,
            accountNumber: formState?.accountNumber,
        }
        console.log(formData)
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updatePaymentRequestApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertPaymentRequestApi(formData)
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
                <h5 className="m-0">Input Payment Data Form</h5>
            </div>
            <Row>
                <Col breakPoint={{ xs: 12, md: 5 }}>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                            Invoice Number
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 8 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="text" 
                                    name="invoiceNumber"
                                    readOnly={true}
                                    value={formState?.invoiceNumber}
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
                                    value={formState?.paymentDate}
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
                            <SelectCustom 
                                size="Small" 
                                options={payeeList}
                                name="payee"
                                value={formState?.payee}
                                onInputChange={(val) => searchPayee(val)}
                                onChange={(val) => setFormState({...formState, payee: val})} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 8 }}>
                            <InputGroup fullWidth size="Small">
                                <input 
                                    type="text" 
                                    name="payee2"
                                    value={lang == 'jp' ? formState?.payee?.value?.nameInKana : formState?.payee?.value?.payeesName}
                                    readOnly={true}
                                    // onChange={(e) => onChangeInput(e)}
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
                                    type="number" 
                                    name="amount"
                                    value={formState?.amount}
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
                                        options={paymentMethodOptions}
                                        name="paymentMethod"
                                        value={formState?.paymentMethod}
                                        onChange={(val) => setFormState({...formState, paymentMethod: val})} />
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
                                            type="number" 
                                            name="paymentAmount"
                                            value={formState?.paymentAmount}
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
                                        options={offsetAccountOptions}
                                        name="offsetAccount"
                                        value={formState?.offsetAccount}
                                        onChange={(val) => setFormState({...formState, offsetAccount: val})} />
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
                                            type="number" 
                                            name="offsetAmount"
                                            value={formState?.offsetAmount}
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
                                            type="number" 
                                            name="commisionFee"
                                            value={formState?.commisionFee}
                                            onChange={(e) => onChangeInput(e)}
                                            placeholder="" />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }}>
                            <Row className="mb-3">
                                <Col breakPoint={{ xs: 12, md: 4 }} className="flex-center">
                                    Bill Settlement Date
                                </Col>
                                <Col breakPoint={{ xs: 12, md: 8 }}>
                                    <InputGroup fullWidth size="Small">
                                        <input 
                                            type="date" 
                                            name="billSettlementDate"
                                            value={formState?.billSettlementDate}
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
                                            type="number" 
                                            name="fees"
                                            value={formState?.fees}
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
                                            value={formState?.bankName}
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
                                            value={formState?.accountType}
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
                                            value={formState?.branchName}
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
                                            value={formState?.accountNumber}
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
                                    value={formState?.paymentTerms}
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
                                    value={formState?.remarks}
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder="" />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {errorText?.error && <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <Alert status="Danger">{errorText?.error}</Alert>
                </Col>
            </Row>}
            <Row className="mt-5">
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