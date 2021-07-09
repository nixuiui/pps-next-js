import { Row, Col, Button } from '@paljs/ui';
import Alert from '@paljs/ui/Alert';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { insertUserApi, updateUserApi } from '../../../../services/api/user.api';
import { convertListToOptions } from '../../../../helpers/general';
import { getCompaniesApi } from '../../../../services/api/master-data.api'
import { getLanguage } from '../../../../helpers/language'

export default function UsersForm(props) {

    const lang = getLanguage()

    const roles = [
        {label: "Accounting", value: "accounting_dept"},
        {label: "Employees", value: "employees"},
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
    const [formState, setFormState] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    function sendData() {
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
            company: formState?.company?._id,
            role: formState?.role,
        }
        try {
            if(props?.isEdit) {
                updateUserApi(formData, props?.data?.id).then((res) => {
                    setFormState(null)
                    props?.dataUpdated(res)
                }).catch((err) => {
                    console.log(err)
                    setErrorText({...errorText, error: err})
                })
            } else {
                insertUserApi(formData).then((res) => {
                    setFormState(null)
                    props?.dataInserted(res)
                }).catch((err) => {
                    console.log(err)
                    setErrorText({...errorText, error: err})
                })
            }
        } catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    return <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
        <div className="mb-5">
            <h5 className="m-0">User Form</h5>
        </div>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                User ID
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="userId"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                User Name
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="name"
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
                Email Address
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="email"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Department
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="department"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Division
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="division"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Company
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={companies}
                    name="company"
                    onChange={(val) => setFormState({...formState, company: val?.value})} />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Search Key
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="searchKey"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Role
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <Select 
                    size="Small" 
                    options={roles}
                    name="role"
                    onChange={(val) => setFormState({...formState, role: val?.value})} />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                Password
            </Col>
            <Col breakPoint={{ xs: 12, md: 4 }}>
                <InputGroup fullWidth size="Small">
                    <input 
                        type="password" 
                        name="password"
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
                    disabled={isLoading}
                    onClick={sendData}>
                    Save
                </Button>
            </Col>
        </Row>
    </div>
}