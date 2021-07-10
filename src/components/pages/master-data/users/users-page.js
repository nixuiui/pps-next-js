import { useEffect, useState } from 'react';
import Layout from '../../../../Layouts/index';
import { getListUsersSwr } from '../../../../services/swr/user.swr';
import SearchBar from '../../../widget/searchbar';
import UsersForm from './users-form';
import { getLanguage } from 'helpers/language';
import { Button } from '@paljs/ui';
import { ConfirmationModal } from '../../../widget/modal';
import ReactHotkeys from 'react-hot-keys';
import { deleteUserApi } from '../../../../services/api/user.api';
import ReactPaginate from 'react-paginate';

export default function UsersPage() {

    const lang = getLanguage()

    // ==========================================
    // [START] GET DATA & PAGINATION
    // ------------------------------------------
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    
    const [search, setSearch] = useState("")
    function searchData(search) {
        setPage(0)
        setSearch(search)
    }
    
    function changePage(number) {
        console.log(number)
        setPage(number)
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
        setIndexSelected(-1)
        setOpenForm(false)
        setEdit(false)
    }
    // --------------<FROM>--------------
    
    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        console.log(e.key)
        if(e.key == 'F10') setOpenForm(true)
        else if(e.key == 'F12') closeForm()
        else if(e.shiftKey && e.key == 'F2') openEditForm()
        else if(e.key == 'Backspace') confirmationDelete()
    }

    const [indexSelected, setIndexSelected] = useState(-1)
    function selectItem(i) {
        if(i != indexSelected)
            setIndexSelected(i)
        else 
            setIndexSelected(-1)
    }

    function selectedItem() {
        if (indexSelected < 0) return null
        else return dataList[indexSelected]
    }

    function openEditForm() {
        if(selectedItem() != null) {
            setEdit(true)
            setOpenForm(true)
        }
    }
    
    const [isOpenDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    function confirmationDelete() {
        if(selectedItem() != null) {
            setOpenDeleteConfirmation(true)
        }
    }
    function deleteItem() {
        if(indexSelected > -1) {
            deleteUserApi(selectedItem()?._id)
            setOpenDeleteConfirmation(false)
            setIndexSelected(-1)
            dataList.splice(indexSelected, 1)
            setDataList([...dataList])
        }
    }
    // --------------<ACTION>--------------
    
    return <ReactHotkeys
        keyName="F10,F12,shift+F2,backspace" 
        onKeyDown={handleKeyDown}>
        <Layout title="Users">
            <UsersForm 
                isOpen={isOpenForm}
                isEdit={isEdit}
                dataUpdated={(res) => onCompletedForm()}
                dataInserted={(res) => onCompletedForm()}
                data={selectedItem()} />
            <ConfirmationModal 
                isOpen={isOpenDeleteConfirmation}
                title="Delete Item"
                description="Do you want to delete this item?"
                cancel={() => setOpenDeleteConfirmation(false)}
                confirm={() => deleteItem()} />
            <div className="card mb-5">
                <div className="display-space-between mb-5">
                    <h5 className="m-0">List of Users</h5>
                    <SearchBar isLoading={listUserSwr?.isLoading} onSearch={(keyword) => searchData(keyword)} />
                </div>
                <div className=" table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
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
                            {(listUserSwr?.isLoading && dataList.length <= 0) && <tr><td colspan="9"><div className="text-center">Loading...</div></td></tr>}
                            {(!listUserSwr?.isLoading && dataList.length <= 0) && <tr><td colspan="9"><div className="text-center">No Data</div></td></tr>}
                            {dataList.length > 0 && dataList?.map((item,i) => {
                                return <tr 
                                    key={i} 
                                    className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                                    onClick={() => selectItem(i)}>
                                        <td>{(page*limit) + i + 1}</td>
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
                <div className="pagination mt-3">
                    <ReactPaginate 
                        initialPage={page}
                        disableInitialCallback={true}
                        onPageChange={(val) => changePage(val?.selected)}
                        pageCount={total / limit}/>
                </div>
            </div>
        </Layout>
    </ReactHotkeys>
}