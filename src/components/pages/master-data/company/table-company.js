import { useEffect, useState } from 'react';
import { getLanguage } from '../../../../helpers/language';
import { getListCompaniesSwr } from '../../../../services/swr/company.swr';
import SearchBar from "../../../widget/searchbar";
import ReactPaginate from 'react-paginate';
import ReactHotkeys from 'react-hot-keys';
import { deleteCompanyApi } from '../../../../services/api/company.api';
import { ConfirmationModal } from '../../../widget/modal';

export default function TableCompany(props) {

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

    var listDataSwe = getListCompaniesSwr({
        search: search, 
        page: page+1, 
        limit: limit,
        orderBy: "",
        sortBy: "",
    })
    useEffect(() => {
        setLoading(listDataSwe?.isLoading)
        if(listDataSwe?.data?.data) {
            setTotal(listDataSwe?.data?.totalAll)
            setDataList([...listDataSwe?.data?.data])
        }
    }, [listDataSwe?.data])

    // ------------------------------------------
    // [END] GET DATA & PAGINATION
    // ==========================================

    // --------------<FROM>--------------
    const [isOpenForm, setOpenForm] = useState(false)
    const [isEdit, setEdit] = useState(false)
    
    function onCompletedForm() {
        closeForm()
        listDataSwe.mutate()
    }
    
    function closeForm() {
        setIndexSelected(-1)
        setOpenForm(false)
        setEdit(false)
    }
    // --------------<FROM>--------------
    
    // --------------<ACTION>--------------
    function handleKeyDown(keyName, e, handle) {
        if(props?.isOpen) {
            console.log("Company")
            console.log(e.key)
            if(e.key == 'F10') setOpenForm(true)
            else if(e.key == 'F12') closeForm()
            else if(e.shiftKey && e.key == 'F2') openEditForm()
            else if(e.key == 'Backspace') confirmationDelete()
        }
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
            deleteCompanyApi(selectedItem()?._id)
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
        <ConfirmationModal 
            isOpen={isOpenDeleteConfirmation}
            title="Delete Item"
            description="Do you want to delete this item?"
            cancel={() => setOpenDeleteConfirmation(false)}
            confirm={() => deleteItem()} />
        <div className="display-space-between mb-5">
            <SearchBar isLoading={listDataSwe?.isLoading} onSearch={(keyword) => searchData(keyword)} />
        </div>
        <div className=" table-responsive">
            <table className="table">
                <tbody>
                    {(listDataSwe?.isLoading && dataList.length <= 0) && <tr><td colspan="3"><div className="text-center">Loading...</div></td></tr>}
                    {(!listDataSwe?.isLoading && dataList.length <= 0) && <tr><td colspan="3"><div className="text-center">No Data</div></td></tr>}
                    {dataList.length > 0 && dataList?.map((item,i) => {
                        return <tr 
                            key={i} 
                            className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                            onClick={() => selectItem(i)}>
                            <td>{lang == 'en' ? item?.name : item?.nameJa}</td>
                            <td>{item?.address}</td>
                            <td>{item?.phone}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <hr />
        <div className="pagination mt-3">
            <ReactPaginate 
                initialPage={page}
                disableInitialCallback={true}
                onPageChange={(val) => changePage(val?.selected)}
                pageCount={total / limit}/>
        </div>
    </ReactHotkeys>
}