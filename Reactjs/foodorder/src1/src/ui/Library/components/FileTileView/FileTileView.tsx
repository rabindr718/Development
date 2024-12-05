import React from 'react'
import styles from "./index.module.css"
import { GoTrash } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { format } from 'date-fns';
import { useAppSelector } from '../../../../redux/hooks';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
import excel from '../../../../resources/icons/excel.png'
import image from '../../../../resources/icons/image.png'
import pdf from '../../../../resources/icons/pdf.png'
import powerpoint from '../../../../resources/icons/powerpoint.png'
import video from '../../../../resources/icons/video.png'
import word from '../../../../resources/icons/word.png'
import folderImage from '../../../../resources/icons/folderimage.svg'
import text from '../../assetss/textFile.svg'
import defaultImage from '../../assetss/default.svg'
import CheckBox from '../../../components/chekbox/CheckBox';
import audio from '../../../../resources/icons/audioFile.svg'
import { Tooltip } from 'react-tooltip';
import useMatchMedia from '../../../../hooks/useMatchMedia';

export interface IFiles {
  createdDateTime: string;
  id: string;
  name: string;
  webUrl: string;
  size: number;
  "@microsoft.graph.downloadUrl"?: string;
  mimeType?: string
}

export interface IFileTileViewProps {
  file?: IFiles;
  onDelete: (id: string) => void;
  onFilePreview: (url: string, type: string, name: string) => void;
  onCheck: (id: string) => void;
  selected: Set<string>
}

const downloadFile = (fileUrl: string, fileName: string) => {
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = fileName || "download";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

const FileTileView = ({ file, onDelete, onFilePreview, onCheck, selected }: IFileTileViewProps) => {
  const { role_name } = useAppSelector(state => state.auth)
  const isTablet  = useMatchMedia("(max-width: 968px)")
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

  const getUrl = () => {
    if (isImage(file?.mimeType!) || isVideo(file?.mimeType!) || isAudio(file?.mimeType!)) {
      return file?.['@microsoft.graph.downloadUrl']
    }
    else {
      return file?.webUrl!
    }
  }

  const getContentThumbnail = (type: string) => {
    switch (type) {
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
        return image

      case "application/pdf":
        return pdf

      case "application/vnd.ms-excel":  // XLS
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":  // XLSX
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":  // XLTX
      case "application/vnd.ms-excel.sheet.macroEnabled.12":  // XLSM
      case "application/vnd.ms-excel.template.macroEnabled.12":  // XLTM
      case "application/vnd.oasis.opendocument.spreadsheet":  // ODS
      case "text/csv":  // CSV
      case "text/tab-separated-values":
        return excel;

      case "video/mp4":
      case "video/mpeg":
      case "video/ogg":
      case "video/webm":
      case "video/x-msvideo":
      case "video/quicktime":
        return video

      case "folder":
        return folderImage


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

      case "text/plain":
        return text;

      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      case "application/vnd.ms-powerpoint.presentation.macroEnabled.12":
      case "application/vnd.openxmlformats-officedocument.presentationml.template":
      case "application/vnd.ms-powerpoint.template.macroEnabled.12":
      case "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
      case "application/vnd.ms-powerpoint.slideshow.macroEnabled.12":
      case "application/vnd.oasis.opendocument.presentation":
        return powerpoint;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
      case 'application/vnd.ms-word.document.macroEnabled.12':
      case 'application/vnd.openxmlformats-officedocument.wordtemplate':
      case 'application/vnd.ms-word.template.macroEnabled.12':
      case "application/rtf":
      case "application/vnd.oasis.opendocument.text":
        return word;
      default:
        return defaultImage

    }
  };

  return (
    <div className='bg-white'>
      <div style={{ cursor: "pointer" }} className={` relative ${styles.thumbnail_wrapper}`} onClick={() => {
        onFilePreview(getUrl()!, file?.mimeType!, file?.name!)
      }}>
        <div className={styles.avatar_circle}>
          {file?.name?.[0]}
        </div>
        <img src={getContentThumbnail(file?.mimeType!)} width={48} height={46} alt="" />
        {role_name === TYPE_OF_USER.ADMIN && <div onClick={(e) => {
          e.stopPropagation()
        }} className={` ${selected.has(file?.id!) || isTablet ? styles.selected : ""}  ${styles.checkbox_wrapper}`}>
          <CheckBox checked={selected.has(file?.id!)} onChange={() => { onCheck(file?.id!) }} />
        </div>}
      </div>

      <div className={styles.avatar_name_div}>

        <div className="flex items-center justify-between mt2">

          <div className={styles.avatar_name_conatiner}>

            <h4 data-tooltip-id={`file-name-${file?.id}`}
              data-tooltip-content={file?.name} className={styles.card_title} onClick={() => {
                onFilePreview(getUrl()!, file?.mimeType!, file?.name!)
              }}> {file?.name} </h4>
            <Tooltip style={{ fontSize: 12,zIndex:99 ,maxWidth:300}} id={`file-name-${file?.id}`} place="top" />
          </div>

          <div className="flex items-center">
            {role_name === TYPE_OF_USER.ADMIN && <span onClick={() => onDelete(file?.id!)} className={styles.card_btn}>
              <GoTrash size={14} />
            </span>}
            <span className={styles.card_btn}>
              <LuDownload size={14} onClick={() => downloadFile(file?.["@microsoft.graph.downloadUrl"] !== undefined ? file?.["@microsoft.graph.downloadUrl"] : '', file?.name !== undefined ? file?.name : '')} />
            </span>
          </div>
        </div>
        <div style={{ marginTop: 2 }} className={`flex  items-center justify-between ${styles.card_content}`}>
          {/* <p>{(file!.size > 1024 * 1024)
            ? `${(file!.size / (1024 * 1024)).toFixed(2)} MB`
            : `${Math.round(file!.size / 1024)} KB`}</p> */}
          <p> {file?.createdDateTime && format(new Date(file?.createdDateTime), 'dd MMM, yy')} </p>
        </div>
      </div>
    </div>
  )
}

export default FileTileView
