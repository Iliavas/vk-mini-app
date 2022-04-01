import bridge from '@vkontakte/vk-bridge';
import { StoreType } from '.';

export const middleware = (store:any) => (next:any) => (action:any) => {
  
  if (action.type == 'username/setUsername') {
    bridge.send(
      "VKWebAppCallAPIMethod", 
      {
        "method": "users.get", 
        "request_id": "8122372", 
        "params": {
          "user_ids": action.payload, 
          "v": "5.131", 
          "access_token": (store.getState() as StoreType).tokenReducer.token
        }
      }
    )
  }

  next(action);
}