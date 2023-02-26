import { React, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faXmark, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'


const Header = ({ handleDeleteAll, handleExport, handleFileImport, note }) => {

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='header' >
      <Link to="/" >
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </Link>
      <Link to="/notes">
        <FontAwesomeIcon icon={faPlus} />
        <p>AddNote</p>
      </Link>
      <div className="delete" onClick={handleDeleteAll} style={{ opacity: note.length > 0 ? "1" : "0.7", color: "white" }}>
        <FontAwesomeIcon icon={faXmark} />
        <p>DeleteAll</p>
      </div>
      <div className="export" onClick={handleExport} style={{ opacity: note.length > 0 ? "1" : "0.7", color: "white" }}>
        <FontAwesomeIcon icon={faFileExport} />
        <p>Export</p>
      </div>
      <div className="import" onClick={handleDivClick}>
        <FontAwesomeIcon icon={faFileImport} />
        <p>Import</p>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={(e) => handleFileImport(e)}
        />
      </div>
    </div>
  )
}

export default Header