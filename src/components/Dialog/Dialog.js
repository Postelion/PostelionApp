import './Dialog.css';
import React from "react";
import Calendar from '../Calendar/Calendar'

function Dialog (props)
{
    const dialogState = React.useContext(DialogContext);
    let style = dialogState.dialog_status.status === undefined? {visibility:'hidden'}:{visibility:'visible'};
    return (

    <div className="dialog-view" style={style} ref={e=>{dialogState.dialog = e}} >
        <div className='dialog-content'>
            {dialogState.dialog_status.content?dialogState.dialog_status.content:''}
        </div>
    </div>
    )
}
export default Dialog;

export const DialogContext = React.createContext();

export const OpenDialogDate = (dialogContext,StartValue,onSuccess,onExit) =>
{
    const CloseDialogFunc = () =>{
        CloseDialog(dialogContext)
    }
    const ConfirmDialogFunc = () =>{
        onSuccess();
        CloseDialog(dialogContext);
    }
    const HtmlContent = () =>
    {
        const func = (date) =>
        {
            console.log(date);
        }
        return (
            <div style={{display:'grid',gridTemplateRows:'1fr 70px'}}>
                <div style={{display:'grid'}}>
                    <div style={{display:'grid'}}>
                        <Calendar onChange={(e)=>{func(e)}} />
                    </div>
                </div>
                <div className='columns-2'>
                    <div className='close-button' onClick={()=>{CloseDialogFunc()}}>ZAMKNIJ</div>
                    <div className='confirm-buttom' onClick={()=>{ConfirmDialogFunc()}}>ZATWIERDŹ</div>
                </div>
            </div>)
    }
    dialogContext.setDialog_status({status:"date",content:HtmlContent()});
}
export const CloseDialog = (dialogContext) =>
{
    dialogContext.setDialog_status({status:undefined,content:null});
}


