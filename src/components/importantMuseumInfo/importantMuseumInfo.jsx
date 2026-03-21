import './importantMuseumInfo.css'

export const ImportantMuseumInfo = (props) => {

    const {title, icon, blockInfo, style } = props;
    return(
        <div style={style} className='importantMuseumInfo'>
            <img className="museumuImportantIcon" src={icon} alt={`icon of ${title}`} />
            <div className='innerMusuemImportantBlock'>
                <h4>{title}</h4>
                <div className='ourLocationImportantBlock'>
                    <p>
                        {blockInfo}
                    </p>
                </div>
            </div>
        </div>
    )
}

