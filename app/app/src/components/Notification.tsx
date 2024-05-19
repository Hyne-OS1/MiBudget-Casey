import { Notification } from '@mantine/core';
import { CiWarning } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

type NotificationBarProps = {
    message: string;
    type: 'success' | 'warning' | 'error';
}
function NotificationBar({
    message,
    type,
}: NotificationBarProps) {
    const checkIcon = <IoIosCheckmarkCircleOutline size={24} />;
    const warningIcon = <CiWarning size={(24)} />;
    const errorIcon = <MdErrorOutline size={(24)} />;

    return (
        <>
            <Notification
                icon={type === 'success' ? checkIcon : type === 'warning' ? warningIcon : errorIcon}
                title={message}
                color= {type === 'success' ? 'teal' : type === 'warning' ? 'yellow' : 'red'}
                style={{ marginBottom: 20 }}
                onClose={() => { 
                    console.log('Notification Closed');
                }}
            />
        </>
    );
}

export default NotificationBar;