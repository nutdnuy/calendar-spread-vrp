import React from 'react';
import {createRoot} from 'react-dom/client';
import {CalendarGreeksLab} from './calendar-lab.jsx';
const target=document.getElementById('calendar-greeks-lab');
if(target) createRoot(target).render(<CalendarGreeksLab/>);

import {ExpiryLab,DecayLab,IVShiftLab,CarryLab} from './interactive-viz.jsx';
const ExpiryLabTarget=document.getElementById('expiry-lab');
if(ExpiryLabTarget)createRoot(ExpiryLabTarget).render(<ExpiryLab/>);
const DecayLabTarget=document.getElementById('decay-lab');
if(DecayLabTarget)createRoot(DecayLabTarget).render(<DecayLab/>);
const IVShiftLabTarget=document.getElementById('iv-shift-lab');
if(IVShiftLabTarget)createRoot(IVShiftLabTarget).render(<IVShiftLab/>);
const CarryLabTarget=document.getElementById('carry-lab');
if(CarryLabTarget)createRoot(CarryLabTarget).render(<CarryLab/>);
