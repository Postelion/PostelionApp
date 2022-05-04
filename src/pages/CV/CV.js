import React from 'react'
import './CV.css'
import pdf from '../../components/PDFCreator/PDFCreator';
import CVconfig from '../../config/cv';

class CV extends React.Component
{

    constructor(props)
    {
        super(props);
        this.company = React.createRef();
    }

    render()
    {
        return (
            <div id="CV">
                <div className='CV'>

                </div>
               <div className='download' onClick={()=>{pdf.Generate(this.company.current.value);}}>POBIERZ JAKO PDF</div>
               <input ref={this.company} type="text" placeholder='NAZWA FIRMY'/>
            </div>
        )
    }

}

export default CV;