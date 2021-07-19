import { Button, Col, Row } from '@paljs/ui';
import { useEffect, useState } from 'react';
import { getLanguage } from '../../../helpers/language';
import Layout from '../../../Layouts/index';
import { getAccountSwr } from '../../../services/swr/account.swr';
import ProfileEditForm from './profile-edit-form';
import ProfilePasswordForm from './profile-password-form';

export default function ProfilePage() {

    const lang = getLanguage()

    const [isEditPassword, setEditPassword] = useState(false)
    const [isEditProfile, setEditProfile] = useState(false)

    var account = getAccountSwr()
    useEffect(() => {
        console.log(account?.data)
    }, [account?.data])

    return <Layout title="Profile">
        <Row className="mb-3">
            <Col breakPoint={{ xs: 12, md: 8 }}>
                <ProfileEditForm 
                    dataUpdated={(res) => setEditProfile(false)}
                    closeForm={() => setEditProfile(false)}
                    isOpen={isEditProfile} />
                <ProfilePasswordForm 
                    dataUpdated={(res) => setEditPassword(false)}
                    closeForm={() => setEditPassword(false)}
                    isOpen={isEditPassword} />
                <div className="card mb-5">
                    <h5 className="m-0 mb-4">Profile</h5>
                    <div>
                        <div className="mb-3">
                            <small>Name</small> <br />
                            <strong>{lang == 'en' ? account?.data?.name : account?.data?.nameInKana}</strong>
                        </div>
                        <div className="mb-3">
                            <small>Role</small> <br />
                            <strong>{account?.data?.role}</strong>
                        </div>
                        <div className="mb-3">
                            <small>Department</small> <br />
                            <strong>{account?.data?.department}</strong>
                        </div>
                        <div className="mb-3">
                            <small>Division</small> <br />
                            <strong>{account?.data?.division}</strong>
                        </div>
                        <div className="mb-3">
                            <small>User ID</small> <br />
                            <strong>{account?.data?.userId}</strong>
                        </div>
                        <div className="mb-4">
                            <small>Email</small> <br />
                            <strong>{account?.data?.email}</strong>
                        </div>
                    </div>
                    <div className="flex-center">
                        <Button 
                            status="Primary" 
                            size="Small"
                            className="me-3"
                            onClick={() => setEditPassword(true)}>
                            Edit Password
                        </Button>
                        <Button 
                            status="Primary" 
                            size="Small"
                            className="me-3"
                            onClick={() => setEditProfile(true)}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    </Layout>
}