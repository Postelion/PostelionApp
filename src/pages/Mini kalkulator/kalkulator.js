//import css
import './kalkulator.css';
import React,{useRef,useEffect} from 'react';
import $ from 'jquery';
import { asPDFName } from 'pdf-lib';
//funkcja
function Kalkulator(props)
{
    //zmienne
    //let zmienna1 = 1; //liczba
    //let zmienna2 = true; //prawda/fałsz
    //let zmienna3 = 'Dare1k'; //tekst
    //let zmienna4 = [1,2,'asdf',4,'qwe']; //tablica
    //let zmienna5 = 1.2; //liczba zmiennoprzecinkowa
    //let zmienna6 = {imie:zmienna3};//objekt

    //stała
    //const Imie = 'Dominik';

    //funkcja
    // function dodawanie(liczba_a, liczba_b)
    // {
    //     //wynik
    //     return liczba_a + liczba_b; 
    // }

    //wynik
    // let wynik = dodawanie(5,7);

    // console.log(zmienna3.length);
    // //petla
    // for (let index = 0; index < zmienna3.length; index++) {
    //     console.log(zmienna3[zmienna3.length-1]); 
    // }

    //wyswielanie na konsole
    // console.log(zmienna4);

        const inputEkranik= useRef();

        let liczba = '0';
        let liczba2 = '0';
        let dzialanie = 0;

        useEffect(()=>{
            inputEkranik.current.value = liczba; 
        })

        
        function dodajcyfre(cyfra)
        {
            if(dzialanie==0)
            {
                liczba = liczba.concat (cyfra);
                inputEkranik.current.value = parseFloat(liczba);
            }
            else 
            {
                if(dzialanie ==5)
                {
                    liczba='0';
                    liczba = liczba.concat (cyfra);
                    inputEkranik.current.value = parseFloat(liczba);
                    dzialanie=0;
                }
                else {
                    liczba2 = liczba2.concat (cyfra);
                    inputEkranik.current.value = parseFloat(liczba2);
                }
            }
        }

        
        function dzielenie()
        {
            if(dzialanie==1)
            {
                liczba = (parseFloat(liczba)/parseFloat(liczba2)).toString();
                liczba2 ='';
                inputEkranik.current.value = liczba;

            }
            else
            {
                if(dzialanie==0)
                {
                    liczba = inputEkranik.current.value;
                    inputEkranik.current.value = '';
                    dzialanie = 1;
                }
                else {
                    if(dzialanie==2) mnozenie()
                    else if(dzialanie==3) odejmowanie()
                    else if(dzialanie==4) dodawanie()
                    dzialanie=1;

                }
            }
            
        }

        
        function mnozenie()
        {
            if(dzialanie==2)
            {
                liczba = (parseFloat(liczba)*parseFloat(liczba2)).toString()
                liczba2 = '';
                inputEkranik.current.value = liczba;
            }   
            else
            {
                if(dzialanie==0)
                {
                    liczba = inputEkranik.current.value;
                    inputEkranik.current.value = '';
                    dzialanie = 2;
                }
                else
                {
                    if(dzialanie==1) dzielenie()
                    else if(dzialanie==3) odejmowanie()
                    else if(dzialanie==4) dodawanie()
                    dzialanie=2;
                }
            }
        }


        function odejmowanie()
        {
            if(dzialanie==3)
            {
                liczba = (parseFloat(liczba)-parseFloat(liczba2)).toString()
                liczba2 = '';
                inputEkranik.current.value = liczba;
            }   
            else
            {
                if(dzialanie==0)
                {
                    liczba = inputEkranik.current.value;
                    inputEkranik.current.value = '';
                    dzialanie = 3;
                }
                else
                {
                    if(dzialanie==1) dzielenie()
                    else if(dzialanie==2) mnozenie()
                    else if(dzialanie==4) dodawanie()
                    dzialanie=3;
                }
            }
        }


        function dodawanie()
        {
            if(dzialanie==4)
            {
                liczba = (parseFloat(liczba)+parseFloat(liczba2)).toString()
                liczba2 = '';
                inputEkranik.current.value = liczba;
            }   
            else
            {
                if(dzialanie==0)
                {
                    liczba = inputEkranik.current.value;
                    inputEkranik.current.value = '';
                    dzialanie = 4;
                }
                else
                {
                    if(dzialanie==1) dzielenie()
                    else if(dzialanie==2) mnozenie()
                    else if(dzialanie==3) odejmowanie()
                    dzialanie = 4;
                }
            }
        }


        function wynik()
        {
            inputEkranik.current.value = liczba;
            if(dzialanie==1) dzielenie()
            else if(dzialanie==2) mnozenie()
            else if(dzialanie==3) odejmowanie()
            else if(dzialanie==4) dodawanie()
            dzialanie = 5;
            liczba2='0';
        }
        


    return (
        <div id='kalkulatorTlo'>
            <div id='kalkulator'>
                <div id='ekranik'>
                    <input ref={inputEkranik} type='number'/>
                </div>
                <div id='przyciski'>
                    <div>
                        <div onClick={()=>{dodajcyfre('7')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('8')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('9')}} className='button'></div>
                        <div onClick={()=>{dzielenie()}} className='button'></div>
                    </div>
                    <div>
                        <div onClick={()=>{dodajcyfre('4')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('5')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('6')}} className='button'></div>
                        <div onClick={()=>{mnozenie()}} className='button'></div>
                    </div>
                    <div>
                        <div onClick={()=>{dodajcyfre('1')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('2')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('3')}} className='button'></div>
                        <div onClick={()=>{odejmowanie()}} className='button'></div>
                    </div>
                    <div>
                        <div onClick={()=>{dodajcyfre('0')}} className='button'></div>
                        <div onClick={()=>{dodajcyfre('.')}}  className='button'></div>
                        <div onClick={()=>{dodawanie()}} className='button'></div>
                        <div onClick={()=>{wynik()}} className='button'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kalkulator;
