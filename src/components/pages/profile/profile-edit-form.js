import { Button, Spinner, EvaIcon, Row, Col } from '@paljs/ui';
import { InputGroup, Radio } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../helpers/language'
import { updateProfileApi } from '../../../services/api/account.api';
import { getAccountSwr } from '../../../services/swr/account.swr';

export default function ProfileEditForm(props) {

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

    const account = getAccountSwr()

    useEffect(() => {
        setFormState({
            ...formState,
            userId: account?.data?.userId,
            name: account?.data?.name,
            nameInKana: account?.data?.nameInKana,
            email: account?.data?.email,
        })
    }, [account?.data])

    const sendData = async () => {
        var formData = {
            userId: formState?.userId,
            name: formState?.name,
            nameInKana: formState?.nameInKana,
            email: formState?.email,
        } 
        console.log(formData)
        try {
            setLoading(true)
            var res = await updateProfileApi(formData)
            account.mutate()
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
                    User ID
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
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
                    Name
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
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
                    Name In Khana
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
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
                    Email
                </Col>
                <Col breakPoint={{ xs: 12, md: 9 }}>
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