import { useEffect, useState } from 'react';
import Layout from '../../../../Layouts/index';
import { getListUsersSwr } from '../../../../services/swr/user.swr';
import SearchBar from '../../../widget/searchbar';
import UsersForm from './users-form';
import { getLanguage } from 'helpers/language';
import { Button } from '@paljs/ui';

export default function UsersPage() {

    const lang = getLanguage()

    // ==========================================
    // [START] GET DATA & PAGINATION
    // ------------------------------------------
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(20)
    
    const [search, setSearch] = useState("")
    function searchData(search) {
        setPage(0)
        setSearch(search)
    }
    
    const [isLoading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([])
    var listUserSwr = getListUsersSwr({
        search: search, 
        page: page+1, 
        limit: limit,
        orderBy: "",
        sortBy: "",
    })
    useEffect(() => {
        setLoading(listUserSwr?.isLoading)
        if(listUserSwr?.data?.data) {
            setTotal(listUserSwr?.data?.totalAll)
            setDataList([...listUserSwr?.data?.data])
        }
    }, [listUserSwr?.data])
    // ------------------------------------------
    // [END] GET DATA & PAGINATION
    // ==========================================

    // --------------<FROM>--------------
    const [isOpenForm, setOpenForm] = useState(false)
    function onCompletedForm() {
        setOpenForm(false)
        listUserSwr.mutate()
    }
    // --------------<FROM>--------------

    return <Layout title="Users">
        <UsersForm 
            isOpen={isOpenForm}
            dataInserted={(res) => onCompletedForm()} />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Users</h5>
                <Button size="Small" onClick={() => setOpenForm(true)}>Add</Button>
                <SearchBar />
            </div>
            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Division</th>
                        <th>Department</th>
                        <th>Search Key</th>
                        <th>Role</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList?.map((item,i) => {
                        return <tr key={i}>
                            <td>{item?.userId}</td>
                            <td>{lang == 'en' ? item?.name : item?.nameJa}</td>
                            <td>{item?.email}</td>
                            <td>{lang == 'en' ? item?.company?.name : item?.company?.nameJa}</td>
                            <td>{item?.division}</td>
                            <td>{item?.department}</td>
                            <td>{item?.searchKey}</td>
                            <td>{item?.role}</td>
                            <td>{item?.remarks}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </Layout>
}