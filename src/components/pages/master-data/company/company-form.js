import { Row, Col, Button, Spinner } from '@paljs/ui';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../../helpers/language'
import ReactHotkeys from 'react-hot-keys';
import { insertCompanyApi, updateCompanyApi } from '../../../../services/api/company.api';
import { companyTypes } from '../../../../helpers/consts';

export default function CompanyForm(props) {

    const lang = getLanguage()

    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        console.log("SAVE COMPANY")
        if(props?.isOpen) {
            console.log("SAVE2 COMPANY")
            if(e.key == 'F1') sendData()
        }
    }
    // --------------<ACTION>--------------

    const [isLoading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const [formState, setFormState] = useState({})
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(props?.isEdit) {
            console.log(props?.data)
            setFormState({
                ...formState,
                companyId: props?.data?.companyId,
                name: props?.data?.name,
                companyType: props?.data?.companyType,
                nameInKana: props?.data?.nameInKana,
                address: props?.data?.address,
                phone: props?.data?.phone
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
        try {
            setLoading(true)
            if(props?.isEdit) {
                var res = await updateCompanyApi(formData, props?.data?._id)
                props?.dataUpdated(res)
            } else {
                var res = await insertCompanyApi(formData)
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
        keyName={props?.isOpen ? "F1" : ""}
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
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="companyId"
                            value={formState?.companyId}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Name
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="name"
                            value={formState?.name}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <div className="company-type-list">
                        {companyTypes?.map((val, i) => {
                            return <span 
                                key={i}
                                className={"company-type-item " + (formState?.companyType == val ? "selected" : "")}
                                onClick={() => setFormState({...formState, ['companyType']: val})}>
                                {val}
                            </span>
                        })}
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Name In Kana
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="nameInKana"
                            value={formState?.nameInKana}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Address
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="address"
                            value={formState?.address}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Phone
                </Col>
                <Col breakPoint={{ xs: 12, md: 4 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="text" 
                            name="phone"
                            value={formState?.phone}
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