import React, { useEffect, useState } from 'react'
import styles from '../LibraryHomepage.module.css';
import containerTyles from "./index.module.css";
import { BiArrowBack } from 'react-icons/bi';
import { RxDownload } from 'react-icons/rx';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import tileViewStyles from '../components/FileTileView/index.module.css';
import defauult from '../assetss/default.svg';
import audio from '../../../resources/icons/audioFile.svg'
import powerpoint from '../../../resources/icons/audioFile.svg'
import textFile from '../assetss/textFile.svg';
import wordFile from '../assetss/wordFile.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { IFiles } from './Types';
import MicroLoader from '../../components/loader/MicroLoader';
import { ICONS } from '../../../resources/icons/Icons';
import DeleteFileModal from '../Modals/DeleteFileModal';
import { format, set } from 'date-fns';
import DataNotFound from '../../components/loader/DataNotFound';
import NewFile from '../Modals/NewFile';
import fileTileViewStyles from '../components/FilesTileViewList/index.module.css';
import folderWrapperStyles from '../components/FolderView/folderView.module.css';
import { useAppSelector } from '../../../redux/hooks';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import FileViewer from '../components/FileViewer/FileViewer';
import CheckBox from '../../components/chekbox/CheckBox';
import { FaXmark } from 'react-icons/fa6';
import { TiThMenu } from 'react-icons/ti';
import { BsGrid } from 'react-icons/bs';
import FileTileView from '../components/FileTileView/FileTileView';
import image from '../../../resources/icons/image.png'
import Pagination from '../../components/pagination/Pagination';
import SortByLibrary from '../Modals/SortByLibrary';
import { IoMdSearch } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import useMatchMedia from '../../../hooks/useMatchMedia';

