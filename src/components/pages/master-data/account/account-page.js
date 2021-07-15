import { Row, Col, InputGroup, Button } from '@paljs/ui';
import Layout from '../../../../Layouts/index';
import { Checkbox } from '@paljs/ui/Checkbox';
import SearchBar from '../../../widget/searchbar';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '../../../widget/modal';
import ReactPaginate from 'react-paginate';
import { getLanguage } from '../../../../helpers/language';
import { getListAccountSwr } from '../../../../services/swr/account-data.swr';
import { deleteAccountApi } from '../../../../services/api/account-data.api';
import ReactHotkeys from 'react-hot-keys';
import AccountForm from './account-form';

export default function AccountPage() {

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
        setPage(number)
    }
    
    const [isLoading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([])
    var listDataSwr = getListAccountSwr({
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
        else if(e.shiftKey && e.key == 'shift+F10') confirmationDelete()
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
            deleteAccountApi(selectedItem()?._id)
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
        <Layout title="Users">
            <ConfirmationModal 
                isOpen={isOpenDeleteConfirmation}
                title="Delete Item"
                description="Do you want to delete this item?"
                cancel={() => setOpenDeleteConfirmation(false)}
                confirm={() => deleteItem()} />
            <div className="card mb-5">
                <h5 className="m-0 mb-4">List of Account</h5>
                <div className="display-space-between mb-5">
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
                <Row className="mb-3">
                    <Col breakPoint={{ xs: 12, md: 2 }}>
                        <div className="mb-2"><label>Account Name</label></div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="accountName"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 2 }}>
                        <div className="mb-2"><label>Supplementary Account</label></div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="supplementaryAccount"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 2 }}>
                        <div className="mb-2"><label>Tax Classification</label></div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="taxClassification"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 2 }}>
                        <div className="mb-2"><label>Tax Inclusive</label></div>
                        <InputGroup fullWidth size="Small">
                            <input 
                                type="text" 
                                name="taxInclusive"
                                onChange={(e) => onChangeInput(e)}
                                placeholder="" />
                        </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <div className="mb-2"><label>Useage Classification</label></div>
                        <Checkbox className="me-5">
                            Lender
                        </Checkbox>
                        <Checkbox>
                            Borrower
                        </Checkbox>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Account Code</th>
                                <th>Name</th>
                                <th>Account Key</th>
                                <th>Account Credit</th>
                                <th>Tax</th>
                                <th>Tax Category</th>
                                <th>Tax</th>
                                <th>Tax Category</th>
                                <th>Debit Useage Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(isOpenForm && !isEdit) && <AccountForm 
                                isOpen={isOpenForm}
                                isEdit={isEdit}
                                closeForm={closeForm}
                                dataUpdated={(res) => onCompletedForm()}
                                dataInserted={(res) => onCompletedForm()}
                                data={selectedItem()} />}
                            {(listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="10"><div className="text-center">Loading...</div></td></tr>}
                            {(!listDataSwr?.isLoading && dataList.length <= 0) && <tr><td colSpan="10"><div className="text-center">No Data</div></td></tr>}
                            {dataList.length > 0 && dataList?.map((item,i) => {
                                if(isOpenForm && isEdit && indexSelected == i) {
                                    return <AccountForm 
                                        isOpen={isOpenForm}
                                        isEdit={isEdit}
                                        closeForm={closeForm}
                                        dataUpdated={(res) => onCompletedForm()}
                                        dataInserted={(res) => onCompletedForm()}
                                        data={selectedItem()} />
                                }
                                return <tr 
                                    key={i} 
                                    className={"cursor-pointer " + (indexSelected == i ? "selected" : "")} 
                                    onClick={() => selectItem(i)}>
                                    <td>{(page*limit) + i + 1}</td>
                                    <td width={150}>{item?.accountCode}</td>
                                    <td width={150}>{item?.name}</td>
                                    <td width={150}>{item?.accountKey}</td>
                                    <td width={150}>{item?.accountCredit}</td>
                                    <td width={150}>{item?.tax1}</td>
                                    <td width={150}>{item?.taxCategory1}</td>
                                    <td width={150}>{item?.tax2}</td>
                                    <td width={150}>{item?.taxCategory2}</td>
                                    <td width={150}>{item?.debitUsageStatus}</td>
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