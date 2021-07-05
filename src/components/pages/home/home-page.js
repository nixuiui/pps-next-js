import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import React from 'react';
import Layout from 'Layouts';

export default function HomePage() {
    return <Layout title="Home">
        <div className="card mb-5">
            <h5 className="m-0 mb-3">Lates Payment Request</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Debit Account</th>
                        <th>Auxiliary Account</th>
                        <th>Credit Account</th>
                        <th>Department</th>
                        <th>Amount(Include Tax)</th>
                        <th>Tax</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="card mb-5">
            <h5 className="m-0 mb-3">List of Payees</h5>
            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>Payee's ID</th>
                        <th>Payee's Name</th>
                        <th>Bank's Code</th>
                        <th>Bank's Name</th>
                        <th>Branch Code</th>
                        <th>Branch Name</th>
                        <th>Account Type</th>
                        <th>Account Number</th>
                        <th>Account Holder</th>
                        <th>Payment Date</th>
                        <th>Payment Methods</th>
                        <th>Commission Fee</th>
                        <th>Payment Terms</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="card mb-5">
            <h5 className="m-0 mb-3">Payment Planning</h5>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layout>
}