const FolderDetail = () => {
    const path = useParams()
    const [unFilteredFiles, setUnFilteredFiles] = useState<IFiles[]>([])
    const [files, setFiles] = useState<IFiles[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [slectedDeleteId, setSelectedDeleteId] = useState("")
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const { microsoftGraphAccessToken } = useAppSelector(state => state.auth)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [sortOption, setSortOption] = useState<'name' | 'date' | 'size'
    >('date');
    const [videoUrl, setVideoUrl] = useState("")
    const [viewMode, setViewMode] = useState<"list" | "tiles">((localStorage.getItem("fileTypeView") as "list" | "tiles") || "tiles")
    const { role_name } = useAppSelector(state => state.auth)
    const isTablet = useMatchMedia("(max-width: 968px)")
    const isMobile = useMatchMedia("(max-width: 420px)")
    const [fileInfo, setFileInfo] = useState({
        name: "",
        fileType: "",
        url: ""
    })
    const [searchValue, setSearchValue] = useState('');
    const [isFileViewerOpen, setIsFileViewerOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [multiDeletePopup, setMultiDeletePopup] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const [videoName, setVideoName] = useState("")
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 25


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue: string = e.target.value;

        const validCharacters = /^[a-zA-Z0-9\s._ -]*$/;
        if (!validCharacters.test(inputValue)) {

            return; // Exit early if the input contains invalid characters
        }

        setSearchValue(inputValue);

        if (inputValue === '') {
            setFiles(unFilteredFiles);
            return;
        }

        const filteredData = unFilteredFiles.filter((file) =>
            file.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFiles(filteredData);
    };


    const getPaginatedData = (page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    };
    const handleBackWithQuery = () => {
        const previousUrl = location.state?.from;
        const query = searchParams.get("from")
        const queryString = `?from=${query}`;
        if (query) {
            navigate(`${previousUrl}${queryString}`);
            return;
        } else {
            navigate(-1);
        }

    };
    const navigate = useNavigate()
    const handleSort = (option: 'name' | 'date' | 'size') => {
        setSortOption(option);
    };
    const saveFileTypeView = (type: string) => {
        localStorage.setItem('fileTypeView', type)
    }
    const getFolderChilds = async () => {
        try {
            setIsLoading(true)
            const token = Cookies.get('myToken');
            const url = `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drives/b!ziQq5dWt9kWuyPslNaqmjstRGXtbSdFJt7ikFQDkwscktioganMSRLFyrCAJTFu-/root:/${path["*"]}:/children`;
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFiles((resp.data.value as IFiles[]) || [])
            setUnFilteredFiles((resp.data.value as IFiles[]) || [])
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message)
        }
        finally {
            setIsLoading(false)
        }
    }
    const totalPages = Math.ceil(files.length / itemsPerPage);
    useEffect(() => {
        if (path && microsoftGraphAccessToken) {
            getFolderChilds()
        }
    }, [path, microsoftGraphAccessToken])

    const sortedData = [...files].sort((a, b) => {
        switch (sortOption) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'date':
                const dateA = new Date(a.lastModifiedDateTime);
                const dateB = new Date(b.lastModifiedDateTime);
                return dateB.getTime() - dateA.getTime();
            case 'size':
                return b.size - a.size;
            default:
                return 0;
        }
    });


    function getContentThumbnail(mimeType: string | undefined): string {
        if (!mimeType) return defauult;

        switch (mimeType) {
            case 'application/pdf':
                return ICONS.pdf;

            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/webp':
            case 'image/bmp':
            case 'image/tiff':
            case 'image/svg+xml':
            case 'image/x-icon':
            case 'image/heif':
            case 'image/heic':
                return image;

            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            case "application/vnd.ms-excel.sheet.macroEnabled.12":
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
            case "application/vnd.ms-excel.template.macroEnabled.12":
            case "application/vnd.oasis.opendocument.spreadsheet":
            case "text/csv":
            case "text/tab-separated-values":
                return ICONS.excelIcon;

            case 'video/mp4':
                return ICONS.videoPlayerIcon;
            case 'video/mpeg':
            case 'video/ogg':
            case 'video/webm':
            case 'video/x-msvideo':
            case 'video/quicktime':
                return ICONS.viedoImageOne;

            case 'text/plain':
                return textFile;

            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/msword":
            case 'application/vnd.ms-word.document.macroEnabled.12':
            case 'application/vnd.openxmlformats-officedocument.wordtemplate':
            case 'application/vnd.ms-word.template.macroEnabled.12':
            case "application/rtf":
            case "application/vnd.oasis.opendocument.text":
                return wordFile;

            case "audio/x-wav":
            case "audio/mpeg":
            case "audio/wav":
            case "audio/ogg":
            case "audio/aac":
            case "audio/flac":
            case "audio/mp4":
            case "audio/amr":
            case "audio/aiff":
            case "audio/x-ms-wma":
            case "audio/webm":
                return audio;

            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            case "application/vnd.ms-powerpoint.presentation.macroEnabled.12":
            case "application/vnd.openxmlformats-officedocument.presentationml.template":
            case "application/vnd.ms-powerpoint.template.macroEnabled.12":
            case "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
            case "application/vnd.ms-powerpoint.slideshow.macroEnabled.12":
            case "application/vnd.oasis.opendocument.presentation":
                return powerpoint;

            default:
                return defauult;
        }
    }

    const isVideo = (mimeType: string) => {
        if (
            mimeType === "video/mp4" ||
            mimeType === "video/mpeg" ||
            mimeType === "video/ogg" ||
            mimeType === "video/webm" ||
            mimeType === "video/x-msvideo" ||
            mimeType === "video/quicktime"
        ) {
            return true
        } else {
            return false
        }
    }


    const downloadFile = (fileUrl: string, fileName: string) => {
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.download = fileName || "download";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    const handleDelete = async (id = slectedDeleteId, type: "single" | "multi" = "single") => {
        const token = Cookies.get("myToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drive/items/${id}`;
        try {
            const response = await axios.delete(url, config);
            await getFolderChilds()
            if (type === "single") {
                toast.success("Item deleted successfully")
            }
            setSelectedDeleteId("")
        }
        catch (err) {
            console.log("Error", err);
            toast.error((err as Error).message)
        }
    };
    const parent = path["*"]?.split("/")
    const refetch = async () => {
        await getFolderChilds()
    }
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = currentPage * itemsPerPage;

    const handleMultiDelete = async () => {
        setIsPending(true)
        Promise.all(Array.from(selected).map(id => handleDelete(id, "multi")))
            .then((res) => {
                setIsPending(false)
                setSelected(new Set())
                getFolderChilds()
                toast.success(` ${res.length} items deleted successfully`)
            })
            .catch(err => {
                toast.error((err as Error).message)
            })
    }

    const handleCheckboxChange = (fileId: string) => {
        setSelected(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(fileId)) {
                newSelected.delete(fileId);
            } else {
                newSelected.add(fileId);
            }
            return newSelected;
        });
    };

    const isImage = (mimeType: string) => {
        switch (mimeType) {
            case "image/jpeg":
            case "image/png":
            case "image/jpg":
            case "image/gif":
            case "image/webp":
            case "image/bmp":
            case "image/tiff":
            case "image/svg+xml":
            case "image/x-icon":
            case "image/heif":
            case "image/heic":
                return true;
            default:
                return false
        }
    }

    const isAudio = (mimeType: string): boolean => {
        switch (mimeType) {
            case "audio/mpeg":
            case "audio/mp3":
            case "audio/wav":
            case "audio/x-wav":
            case "audio/ogg":
            case "audio/aac":
            case "audio/midi":
            case "audio/x-midi":
            case "audio/webm":
            case "audio/flac":
            case "audio/x-m4a":
            case "audio/x-matroska":
                return true;
            default:
                return false;
        }
    };
    const onPreview = (url: string, type: string, name: string) => {
        const isValidVideo = isVideo(type)
        const isValidImage = isImage(type)
        if (isValidVideo) {
            setIsVideoModalOpen(true)
            setVideoUrl(url)
            setVideoName(name)
            return
        }
        if (isValidImage || isAudio(type)) {
            setFileInfo({ name: name, fileType: type!, url: url })
            setIsFileViewerOpen(true)
            return
        } else {
            window.open(url, "_blank")
        }
    }

    const paginatedData = getPaginatedData(currentPage);

    return (
        <div className={`relative ${styles.libraryContainer}`}>
            <div className={` ${containerTyles.lg_hide} ${styles.libraryHeader}`}>
                <div className={`  ${styles.libSecHeader_right} ${containerTyles.mobile_gap}`} style={{width:"100%"}}>
                    <div className={` bg-white ${containerTyles.flex_auto} ${containerTyles.search_container} ${styles.searchWrapper}`}>
                        <IoMdSearch className={styles.search_icon} />
                        {/* SEARCHINGGGG */}
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearch}
                            placeholder="Search by file name "
                            className={styles.searchInput}
                            maxLength={25}
                        />
                    </div>
                    
                        <SortByLibrary isPalceholder={!isMobile||false} onSort={handleSort} />
                    <button onClick={() => {
                        setViewMode("list")
                        saveFileTypeView("list")
                    }} className={`  ${viewMode === "list" ? styles.active_tile : ""} ${styles.view_btn}`} >
                        <TiThMenu />
                    </button>
                    <button onClick={() => {
                        setViewMode("tiles")
                        saveFileTypeView("tiles")
                    }} className={`  ${viewMode === "tiles" ? styles.active_tile : ""} ${styles.view_btn}`}>
                        <BsGrid />
                    </button>
                    
                </div>
            </div>
            {
                selected.size ?
                    <div className='flex items-center justify-between p2 bg-white'>
                        <div className={styles.delete_left}>
                            <div className={styles.undoButton} onClick={() => {
                                setSelected(new Set())


                            }}>
                                <FaXmark style={{
                                    height: '20px',
                                    width: '20px',
                                }} />
                            </div>
                            <span className={styles.selectedCount}>
                                {selected.size}  selected
                            </span>
                        </div>
                        <div className={styles.delete_right}>
                            <button disabled={isPending} onClick={() => setMultiDeletePopup(true)} className={styles.DeleteButton} >
                                Delete
                            </button>
                        </div>
                    </div>
                    : <div className={styles.libSecHeader}>
                        <div className={styles.folderHeader}>
                            <div className={styles.undoButton} >
                                <BiArrowBack onClick={() => handleBackWithQuery()} style={{
                                    height: '20px',
                                    width: '20px',
                                }} />
                            </div>
                            <p className={styles.recycle_p}> {parent?.[parent?.length - 1] || "Unknown"} </p>

                        </div>

                        <div className={`  ${styles.libSecHeader_right}`}>

                            <div className={` ${containerTyles.mobile_hide} ${styles.searchWrapper}`}>
                                <IoMdSearch className={styles.search_icon} />
                                {/* SEARCHINGGGG */}
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={handleSearch}
                                    placeholder="Search by file name "
                                    className={styles.searchInput}
                                    maxLength={25}
                                />
                            </div>
                            <div className={`${containerTyles.mobile_hide}`}>

                                <SortByLibrary onSort={handleSort} />
                            </div>
                            <button onClick={() => {
                                setViewMode("list")
                                saveFileTypeView("list")
                            }} className={` ${containerTyles.mobile_hide} ${viewMode === "list" ? styles.active_tile : ""} ${styles.view_btn}`} >
                                <TiThMenu />
                            </button>
                            <button onClick={() => {
                                setViewMode("tiles")
                                saveFileTypeView("tiles")
                            }} className={` ${containerTyles.mobile_hide} ${viewMode === "tiles" ? styles.active_tile : ""} ${styles.view_btn}`}>
                                <BsGrid />
                            </button>
                            {role_name === TYPE_OF_USER.ADMIN && <NewFile handleSuccess={refetch} folderUploadPath={`${path["*"]}`} uploadPath={`/${path["*"]}/`} activeSection="dropdown" setLoading={setIsLoading} />}
                        </div>
                    </div>
            }


            {
                <div className={styles.libSectionWrapper}>



                    {viewMode === "list" && <div className={styles.lib_Grid_Header}>
                        <div className={`${styles.grid_item} ${styles.table_name}`}>
                            <div className="flex items-center">
                                {role_name === TYPE_OF_USER.ADMIN && <div className="mr1">
                                    <CheckBox checked={selected.size === paginatedData.length && !!paginatedData.length} onChange={() => {
                                        if (selected.size === paginatedData.length) {
                                            setSelected(new Set())
                                        } else {
                                            const newChecked = new Set(paginatedData.map((item) => item.id))
                                            setSelected(newChecked)
                                        }
                                    }} />
                                </div>}
                                <span>

                                    Name
                                </span>
                            </div>
                        </div>
                        <div className={`${styles.grid_item_upload_date} ${styles.sm_hide} ${styles.grid_item}`}>Uploaded Date</div>
                        <div className={styles.grid_item}>Actions</div>
                    </div>}
                    {
                        isLoading ?
                            <div className={` bg-white py2 ${styles.filesLoader}`}> <MicroLoader /></div>
                            :
                            paginatedData.length ?
                                viewMode === "list" ?
                                    <div className='bg-white' style={{ minHeight: '63vh' }}>
                                        {paginatedData.map((file, index) => {
                                            const fileType = getContentThumbnail(file.folder ? "folder" : file.file?.mimeType!)
                                            const isValidVideo = isVideo(file.file?.mimeType!)
                                            return <div key={file.id} className={styles.libGridItem} >
                                                {
                                                    file.folder ?
                                                        <div className='flex items-center'>
                                                            {role_name === TYPE_OF_USER.ADMIN &&
                                                                <div className="mr1">
                                                                    <CheckBox
                                                                        checked={selected.has(file.id)}
                                                                        onChange={() => handleCheckboxChange(file.id)}
                                                                    />
                                                                </div>
                                                            }
                                                            <Link to={`/library/${path["*"]}/${file.name}`} onClick={() => setSelected(new Set())} className={`${styles.file_icon} ${styles.image_div}`}>
                                                                <img
                                                                    src={ICONS.folderImage}
                                                                />
                                                                <div className={styles.name_div}>

                                                                    <p
                                                                        data-tooltip-id={`file-name-${file.id}`}
                                                                        data-tooltip-content={file.name}

                                                                        className={styles.name}> {file.name?.substring(0, 25)} {file.name?.length !== undefined && file.name?.length >= 25 ? '...' : ''}</p>
                                                                    <Tooltip style={{ fontSize: 12, zIndex: 99, maxWidth: 300 }} id={`file-name-${file.id}`} place="top" />
                                                                    {/* <p className={styles.size}> {(file.size > 1024 * 1024)
                                                                        ? `${(file.size / (1024 * 1024)) > 0 ? (file.size / (1024 * 1024)).toFixed(2) : 0} MB`
                                                                        : `${Math.round(file.size / 1024) > 0 ? Math.round(file.size / 1024) : 0} KB`}</p> */}

                                                                        <div className={`${containerTyles.lg_text_hide}  ${styles.grid_item_dates} `}style={{ fontSize: "12px",display:"inline-block",color:"#000" }}>{format(new Date(file.lastModifiedDateTime), 'dd-MM-yyyy')}</div>
                                                                </div>
                                                            </Link>
                                                        </div>

                                                        :
                                                        <div className="flex items-center">
                                                            {role_name === TYPE_OF_USER.ADMIN && <div className="mr1">
                                                                <CheckBox
                                                                    checked={selected.has(file.id)}
                                                                    onChange={() => handleCheckboxChange(file.id)}
                                                                />
                                                            </div>}
                                                            <div style={{ cursor: "pointer" }} className={`${styles.file_icon} ${styles.image_div}`} onClick={() => {
                                                                if (isValidVideo) {
                                                                    setIsVideoModalOpen(true)
                                                                    setVideoUrl(file["@microsoft.graph.downloadUrl"]!)
                                                                    setVideoName(file.name)
                                                                    return
                                                                }
                                                                if (isImage(file?.file?.mimeType!) || isAudio(file.file?.mimeType!)) {
                                                                    setFileInfo({ name: file.name, fileType: file.file?.mimeType!, url: file["@microsoft.graph.downloadUrl"]! })
                                                                    setIsFileViewerOpen(true)
                                                                    return
                                                                } else {
                                                                    window.open(file.webUrl, "_blank")
                                                                }

                                                            }}>

                                                                <img
                                                                    src={fileType}
                                                                    style={{
                                                                        width: isValidVideo ? 32 : undefined,
                                                                        height: isValidVideo ? 32 : undefined
                                                                    }}
                                                                />
                                                                <div className={styles.name_div}>
                                                                    <p
                                                                        data-tooltip-id={`file-name-${file.id}`}
                                                                        data-tooltip-content={file.name}
                                                                        className={styles.name}>{file.name}</p>
                                                                    <Tooltip style={{ fontSize: 12, zIndex: 99, maxWidth: 300 }} id={`file-name-${file.id}`} place="top" />
                                                                    {/* <p className={styles.size}>
                                                                        {(file.size > 1024 * 1024)
                                                                            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                                                                            : `${Math.round(file.size / 1024)} KB`}
                                                                    </p> */}
                          <div className={` ${containerTyles.lg_text_hide} ${styles.grid_item_dates} `}style={{ fontSize: "12px",display:"inline-block", }}>{format(new Date(file.lastModifiedDateTime), 'dd-MM-yyyy')}</div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                }

                                                <div className={`${styles.grid_item} ${styles.grid_item_upload_date}  ${styles.sm_hide}  `}>{format(new Date(file.lastModifiedDateTime), 'dd-MM-yyyy')}</div>
                                                <div className={`${styles.grid_item} ${styles.grid_icon}`}>
                                                    <RxDownload className={styles.icons_download} style={{ height: '18px', width: '18px', color: isHovered === index && !file.folder ? '#377CF6' : (file.folder ? "rgba(102, 112, 133, 0.5)" : '#101828'), cursor: !file.folder ? "pointer" : "not-allowed" }} onClick={() => !file.folder && downloadFile(file[`@microsoft.graph.downloadUrl`]!, file.name)}
                                                        onMouseOver={() => { setIsHovered(index) }} onMouseLeave={() => { setIsHovered(null) }}
                                                    />
                                                    {role_name === TYPE_OF_USER.ADMIN && <RiDeleteBinLine className={styles.icons_delete} onClick={() => {
                                                        setIsDeleteModalVisible(true)
                                                        setSelectedDeleteId(file.id)
                                                    }}

                                                    />}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    :
                                    <div  style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, minHeight: '70vh',backgroundColor:"#fff" }}>
                                        <div className={fileTileViewStyles.list_grid}>
                                        {paginatedData.map((file) => {
                                            return !file?.folder ? <FileTileView file={{
                                                id: file.id,
                                                name: file.name,
                                                webUrl: file.webUrl,
                                                size: file.size,
                                                "@microsoft.graph.downloadUrl": file["@microsoft.graph.downloadUrl"],
                                                mimeType: file.file?.mimeType,
                                                createdDateTime: `${file.lastModifiedDateTime}`
                                            }} onDelete={() => {
                                                setIsDeleteModalVisible(true)
                                                setSelectedDeleteId(file.id)

                                            }} onFilePreview={onPreview} selected={selected} onCheck={(id) => handleCheckboxChange(id)} key={file.id} /> :
                                                <div
                                                    style={{ cursor: 'pointer' }}
                                                    className={"flex flex-column items-center justify-center"}
                                                    key={file.id}
                                                    onMouseEnter={() => setHoveredIndex(file.id)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    onClick={() => isTablet ? navigate(`/library/${path["*"]}/${file.name}`) : undefined}
                                                    onDoubleClick={() => isTablet ? undefined : navigate(`/library/${path["*"]}/${file.name}`)}
                                                >
                                                    <div className={folderWrapperStyles.createdByWrapper}>

                                                    </div>
                                                    <div className={tileViewStyles.thumbnail_wrapper}>
                                                        <div className={folderWrapperStyles.charDiv}>{file.name.charAt(0)}</div>
                                                        <img src={ICONS.folderImage} alt="" />
                                                        <div className={folderWrapperStyles.checkboxWrapper}>
                                                            <p className={folderWrapperStyles.quantity}>{file.childCount}</p>
                                                            {role_name === TYPE_OF_USER.ADMIN &&
                                                                <div className={` ${selected.has(file?.id!) || isTablet ? tileViewStyles.selected : ""}  ${tileViewStyles.checkbox_wrapper}`}>

                                                                    <CheckBox


                                                                        onChange={() => {

                                                                            handleCheckboxChange(file.id)
                                                                        }}
                                                                        checked={selected.has(file.id)}
                                                                    />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className={"mt2"} style={{ width: "100%" }}>
                                                        <div className={styles.name_div}>

                                                            <div
                                                                data-tooltip-id={`file-name-${file.id}`}
                                                                data-tooltip-content={file.name}
                                                                className={folderWrapperStyles.folder_name}>{file.name.substring(0, 10)}</div>
                                                            <Tooltip style={{ fontSize: 12, zIndex: 99, maxWidth: 300 }} id={`file-name-${file.id}`} place="top" />
                                                        </div>
                                                        <div className={folderWrapperStyles.folderInfo_wrapper} >
                                                            {/* <div className={folderWrapperStyles.foldersize}> {file.size > 1024 * 1024
                                                                ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                                                                : `${Math.round(file.size / 1024)} KB`} </div> */}
                                                                
                                                            <div className={`  ${folderWrapperStyles.folderdate}`}>{format(new Date(file.lastModifiedDateTime), 'dd-MM-yyyy')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                        })}
                                   </div> </div>



                                : <div className={` bg-white py2 ${styles.filesLoader}`}>
                                    <DataNotFound />
                                </div>
                    }

                    {!!paginatedData.length && <div style={{ borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }} className="page-heading-container bg-white" >
                        <p className="page-heading">
                            Showing {startIndex} - {endIndex > files.length ? files.length : endIndex}{' '}
                            of {files.length} item
                        </p>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={(number) => {
                                setCurrentPage(number)
                                setSelected(new Set())
                            }}
                            currentPageData={files}
                            goToNextPage={() => {
                                setCurrentPage(prev => prev + 1)
                                setSelected(new Set())
                            }}
                            goToPrevPage={() => {
                                setCurrentPage(prev => prev - 1)
                                setSelected(new Set())
                            }}
                            perPage={itemsPerPage}
                        />
                    </div>}
                </div>
            }

            {
                isDeleteModalVisible && <DeleteFileModal onDelete={handleDelete} setIsVisible={setIsDeleteModalVisible} />
            }

            {
                multiDeletePopup && <DeleteFileModal onDelete={handleMultiDelete} setIsVisible={setMultiDeletePopup} />
            }
            {
                isVideoModalOpen && <VideoPlayer videoName={videoName} url={videoUrl} onClose={() => setIsVideoModalOpen(false)} />
            }
            {
                isFileViewerOpen && <FileViewer onClose={() => setIsFileViewerOpen(false)} fileUrl={fileInfo.url} fileType={fileInfo.fileType} name={fileInfo.name} />}

        </div>
    )
}

export default FolderDetail