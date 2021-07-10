import { Button, Modal } from "@paljs/ui";

export function ConfirmModal(props) {
    return <Modal on={props?.isOpen}>
        <div className="card" style={{width: 400}}>
            <div className="text-center mb-5">
                <strong>This User Already Exists</strong>
                <div>Are you sure want to input?</div>
            </div>
            <div className="text-center">
                <Button
                    onClick={() => props?.cancel()}
                    status="Basic"
                    className="me-3"
                    size="Small">
                        No
                </Button>
                <Button
                    onClick={() => props?.confirm(props?.key)}
                    size="Small">
                    Yes
                </Button>
            </div>
        </div>
    </Modal>
}

export function ErrorModal(props) {
    return <Modal on={props?.isOpen}>
        <div className="card" style={{width: 400}}>
            <div className="text-center mb-5">
                <strong>This User Already Exists</strong>
                <div>Are you sure want to input?</div>
            </div>
            <div className="text-center">
                <Button
                    onClick={() => props?.confirm()}
                    size="Small">
                    Ok
                </Button>
            </div>
        </div>
    </Modal>
}

export function SuccessModal(props) {
    return <Modal on={props?.isOpen}>
        <div className="card" style={{width: 400}}>
            <div className="text-center mb-5">
                <div>{props?.message}</div>
            </div>
            <div className="text-center">
                <Button
                    onClick={() => props?.confirm()}
                    status="Basic"
                    size="Small">
                    Close
                </Button>
            </div>
        </div>
    </Modal>
}