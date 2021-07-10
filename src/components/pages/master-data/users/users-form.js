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

    // --------------<ACTION>--------------
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        // document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyDown);
    })

    function handleKeyDown(e) {
        setTimeout(() => {
            e.preventDefault();
            setCounter(counter+1);
            if(counter > 0) return
            console.log(e.keyCode)
            console.log(counter)
            if(e.keyCode == 112) sendData() // F1 
        }, 500)
    }
    // --------------<ACTION>--------------

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
                password: props?.data?.password,
                company: companies?.find((val) => val?.value?._id == props?.data?.company?._id),
                role: roles?.find((val) => val?.value == props?.data?.role)
            })
        }
    }, [props?.isOpen])

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
            company: formState?.company?.value?._id,
            role: formState?.role?.value,
        }
        try {
            if(props?.isEdit) {
                updateUserApi(formData, props?.data?._id).then((res) => {
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
                        value={formState?.userId}
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
                        value={formState?.name}
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
                        value={formState?.nameInKana}
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
                        value={formState?.email}
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
                        value={formState?.department}
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
                        value={formState?.division}
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
                    value={formState?.company}
                    onChange={(val) => setFormState({...formState, company: val})} />
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
                        value={formState?.searchKey}
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
                    value={formState?.role}
                    onChange={(val) => setFormState({...formState, role: val})} />
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
                        value={formState?.password}
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
                    disabled={isLoading}
                    onClick={sendData}>
                    Save
                </Button>
            </Col>
        </Row>
    </div>
}