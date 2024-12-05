import React from 'react'
import styles from './index.module.css'
import FileTileView from '../FileTileView/FileTileView'

export interface IFiles {
  createdDateTime: string;
  id: string;
  name: string;
  webUrl: string;
  size: number;
  "@microsoft.graph.downloadUrl"?: string;
  mimeType?: string;
}

interface IFilesTileViewListProps {
  files?: IFiles[];
  onDelete: (id: string) => void;
  onFilePreview: (url: string, type: string, name: string) => void;
  selected: Set<string>
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>
}

const FilesTileViewList = ({ files = [], onDelete, onFilePreview, setSelected, selected }: IFilesTileViewListProps) => {
  const handleCheckboxChange = (id: string) => {
    const newSet = new Set(Array.from(selected))
    if (selected.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelected(newSet)
  }
  return (
    <div className={styles.list_grid}>
      {
        files.map((file) => {
          return <FileTileView selected={selected} onCheck={handleCheckboxChange} onFilePreview={(url: string, type: string, name: string) => onFilePreview(url, type, name)} onDelete={(id: string) => onDelete(id)} file={file} key={file.id} />
        })
      }


    </div>
  )
}

export default FilesTileViewList
