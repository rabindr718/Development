import React, { useState, useEffect, useCallback, RefObject } from 'react';
import { ICONS } from "../../../../resources/icons/Icons"
import { MdClose } from 'react-icons/md'
import { TransformWrapper, TransformComponent, useControls, ReactZoomPanPinchContentRef, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import styles from "./index.module.css"
import { PiPlusBold, PiMinusBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineExpand } from "react-icons/ai"
import { BiCollapse } from "react-icons/bi"
interface IProps {
    fileUrl?: string | undefined;
    fileType?: string | undefined;
    onClose?: () => void
    name?: string
}

const FileViewer = ({ fileUrl = "", fileType = "", onClose, name }: IProps) => {
    const zoomWrapperRef = React.useRef<ReactZoomPanPinchRef>(null);
    const [isExpanded, setIsExpanded] = useState(false)
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('Key pressed:', event.key);
            if (event.key === 'Escape') {
                console.log('Escape key pressed');
                onClose?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
    const isAudioFile = isAudio(fileType)

    return (
        <div className='transparent-model' >
            <div className={`ml2 mr2   ${isAudioFile ? "bg-white py1" : isExpanded ? styles.transparent : styles.bg_black} `} style={{ maxWidth: 800, borderRadius: 12, width: "100%", minHeight: 200, overflow: "hidden" }}>
                <div className={`flex  items-center justify-between px2  ${!isAudioFile ? "p1" : "mb2 "}`}>
                    {!isExpanded && <h4 style={{ fontSize: 14, color: isAudioFile ? "#000" : '#fff' }} > {name} </h4>}
                    {!isExpanded && <button
                        className={styles.close_btn}
                        onClick={(e) => {
                            onClose?.()
                        }}
                    >
                        <MdClose color={isAudioFile ? "#000" : '#fff'} size={32} />
                    </button>}
                </div>
                {
                    isAudioFile ?
                        <>
                            <img className='mx-auto block' src={ICONS.audioPlaceholder} alt="" />
                            <audio controls className='mx-auto block mt2' src={fileUrl} style={{ maxWidth: "100%", maxHeight: 500 }} />
                        </>
                        :
                        <div className='relative flex items-center justify-center mx-auto' style={{
                            maxWidth: isExpanded ? '100%' : 800,
                            borderRadius: 12,
                            width: "100%",
                            minHeight: 200,
                            position: isExpanded ? 'fixed' : 'relative',
                            top: isExpanded ? 0 : 'auto',
                            left: isExpanded ? 0 : 'auto',
                            right: isExpanded ? 0 : 'auto',
                            bottom: isExpanded ? 0 : 'auto',
                            zIndex: isExpanded ? 9999 : 'auto'
                        }}>
                            <TransformWrapper
                                smooth
                                minScale={.5}
                                maxScale={10}
                                ref={zoomWrapperRef}
                                zoomAnimation={{
                                    animationType: "linear",
                                    animationTime: 500
                                }}
                                wheel={{
                                    smoothStep: .1
                                }}
                            >
                                <TransformComponent  >
                                    <div
                                        className='mx-auto'
                                        style={{ width: '100%', height: '100%', cursor: "zoom-in",maxHeight:"90vh" }}
                                    >
                                        <img
                                            className='mx-auto block'
                                            src={fileUrl}
                                            alt={name}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: isExpanded ? '100vh' : 500,
                                                pointerEvents: 'none'
                                            }}
                                        />


                                    </div>

                                </TransformComponent>

                            </TransformWrapper>
                            <div className={styles.zoom_control_wrapper}>
                                <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.zoomIn()}> <PiPlusBold color='#000' size={18} /> </button>
                                <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.zoomOut()}> <PiMinusBold color='#000' size={18} /> </button>
                            </div>
                            <div className={styles.absolute_zoom_control_wrapper}>
                                <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.resetTransform()}> <GrPowerReset color='#000' size={18} /> </button>
                                <button className={styles.zoom_in_btn} onClick={() => {
                                    if (!isExpanded) {
                                        zoomWrapperRef?.current?.resetTransform()
                                    }
                                    setIsExpanded(prev => !prev)
                                }}>  {isExpanded ? <BiCollapse color='#000' size={18} /> : <AiOutlineExpand color='#000' size={18} />}  </button>
                            </div>
                        </div>

                }

            </div>

        </div>
    )
}

export default FileViewer
