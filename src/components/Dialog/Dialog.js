import './Dialog.css';
import React from "react";
import Calendar from '../Calendar/Calendar'
import Clock from '../Clock/Clock'

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
    let result;
    const CloseDialogFunc = () =>{
        CloseDialog(dialogContext)
    }
    const ConfirmDialogFunc = () =>{
        onSuccess(result);
        CloseDialog(dialogContext);
    }
    const HtmlContent = () =>
    {
        const func = (date) =>
        {
            result =date;
        }
        return (
            <div style={{display:'grid',gridTemplateRows:'1fr 70px'}}>
                <div style={{display:'grid'}}>
                    <div style={{display:'grid'}}>
                        <Calendar year={StartValue.year} month={StartValue.month} day={StartValue.day} onChange={(e)=>{func(e)}} />
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
export const OpenDialogClock = (dialogContext,StartValue,onSuccess,onExit) =>
{
    let result;
    const CloseDialogFunc = () =>{
        CloseDialog(dialogContext)
    }
    const ConfirmDialogFunc = () =>{
        onSuccess(result);
        CloseDialog(dialogContext);
    }
    const HtmlContent = () =>
    {
        const func = (clock) =>
        {
            result =clock;
        }
        return (
            <div style={{display:'grid',gridTemplateRows:'1fr 70px'}}>
                <div style={{display:'grid'}}>
                    <div style={{display:'grid'}}>
                        
                        <Clock hour={StartValue.hour} minutes={StartValue.minutes} onChange={(e)=>{func(e)}} />
                    </div>
                </div>
                <div className='columns-2'>
                    <div className='close-button' onClick={()=>{CloseDialogFunc()}}>ZAMKNIJ</div>
                    <div className='confirm-buttom' onClick={()=>{ConfirmDialogFunc()}}>ZATWIERDŹ</div>
                </div>
            </div>)
    }
    dialogContext.setDialog_status({status:"clock",content:HtmlContent()});
}
export const CloseDialog = (dialogContext) =>
{
    dialogContext.setDialog_status({status:undefined,content:null});
}


