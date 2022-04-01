import React, { useState } from 'react';

import {Button, Group, IconButton, Input, PanelHeaderClose, Separator, useAdaptivity} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import "@vkontakte/vkui/dist/vkui.css";

import {useDispatch, useSelector, useStore} from 'react-redux';
import {getToken, setToken} from './store/slices/VkToken';

import {
  Panel,
  View,
  PanelHeader,
  Root,
  AppRoot,
} from '@vkontakte/vkui';
import {Icon20ArrowLeftOutline} from '@vkontakte/icons'
import { SelectPanel } from './panels/SelectPanel';
import { setActivePanel, getActivePanel } from './store/slices/activePanel';
import { InfoPanel } from './panels/InfoPanel';
import { StoreType } from './store';
import { setFriends } from './store/slices/friends';

function App() {
  const dispatch = useDispatch();
  const activePanel = useSelector(getActivePanel);
  const token = useSelector(getToken);
  const store = useStore();
  if (token.length == 0) {
    bridge.subscribe((e) => {
      console.log(e);
      if (e.detail.type == "VKWebAppAccessTokenReceived") {
        dispatch(setToken(e.detail.data.access_token));
      }
      if (e.detail.type == "VKWebAppCallAPIMethodResult") {
        console.log(e.detail.data.response.items)
        //e.detail.data.response[0].id
        if (e.detail.data.response.count == undefined && e.detail.data.response.length == 1) {
          console.log(e.detail.data.response[0].id);
          bridge.send("VKWebAppCallAPIMethod",
          {
            "method": "friends.get",
            "request_id": "8122372", 
            "params": {
              "v": "5.131", 
              "access_token": (store.getState() as StoreType).tokenReducer.token,
              "user_id": e.detail.data.response[0].id,
            }
          });
        }
        else if (e.detail.data.response.items != undefined) {
          bridge.send(
            "VKWebAppCallAPIMethod",
            {
              "method": "users.get",
              "request_id": "8122372", 
              "params": {
                "user_ids": e.detail.data.response.items, 
                "v": "5.131",
                "access_token": (store.getState() as StoreType).tokenReducer.token,
                "fields": "city,bdate,photo_100"
              }
            }
          )
        }
        else {
          dispatch(setFriends(
            {
              "friends": e.detail.data.response.map((e: any) => {
                console.log(e);
                return {
                  bdate: e.bdate!,
                  photo: e.photo_100!,
                  city: (e.city! || {title: "Нет города"}).title!,
                  name: e.first_name,
                  surname: e.last_name,
                }
              })
            }
          ))
        }
      }
    }) 
    bridge.send("VKWebAppGetAuthToken", {"app_id": 8122372, "scope": "friends,status"});
  }

  return <AppRoot>
    <Root activeView='baseView'>
      <View activePanel={activePanel} id='baseView'>
        <Panel id='selectPanel'>
          <PanelHeader>Введите данные</PanelHeader>
          <SelectPanel />
        </Panel>
        <Panel id='viewPanel'>
          <PanelHeader 
            left={<IconButton 
              onClick={() => {dispatch(setActivePanel("selectPanel"))}}
            >
              <Icon20ArrowLeftOutline width={24} height={24}></Icon20ArrowLeftOutline>
            </IconButton>}
          >
            Друзья:
          </PanelHeader>
          <InfoPanel />
        </Panel>
      </View>
    </Root>
  </AppRoot>
}
export default App;
