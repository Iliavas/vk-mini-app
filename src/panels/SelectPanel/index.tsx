import { Button, Group, Input, PanelHeader } from '@vkontakte/vkui';
import React from 'react';
import "@vkontakte/vkui/dist/vkui.css";
import { useDispatch } from 'react-redux';
import { setActivePanel } from '../../store/slices/activePanel';
import { setUsername } from '../../store/slices/username';

export const SelectPanel: React.FC = (props) => {
  const [link, setLink] = React.useState("");
  const dispatch = useDispatch();

  return <Group style={{paddingLeft: 16, paddingRight: 16}}>
      <Input 
        placeholder='ссылка' 
        onChange={(e) => {setLink(e.target.value)}}
      />
      <Button 
        style={{width: '100%', marginTop: '4px'}}
        onClick={() => {
          dispatch(setUsername(link.split("/").reverse()[0]));
          dispatch(setActivePanel("viewPanel"));
        }}
      >Найти</Button>
    </Group>
}