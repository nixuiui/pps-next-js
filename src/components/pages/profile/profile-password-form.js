import { Button, Spinner, EvaIcon, Row, Col } from '@paljs/ui';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../helpers/language'
import { changePasswordApi } from '../../../services/api/account.api';

export default function ProfilePasswordForm(props) {

    const lang = getLanguage()

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
        setFormState({
            ...formState,
            oldPassword: "",
            password: "",
            confirmPassword: "",
        })
    }, [props?.isOpen])

    const sendData = async () => {
        var formData = {
            password: formState?.password,
            oldPassword: formState?.oldPassword,
        } 
        console.log(formData)
        try {
            setLoading(true)
            var res = await changePasswordApi(formData)
            props?.dataUpdated(res)
            setFormState({})
        } catch(err) {
            console.log(err)
            setErrorText({...errorText, error: err})
        }
        setErrorText(null)
        setLoading(false)
    }

    return <div>
        {isLoading && <Spinner>Loading...</Spinner>}
        <div className="card mb-5" style={{ display: props?.isOpen ? "block" : "none" }}>
            <div className="mb-5">
                <h5 className="m-0">Edit Password</h5>
            </div>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    Old Password
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="password" 
                            name="oldPassword"
                            value={formState?.oldPassword}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                    New Password
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
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
                    Confirm New Password
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
                    <InputGroup fullWidth size="Small">
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formState?.confirmPassword}
                            onChange={(e) => onChangeInput(e)}
                            placeholder="" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3 mt-5">
                <Col breakPoint={{ xs: 12, md: 3 }} className="text-right flex-center-end">
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
                    <Button 
                        status="Primary" 
                        size="Small"
                        className="me-3"
                        disabled={isLoading}
                        onClick={sendData}>
                        SAVE
                    </Button>
                    <Button 
                        status="Basic" 
                        size="Small"
                        disabled={isLoading}
                        onClick={closeForm}>
                        EXIT
                    </Button>
                </Col>
            </Row>
        </div>
    </div>
}