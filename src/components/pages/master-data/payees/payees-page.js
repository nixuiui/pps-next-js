import { useEffect, useState } from 'react';
import Layout from '../../../../Layouts/index';
import { getListPayeesSwr } from '../../../../services/swr/payees.swr';
import SearchBar from '../../../widget/searchbar';
import { getLanguage } from 'helpers/language';
import { Button } from '@paljs/ui';
import { ConfirmationModal } from '../../../widget/modal';
import ReactHotkeys from 'react-hot-keys';
import ReactPaginate from 'react-paginate';
import PayeesForm from './payees-form';
import { deletePayeeApi } from '../../../../services/api/payees.api';

export default function PayeesPage() {

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
    var listDataSwr = getListPayeesSwr({
        search: search, 
        page: page+1, 
        limit: limit,
        orderBy: "",
        sortBy: "",
    })
    useEffect(() => {
        setLoading(listDataSwr?.isLoading)
        if(listDataSwr?.data?.data) {
            setTotal(listDataSwr?.data?.totalAll)
            setDataList([...listDataSwr?.data?.data])
        }
    }, [listDataSwr?.data])
    // ------------------------------------------
    // [END] GET DATA & PAGINATION
    // ==========================================

    // --------------<FROM>--------------
    const [isOpenForm, setOpenForm] = useState(false)
    const [isEdit, setEdit] = useState(false)
    
    function onCompletedForm() {
        closeForm()
        listDataSwr.mutate()
    }
    
    function closeForm() {
        setIndexSelected(-1)
        setOpenForm(false)
        setEdit(false)
    }
    // --------------<FROM>--------------
    
    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(e.key == 'F9') setOpenForm(true)
        else if(e.key == 'F10') openEditForm()
        else if(e.shiftKey && e.key == 'F12') confirmationDelete()
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
            deletePayeeApi(selectedItem()?._id)
            setOpenDeleteConfirmation(false)
            setIndexSelected(-1)
            dataList.splice(indexSelected, 1)
            setDataList([...dataList])
        }
    }
    // --------------<ACTION>--------------

    return <ReactHotkeys
        keyName="F9,F10,shift+F10" 
        onKeyDown={handleKeyDown}>
        <Layout title="Payees">
            <PayeesForm 
                isOpen={isOpenForm}
                isEdit={isEdit}
                closeForm={closeForm}
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
                <h5 className="m-0 mb-4">List of Payees</h5>
                <div className="display-space-between mb-3">
                    <div className="flex-center">
                        <Button 
                            status="Primary" 
                            size="Small"
                            className="me-3"
                            onClick={() => setOpenForm(true)}>
                            Create (F9)
                        </Button>
                        <Button 
                            status="Basic" 
                            size="Small"
                            className="me-3"
                            disabled={indexSelected < 0}
                            onClick={() => openEditForm(true)}>
                            Update (F10)
                        </Button>
                        <Button 
                            status="Basic" 
                            size="Small"
                            className="me-3"
                            disabled={indexSelected < 0}
                            onClick={() => confirmationDelete(true)}>
                            Delete (SF10)
                        </Button>
                    </div>
                    <SearchBar isLoading={listDataSwr?.isLoading} onSearch={(keyword) => searchData(keyword)} />
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Payee ID</th>
                                <th>Payee Name</th>
                                <th>Bank's Code</th>
                                <th>Bank's Name</th>
                                <th>Branch Code</th>
                                <th>Branch Name</th>
                                <th>Account Type</th>
                                <th>Account Number</th>
                                <th>Account Holder</th>
                                <th>Commission Fee</th>
                                <th>Payment Date</th>
                                <th>Payment Methods</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="13"><div className="text-center">Loading...</div></td></tr>}
                            {(!listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="13"><div className="text-center">No Data</div></td></tr>}
                            {dataList.length > 0 && dataList?.map((item,i) => {
                                return <tr 
                                    key={i} 
                                    className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                                    onClick={() => selectItem(i)}>
                                    <td>{(page*limit) + i + 1}</td>
                                    <td>{item?.payeesID}</td>
                                    <td>{lang == 'en' ? item?.payeesName : item?.nameInKana}</td>
                                    <td>{item?.bankCode}</td>
                                    <td>{lang == 'en' ? item?.bankName : item?.bankNameJa}</td>
                                    <td>{item?.branchCode}</td>
                                    <td>{lang == 'en' ? item?.branchName : item?.branchNameJa}</td>
                                    <td>{item?.accountType}</td>
                                    <td>{item?.accountNumber}</td>
                                    <td>{item?.accountHolder}</td>
                                    <td>{item?.comissionFee}</td>
                                    <td>{item?.paymentDate}</td>
                                    <td>{item?.paymentMethod}</td>
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