import { Button, Spinner, EvaIcon } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { debitUsageStatusOptions, roles } from '../../../../helpers/consts';
import { insertAccountApi, updateAccountApi } from '../../../../services/api/account-data.api';

export default function AccountForm(props) {

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
                accountCode: props?.data?.accountCode,
                name: props?.data?.name,
                accountKey: props?.data?.accountKey,
                accountCredit: props?.data?.accountCredit,
                tax1: props?.data?.tax1,
                taxCategory1: props?.data?.taxCategory1,
                tax2: props?.data?.tax2,
                taxCategory2: props?.data?.taxCategory2,
                debitUsageStatus: debitUsageStatusOptions?.find((val) => val?.value == props?.data?.debitUsageStatus),
            })
        } else {
            setFormState({
                ...formState,
                accountCode: "",
                name: "",
                accountKey: "",
                accountCredit: "",
                tax1: "",
                taxCategory1: "",
                tax2: "",
                taxCategory2: "",
                debitUsageStatus: "",
            })
        }
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            accountCode: formState?.accountCode,
            name: formState?.name,
            accountKey: formState?.accountKey,
            accountCredit: formState?.accountCredit,
            tax1: formState?.tax1,
            taxCategory1: formState?.taxCategory1,
            tax2: formState?.tax2,
            taxCategory2: formState?.taxCategory2,
            debitUsageStatus: formState?.debitUsageStatus?.value,
        } 
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updateAccountApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertAccountApi(formData)
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
        <tr style={{ display: props?.isOpen ? "contents" : "none" }}>
            <td style={{cursor: "pointer"}} onClick={closeForm}>
                <EvaIcon 
                    className="search-icon" 
                    name="close-circle-outline" 
                    options={{ fill: '#5a37b8' }} />
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="accountCode"
                        value={formState?.accountCode}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="name"
                        value={formState?.name}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="accountKey"
                        value={formState?.accountKey}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="accountCredit"
                        value={formState?.accountCredit}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="tax1"
                        value={formState?.tax1}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="taxCategory1"
                        value={formState?.taxCategory1}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="tax2"
                        value={formState?.tax2}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="taxCategory2"
                        value={formState?.taxCategory2}
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </td>
            <td>
                <Select 
                    size="Small" 
                    options={debitUsageStatusOptions}
                    name="debitUsageStatus"
                    value={formState?.debitUsageStatus}
                    onChange={(val) => setFormState({...formState, debitUsageStatus: val})} />
            </td>
            <td>
                <Button 
                    status="Primary" 
                    size="Small"
                    className="me-3"
                    disabled={isLoading}
                    onClick={sendData}>
                    Execute (F1)
                </Button>
            </td>
        </tr>
        {/* {errorText?.error && <Row className="mb-3 mt-5">
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
        </Row> */}
    </ReactHotkeys>
}