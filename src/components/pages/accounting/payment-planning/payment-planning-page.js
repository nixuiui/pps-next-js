import Layout from '../../../../Layouts/index';
import SearchBar from '../../../widget/searchbar';
import PaymentPlanningForm from './payment-planning-form';
import { useEffect, useState } from 'react';
import { getListPaymentRequestSwr } from '../../../../services/swr/payment-request.swr';
import { getLanguage } from 'helpers/language';
import { Button } from '@paljs/ui';
import { ConfirmationModal } from '../../../widget/modal';
import ReactHotkeys from 'react-hot-keys';
import ReactPaginate from 'react-paginate';
import { deletePaymentRequestApi } from '../../../../services/api/payment-request.api';

export default function PaymentPlanningPage() {

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
    var listDataSwr = getListPaymentRequestSwr({
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
            deletePaymentRequestApi(selectedItem()?._id)
            setOpenDeleteConfirmation(false)
            setIndexSelected(-1)
            dataList.splice(indexSelected, 1)
            setDataList([...dataList])
        }
    }
    // --------------<ACTION>--------------

    return <Layout title="Users">
        <PaymentPlanningForm />
        <div className="card mb-5">
            <div className="display-space-between mb-5">
                <h5 className="m-0">List of Payment Planning</h5>
                <SearchBar />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Debit Account</th>
                        <th>Amount</th>
                        <th>Credit Account</th>
                        <th>Auxiliary Account</th>
                        <th>Amount</th>
                        <th>Billing Date</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {(listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="9"><div className="text-center">Loading...</div></td></tr>}
                    {(!listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="9"><div className="text-center">No Data</div></td></tr>}
                    {dataList.length > 0 && dataList?.map((item,i) => {
                        return <tr 
                            key={i} 
                            className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                            onClick={() => selectItem(i)}>
                            <td>{(page*limit) + i + 1}</td>
                            <td>{item?.payee?.payeesID}</td>
                            <td>{lang == 'en' ? item?.payee?.payeesName : item?.payee?.nameInKana}</td>
                            <td>{item?.amount}</td>
                            <td>{item?.paymentMethod}</td>
                            <td>{item?.bankName}</td>
                            <td>{item?.branchName}</td>
                            <td>{item?.accountNumber}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </Layout>
}