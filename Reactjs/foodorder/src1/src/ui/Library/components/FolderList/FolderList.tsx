import React, { useState } from 'react'
import sharedStyles from "../../LibraryHomepage.module.css"
import { ICONS } from '../../../../resources/icons/Icons';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
import { useAppSelector } from '../../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import CheckBox from '../../../components/chekbox/CheckBox';
import styles from './FolderList.module.css';
import { Tooltip } from 'react-tooltip';
interface IFolder {
    name?: string;
    size?: number,
    childCount?: number;
    createdDate?: string
    id?: string
    onDelete?: (id: string) => void
    onCheck?: (id: string) => void
    checkedValues?: Set<string>
}
const FolderList = (props: IFolder) => {
    const { role_name } = useAppSelector(state => state.auth)
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    return (
        <div className={sharedStyles.libGridItem} >
            <div style={{ cursor: "pointer" }} className={`${sharedStyles.file_icon} ${sharedStyles.image_div}`}>
                <div className="flex items-center">
                    {role_name === TYPE_OF_USER.ADMIN && <div className="mr1" style={{ marginTop: -7 }}>
                        <CheckBox checked={!!props.checkedValues?.has(props.id!)} onChange={() => { props.onCheck?.(props.id!) }} />
                    </div>}
                    <div className="relative" onClick={() => navigate(`/library/${props.name}?from=folders`, { state: { from: location.pathname } })}>
                        <img
                            className={`${styles.img_folder_view}`}
                            src={ICONS.folderImage}
                            width={35}
                            height={35}
                            alt={`null`}
                            loading='lazy'

                        />
                        <span style={{
                            position: 'absolute',
                            fontSize: '7px',
                            whiteSpace: 'nowrap',
                            top: '40%',
                            left: '60%',
                            transform: 'translateX(-50%)',
                            color: '#BB8617',
                        }}  > {props.childCount} ${(props?.childCount || 0) > 1 ? "files" : "file"} </span>
                    </div>
                </div>
                <div onClick={() => {
                    props.onCheck?.('');
                    navigate(`/library/${props.name}?from=folders`, { state: { from: location.pathname } });
                }}>
                    <div className={styles.name_div}>
                        {/* <p className={styles.name_hide}>  {props.name?.substring(0,25)}</p>    */}


                        <p
                            data-tooltip-id={`file-name-${props.id}`}
                            data-tooltip-content={props.name}
                            className={sharedStyles.name}>  {props.name?.substring(0, 25)} {props.name?.length !== undefined && props.name?.length >= 25 ? '...' : ''}</p>
                    </div>
                    <Tooltip style={{ fontSize: 12, zIndex: 99, maxWidth: 300 }} id={`file-name-${props.id}`} place="top" />
                <div  className={sharedStyles.size_date_container}>
                    {/* <p className={sharedStyles.size}>
                        {(props?.size || 0) > 1024 * 1024
                            ? `${((props?.size || 0) / (1024 * 1024)).toFixed(2)} MB`
                            : `${Math.round((props?.size || 0) / 1024)} KB`}
                    </p> */}
                    <div className={` ${sharedStyles.sm_hide_upload_date} ${sharedStyles.grid_item}`} style={{ fontSize: "12px" }}>
                                            {props.createdDate && format(new Date(props.createdDate), 'dd-MM-yyyy')}
                   
                    </div>
                </div>
                </div>
            </div>
            <div className={` ${sharedStyles.sm_hide} ${sharedStyles.grid_item} ${styles.grid_date}`} style={{ fontSize: "14px" }}>
                {props.createdDate && format(new Date(props.createdDate), 'dd-MM-yyyy')}
            </div>
            <div className={`${sharedStyles.grid_item} ${sharedStyles.grid_icon}`}>


               
                    <RiDeleteBinLine
                        style={{ color: role_name === TYPE_OF_USER.ADMIN ? undefined : "rgba(102, 112, 133, 0.5)", cursor: role_name === TYPE_OF_USER.ADMIN ? "pointer" : "not-allowed" }}
                        onClick={() => role_name === TYPE_OF_USER.ADMIN && props?.onDelete?.(props.id!)}
                        className={`${styles.Deleteicons}`}

                    />
                


            </div>
        </div>
    )
}

export default FolderList