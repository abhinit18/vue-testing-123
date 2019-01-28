import apiUrls from '../../config/apiUrls'
import caller from '../../config/caller'
import store from '~/store';

export const lrsPost = (authToken, statement, contentType, platform) => {
  return caller.post(apiUrls.postLMS, authToken, contentType, statement, platform);
}
