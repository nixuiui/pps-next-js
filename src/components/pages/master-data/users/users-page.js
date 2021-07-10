import { useEffect, useState } from 'react';
import Layout from '../../../../Layouts/index';
import { getListUsersSwr } from '../../../../services/swr/user.swr';
import SearchBar from '../../../widget/searchbar';
import UsersForm from './users-form';
import { getLanguage } from 'helpers/language';
import { Button } from '@paljs/ui';
import { ErrorModal } from '../../../widget/modal';

export default function UsersPage() {

    const lang = getLanguage()
    const [isOpenModal, setOpenModal] = useState(false)

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
    const [isEdit, setEdit] = useState(false)
    
    function onCompletedForm() {
        closeForm()
        listUserSwr.mutate()
    }
    
    function closeForm() {
        setOpenForm(false)
        setEdit(false)
    }
    // --------------<FROM>--------------
    
    // --------------<ACTION>--------------
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    })

    function handleKeyDown(e) {
        if(e.keyCode == 121) // F10
            setOpenForm(true)
        else if(e.keyCode == 123) // F12
            closeForm()
        else if(e.shiftKey && e.keyCode == 113) { // SF3
            openEditForm()
        }
    }

    const [indexSelected, setIndexSelected] = useState(-1)
    function selectItem(i) {
        setIndexSelected(i)
    }

    function selectedItem() {
        if (indexSelected < 0) return null
        else return dataList[indexSelected]
    }

    function openEditForm() {
        console.log("EDIT")
        if(selectedItem() != null) {
            setEdit(true)
            setOpenForm(true)
        }
    }
    // --------------<ACTION>--------------
    
    return <Layout title="Users">
        <UsersForm 
            isOpen={isOpenForm}
            isEdit={isEdit}
            dataUpdated={(res) => onCompletedForm()}
            dataInserted={(res) => onCompletedForm()}
            data={selectedItem()} />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Users</h5>
                <SearchBar />
            </div>
            <div className=" table-responsive">
                <table className="table table-hover table-bordered">
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
                            return <tr 
                                key={i} 
                                className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                                onClick={() => selectItem(i)}>
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
        </div>
    </Layout>
}