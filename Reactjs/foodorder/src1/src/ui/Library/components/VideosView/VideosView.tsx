import React from 'react';
import { useState } from 'react';
import { ICONS } from '../../../../resources/icons/Icons';
import styles from './videosview.module.css';
import dummyVideoThumbnail from '../../assetss/dummyVideoThumbnail.svg'
import playBtn from '../../assetss/playBtn.svg'
import { PiLineVerticalThin } from "react-icons/pi";
import dummyThumbnail from '../../assetss/dummyThumbnail.svg'
import vidThumbnail from '../../assetss/vidThumbnail.svg'
import myThum from '../../assetss/myThum.svg'
import video from '../../assetss/video1x.png'
import { RxDownload } from 'react-icons/rx';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteFileModal from '../../Modals/DeleteFileModal';
import { toast } from 'react-toastify';

// Define the interface for the video data
interface VideoData {
  url: string;
  name: string;
  lastModifiedDateTime: string;
  iconName: string;
  size: number;
  FileType?: string; // Marking it as optional if some entries don't have it
  url_play?: string;
  video?: {
    duration?: number;
  }
  "@microsoft.graph.downloadUrl": string;
  fileType?: string; // Optional, only relevant for video files
  

}

const downloadFile = (fileUrl: string, fileName: string) => {
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = fileName || "download";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}


interface VideosViewProps {
  videoData: VideoData[]; // Expect an array of VideoData objects
  onClick: (url: string, name?: string) => void;

}

function VideosView({ videoData, onClick, }: VideosViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const converted = (duration: number) => {
    const durationMs = duration;
    const totalSeconds = durationMs / 1000;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(2);

    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
  }
  const [deleteItem,setDeleteItem]=useState<number | null>(null);
  const [videos, setVideos] = useState<VideoData[]>(videoData);
  const confirmDelete = () => {
    if (deleteItem !== null) {
      // Delete the video from the local state
      const updatedVideos = videos.filter((_, index) => index !== deleteItem);
      setVideos(updatedVideos); 
      setDeleteItem(null); 
      setIsVisible(false);
      toast.success("Dummy Deletion");
    }
    else{
      toast.error("Error");
    }
  };
  const OpenModal = () => {
    setIsVisible(!isVisible);
  };
  const [isHovered,setIsHovered]=useState<number | null>(null);
  const [isHoveredDownload,setIsHoveredDownload]=useState<number | null>(null);
 
  return (
    <div className={styles.folderMain_wrapper}>
      { videos.map((Video: VideoData, index: number) => (
        <div className={styles.folderDiv} key={index} onClick={() => onClick(Video["@microsoft.graph.downloadUrl"], Video.name)}>
          <div className={videos.length >6 ? styles.videoImage_wrapper : styles.videoImage_wrapperr}>
            <div className={styles.transparent_play}>
              <img
                src={playBtn}
                alt="Play"
                sizes='10'
                className={styles.transparent_play_botton}
              />
            </div>
            <div className={styles.video_time}>
              {converted(Video.video?.duration!) || "N/A"}
            </div>

           <div className={styles.videosview_images}>
           <img
              src={video}
              alt="Video Thumbnail"
              className={styles.videoIcon}
              sizes='100'
            />
            </div>
          </div>

          <div className={styles.folderContent_wrapper}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:'280px'}}>
          

            <div className={styles.videosview_name}>{Video.name.substring(0, 15)} {parseInt(Video.name) >= 16 ? '...' : ''}</div>
           
            <div className={styles.vidIcons}>

            <RiDeleteBinLine
                          className={styles.icons_delete}
                          onClick={(e) => {
                            e.stopPropagation();
                            OpenModal();
                            console.log("Delete button clicked---> ");
                            setDeleteItem(index);
                            
                          }} 
                          style={{ height: '14px', width: '14px',  color: isHovered === index? '#377CF6' : '#101828', cursor:'pointer', }}
                          
                          onMouseOver={()=>setIsHovered(index)}
                          onMouseLeave={()=>setIsHovered(null)}
                          />

              <RxDownload
                  className={styles.icons_download}
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadFile(Video["@microsoft.graph.downloadUrl"], Video.name)}}
                  style={{ height: '14px', width: '14px',color: isHoveredDownload === index? '#377CF6' : '#101828', cursor:'pointer' }}

                  onMouseOver={()=>setIsHoveredDownload(index)}
                          onMouseLeave={()=>setIsHoveredDownload(null)}
                />
                
                </div>
              </div>
            <div className={styles.videoInfo_wrapper}>

             <div className={styles.vidTextWrapper}>
               
             <div className={styles.videosSize}>
                {(Video.size / (1024 * 1024)).toFixed(2)} MB
              </div>
              {/* <PiLineVerticalThin className={styles.videos_LineVertical} /> */}
              <div className={styles.videosdate}>
              {(() => {
              const dateString = Video.lastModifiedDateTime.substring(0, 10); // Get "YYYY-MM-DD"
              const date = new Date(dateString);
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
              })()}
              </div>
              </div>
              

              
                </div>
                
            </div>
          </div>
      ))
      }

      {
         isVisible && <DeleteFileModal  setIsVisible={setIsVisible} onDelete={()=>confirmDelete()}/>
      }
      
    </div>
  );
}

export default VideosView;
