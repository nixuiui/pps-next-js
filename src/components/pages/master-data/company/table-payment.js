import { useEffect, useState } from 'react';
import { getLanguage } from '../../../../helpers/language';
import SearchBar from "../../../widget/searchbar";
import ReactPaginate from 'react-paginate';
import { getListCompanyPaymentsSwr } from '../../../../services/swr/company-payment.swr';
import ReactHotkeys from 'react-hot-keys';
import { ConfirmationModal } from '../../../widget/modal';
import { deleteCompanyPaymentsApi } from '../../../../services/api/company-payment.api';
import { dateFormatInput } from '../../../../helpers/general';
import { Button } from '@paljs/ui';

export default function TablePayment(props) {

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

    useEffect(() => {
        listDataSwr.mutate()
        setIndexSelected(-1)
    }, [props?.counter])
    
    const [isLoading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([])

    var listDataSwr = getListCompanyPaymentsSwr({
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
    
    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(props?.isOpen) {
            if(e.key == 'F9') props?.openForm()
            else if(e.key == 'F10') props?.openEditForm()
            else if(e.shiftKey && e.key == 'F12') confirmationDelete()
        }
    }

    const [indexSelected, setIndexSelected] = useState(-1)
    function selectItem(i) {
        if(i != indexSelected) {
            setIndexSelected(i)
            props?.onSelectItem(dataList[i])
        }
        else 
            setIndexSelected(-1)
    }

    function selectedItem() {
        if (indexSelected < 0) return null
        else return dataList[indexSelected]
    }
    
    const [isOpenDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    function confirmationDelete() {
        if(selectedItem() != null) {
            setOpenDeleteConfirmation(true)
        }
    }
    function deleteItem() {
        if(indexSelected > -1) {
            deleteCompanyPaymentsApi(selectedItem()?._id)
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
        <ConfirmationModal 
            isOpen={isOpenDeleteConfirmation}
            title="Delete Item"
            description="Do you want to delete this item?"
            cancel={() => setOpenDeleteConfirmation(false)}
            confirm={() => deleteItem()} />
        <div className="display-space-between mb-5">
            <div className="flex-center">
                <Button 
                    status="Primary" 
                    size="Small"
                    className="me-3"
                    onClick={() => props?.openForm()}>
                    Create (F9)
                </Button>
                <Button 
                    status="Basic" 
                    size="Small"
                    className="me-3"
                    disabled={indexSelected < 0}
                    onClick={() => props?.openEditForm()}>
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
                        <th>Client ID</th>
                        <th>Bank Code</th>
                        <th>Bank Name</th>
                        <th>Account Type</th>
                        <th>Account Holder</th>
                        <th>Closing Date</th>
                        <th>Regulated Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {(listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="8"><div className="text-center">Loading...</div></td></tr>}
                    {(!listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="8"><div className="text-center">No Data</div></td></tr>}
                    {dataList.length > 0 && dataList?.map((item,i) => {
                        return <tr 
                        key={i} 
                        className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                        onClick={() => selectItem(i)}>
                            <td>{(page*limit) + i + 1}</td>
                            <td>{item?.clientId}</td>
                            <td>{item?.bankCode}</td>
                            <td>{item?.bankName}</td>
                            <td>{item?.accountType}</td>
                            <td>{item?.accountHolder}</td>
                            <td>{dateFormatInput(item?.closingDate)}</td>
                            <td>{item?.regulatedAmount}</td>
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
    </ReactHotkeys>
}