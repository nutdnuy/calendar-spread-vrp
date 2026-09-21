import React from 'react';
import {createRoot} from 'react-dom/client';
import {CalendarGreeksLab} from './calendar-lab.jsx';
const target=document.getElementById('calendar-greeks-lab');
if(target) createRoot(target).render(<CalendarGreeksLab/>);
