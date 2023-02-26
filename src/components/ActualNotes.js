import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faNoteSticky } from '@fortawesome/free-solid-svg-icons'


const ActualNotes = ({ note }) => {
    return (
        <Link to={`/notes/${note.id}`}>
            <div className='actual-notes' id={note.id}>
                <div className="time">
                    <FontAwesomeIcon icon={faClock} />
                    {note.time}
                </div>

                <div className="content">
                    <div className="title">
                        <FontAwesomeIcon icon={faNoteSticky} />
                        {note.title}
                    </div>

                    <div className="description">
                        {note.description.slice(0, 110)}{note.description.length < 110 ? "" : "..."}

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ActualNotes

