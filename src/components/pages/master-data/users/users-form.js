import { Row, Col, Button } from '@paljs/ui';
import Select from '@paljs/ui/Select';
import { InputGroup, Radio } from '@paljs/ui';
import { useState } from 'react';

export default function UsersForm(props) {

    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState(null)
    const [errorText, setErrorText] = useState(null)
    function onChangeInput(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return <div className="card mb-5">
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
                        name="username"
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
                        name="emailAddress"
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
                <InputGroup fullWidth size="Small">
                    <input 
                        type="text" 
                        name="company"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="" />
                </InputGroup>
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
                    options={[]}
                    name="payee"
                    onChange={(val) => setFormState({...formState, payee: val?.value})}
                    placeholder="" />
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