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

    useEffect(() => {
        listDataSwr.mutate()
        setIndexSelected(-1)
    }, [props?.counter])
    
    const [isLoading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([])

    var listDataSwr = getListCompaniesSwr({
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
        if(props?.isOpen) {
            console.log("Company")
            console.log(e.key)
            if(e.key == 'F10') props?.openForm()
            else if(e.key == 'F12') props?.closeForm()
            else if(e.shiftKey && e.key == 'F2') props?.openEditForm()
            else if(e.key == 'Backspace') confirmationDelete()
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
            <SearchBar isLoading={listDataSwr?.isLoading} onSearch={(keyword) => searchData(keyword)} />
        </div>
        <div className=" table-responsive">
            <table className="table">
                <tbody>
                    {(listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="3"><div className="text-center">Loading...</div></td></tr>}
                    {(!listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="3"><div className="text-center">No Data</div></td></tr>}
                    {dataList.length > 0 && dataList?.map((item,i) => {
                        return <tr 
                            key={i} 
                            className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                            onClick={() => selectItem(i)}>
                            <td>{lang == 'en' ? item?.name : item?.nameJa}, {item?.companyType}</td>
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