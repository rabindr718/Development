import React, { useEffect, useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { PiPlusBold, PiMinusBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineExpand } from "react-icons/ai";
import { BiCollapse } from "react-icons/bi";
import styles from "./single.module.css";

const SingleView = ({ selectedItem, setViewLarge }) => {
    const { imageUrl = '', TextRef = '', } = selectedItem || {};
    //  CurrentDate = '', uploadDate = ''

    const zoomWrapperRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const CloseModalX = () => {
        setViewLarge(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                CloseModalX();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className='transparent-model'>
            <div className='bg-white p2 ml2 mr2' style={{ maxWidth: 800, borderRadius: 12, width: "100%", minHeight: 210 }}>
                <div style={{ display: "flex", height: "30px", justifyContent: "space-between" }}>
                    <div className={styles.TitleX}>********{TextRef}</div>
                    <div className={styles.close_btn} onClick={CloseModalX}> <MdClose color='#000' size={32} /></div>

                </div>

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
                    zIndex: isExpanded ? 9999 : 'auto',
                    backgroundColor: 'white',
                    padding: '5px'
                }}>
                    <TransformWrapper
                        smooth
                        minScale={0.5}
                        maxScale={10}
                        ref={zoomWrapperRef}
                        zoomAnimation={{
                            animationType: "linear",
                            animationTime: 500
                        }}
                        wheel={{ smoothStep: .1 }}
                    >
                        <TransformComponent>
                            <div className='mx-auto'
                                style={{ width: "100%", height: "100%", cursor: "zoom-in" }}
                            >
                                <img
                                    className='mx-auto block'
                                    src={imageUrl}
                                    alt={TextRef || "Selected"}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: isExpanded ? '100vh' : 500,
                                        pointerEvents: 'none'
                                    }}
                                /></div>
                        </TransformComponent>
                    </TransformWrapper>

                    <div className={styles.zoom_control_wrapper}>
                        <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef.current?.zoomIn()}>
                            <PiPlusBold color='#000' size={18} />
                        </button>
                        <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef.current?.zoomOut()}>
                            <PiMinusBold color='#000' size={18} />
                        </button>
                    </div>

                    <div className={styles.absolute_zoom_control_wrapper}>
                        <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef.current?.resetTransform()}>
                            <GrPowerReset color='#000' size={18} />
                        </button>
                        <button className={styles.zoom_in_btn} onClick={() => setIsExpanded(prev => !prev)}>
                            {isExpanded ? <BiCollapse color='#000' size={18} /> : <AiOutlineExpand color='#000' size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleView;
// import React, { useEffect, useState, useRef } from 'react';
// import { MdClose } from 'react-icons/md';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
// import { PiPlusBold, PiMinusBold } from "react-icons/pi";
// import { GrPowerReset } from "react-icons/gr";
// import { AiOutlineExpand } from "react-icons/ai";
// import { BiCollapse } from "react-icons/bi";
// import styles from "./single.module.css";

// const SingleView = ({ selectedItem, setViewLarge }) => {
//     const { imageUrl = '', TextRef = '', CurrentDate = '', uploadDate = '' } = selectedItem || {};

//     const zoomWrapperRef = useRef(null);
//     const [isExpanded, setIsExpanded] = useState(false);

//     const CloseModalX = () => {
//         setViewLarge(false);
//     };

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === 'Escape') {
//                 CloseModalX();
//             }
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);

//     return (
//         <div className='transparent-model'>
//             <div className='bg-white p2 ml2 mr2' style={{ maxWidth: 800, borderRadius: 12, width: "100%", minHeight: 200 }}>
//                 <div className='flex mb2 items-center justify-between' >
//                     <h4 style={{ fontSize: 14 }} > {TextRef} </h4>
//                     <button
//                         className={styles.close_btn}
//                         onClick={CloseModalX}
//                     >
//                         <MdClose color='#000' size={32} />
//                     </button>
//                 </div>

//                 <div className='relative flex items-center justify-center mx-auto' style={{
//                     maxWidth: isExpanded ? '100%' : 800,
//                     borderRadius: 12,
//                     width: "100%",
//                     minHeight: 200,
//                     position: isExpanded ? 'fixed' : 'relative',
//                     top: isExpanded ? 0 : 'auto',
//                     left: isExpanded ? 0 : 'auto',
//                     right: isExpanded ? 0 : 'auto',
//                     bottom: isExpanded ? 0 : 'auto',
//                     zIndex: isExpanded ? 9999 : 'auto'
//                 }}>
//                     <TransformWrapper
//                         smooth
//                         minScale={.5}
//                         maxScale={10}
//                         ref={zoomWrapperRef}
//                         zoomAnimation={{
//                             animationType: "linear",
//                             animationTime: 500
//                         }}
//                         wheel={{
//                             smoothStep: .1
//                         }}
//                     >
//                         <TransformComponent  >
//                             <div
//                                 className='mx-auto'
//                                 style={{ width: '100%', height: '100%', cursor: "zoom-in" }}
//                             >
//                                 <img
//                                     className='mx-auto block'
//                                     src={imageUrl}
//                                     alt={TextRef}
//                                     style={{
//                                         maxWidth: "100%",
//                                         maxHeight: isExpanded ? '100vh' : 500,
//                                         pointerEvents: 'none'
//                                     }}
//                                 />


//                             </div>

//                         </TransformComponent>
//                     </TransformWrapper>

//                     <div className={styles.zoom_control_wrapper}>
//                         <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.zoomIn()}> <PiPlusBold color='#000' size={18} /> </button>
//                         <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.zoomOut()}> <PiMinusBold color='#000' size={18} /> </button>
//                     </div>
//                     <div className={styles.absolute_zoom_control_wrapper}>
//                         <button className={styles.zoom_in_btn} onClick={() => zoomWrapperRef?.current?.resetTransform()}> <GrPowerReset color='#000' size={18} /> </button>
//                         <button className={styles.zoom_in_btn} onClick={() => setIsExpanded(prev => !prev)}>  {isExpanded ? <BiCollapse color='#000' size={18} /> : <AiOutlineExpand color='#000' size={18} />}  </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleView;
