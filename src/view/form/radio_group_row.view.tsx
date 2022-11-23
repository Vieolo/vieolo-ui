// React
import React, { useState } from 'react';

// Vieolo UI
import Typography from '../../Typography';
import RadioGroupRow from '../../RadioGroupRow';

// Types
import { ViewData } from '../main/main';

// Material UI
import SampleIcon1 from '@mui/icons-material/AccessibleForwardTwoTone';
import SampleIcon2 from '@mui/icons-material/Backspace';
import SampleIcon3 from '@mui/icons-material/Cached';

type RadioGroupRowPropsType = React.ComponentProps<typeof RadioGroupRow>;

export function radioGroupRowOptions(): ViewData {
  return {
    constants: {
  } as Partial<RadioGroupRowPropsType>,
    variables: {
      direction: {
        options: ['horizontal', "vertical"],
        default: "horizontal"
      },
      horizontalButtonPadding: {
        options: ["10", "20", "30"],
        default: 10,
        type: 'number'
      },
      withIcon: {
        options: [false, true],
        default: false
      },
      withSubtitle: {
        options: [true, false],
        default: false
      },
      disabled: {
          options: [false, true],
          default: false,
      },
      titleType: {
          options: ['string', 'component'],
          default: 'string'
      },
      subtitleType: {
          options: ['string', 'component'],
          default: 'string'
      },

    }
  }
}

export function RadioGroupRowCreator(props: { p: RadioGroupRowPropsType }) {
  let [selected, setSelected] = useState<string>("One");

  let textOptions = [
    {id: 'One', button: 'A Very Long Text'},
    {id: 'Two', button: 'Two'},
    {id: 'Three', button: 'Three'},
  ];

  let iconOptions = [
    { id: 'One', button: <SampleIcon1 /> },
    { id: 'Two', button: <SampleIcon2 /> },
    { id: 'Three', button: <SampleIcon3 /> },
  ];

  return <RadioGroupRow
    direction={props.p.direction}
    onOptionChange={o => setSelected(o)}
    options={(props.p as any).withIcon ? iconOptions : textOptions}
    value={selected}
    horizontalButtonPadding={props.p.horizontalButtonPadding}
    disabled={props.p.disabled}
    title={
      (props.p as any).titleType === 'string'
          ? "Switch Title"
          : <div className='flex'>
              <Typography text='Switch Title' />
              <div className="padding-left--half"></div>
              <a href="/">Know More</a>
          </div>
  }
  subtitle={
      (props.p as any).withSubtitle
          ? (props.p as any).subtitleType === 'string'
              ? "Switching this switch results in a change that no one expects"
              : <div className='flex'>
                  <Typography type='caption-large' text='This action is not allowed' />
                  <div className="padding-left--half"></div>
                  <a href="/">Know More</a>
              </div>
          : null
  }
  />
}