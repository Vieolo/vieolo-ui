import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from './lib/button';
import Chip from './lib/chip';
import DropDownMenu from './lib/dropdown_menu';
import FileInput from './lib/file_input';
import IconButton from './lib/icon_button';
import Input from './lib/input';
import InputSet from './lib/input_set';
import Modal from './lib/modal';
import Textarea from './lib/textarea';
import TextareaSet from './lib/textarea_set';
import TimePicker from './lib/time_picker';
import Select from './lib/select';
import Switch from './lib/switch';
import SwitchSet from './lib/switch_set';

export { 
    Button,
    Chip,
    DropDownMenu,
    FileInput,
    IconButton,
    Input,
    InputSet,
    Modal,
    Textarea,
    TextareaSet,
    TimePicker,
    Select,
    Switch,
    SwitchSet
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();