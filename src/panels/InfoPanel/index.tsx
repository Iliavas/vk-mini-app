import { Avatar, Group, List, RichCell } from '@vkontakte/vkui';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFriends } from '../../store/slices/friends';

export const InfoPanel: React.FC = () => {
  const friends = useSelector(getFriends);
  
  console.log(friends);

  return <Group style={{paddingRight: 16, paddingLeft: 16}}>
    <List>
      {
        friends.length == 0 ? <Group>Похоже ваш пользователь имеет закрытый профиль</Group>: ""
      }
      {
        friends.map((e) => {
          var city = e.city;
          if (city == undefined) city = "Нет города"
          var bdate = e.bdate;
          if (bdate == undefined) bdate = "Дата рождения не поставлена"
          return <RichCell
          disabled
          multiline
          before={<Avatar size={72} src={e.photo}></Avatar>}
          text={city}
          caption={bdate}
        >
          {e.name + " " + e.surname}
        </RichCell>
        })
      }
    </List>
  </Group>
}