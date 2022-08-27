import './Text.css';
import LibraryTheme from './../../../lib/Theme';

function Text(props)
{
    const Icon = LibraryTheme.GetIcon(props.icon);
    return (<div className='text_input'>
        <input placeholder={props.placeholder}/>
        <Icon/>
    </div>);
}

export default Text;