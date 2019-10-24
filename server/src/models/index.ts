import { Sequelize } from 'sequelize';

import Config, { I_config_component } from '../config/config';
import { initUserModel, associateUser } from './user';
import { initPostModel, associatePost } from './post';
import { initImageModel, associateImage } from './image';
import { initTagModel, associateTag } from './tag';
import { initGroupModel, associateGroup } from './group';
import { initFollowModel, associateFollow } from './follow';
import { initLikeModel, associateLike } from './like';
import { initReplyModel, associateReply } from './reply';
import { initProfileModel, associateProfile } from './profile';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config = Config[env] as I_config_component;

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

initUserModel();
initPostModel();
initImageModel();
initTagModel();
initGroupModel();
initFollowModel();
initLikeModel();
initReplyModel();
initProfileModel();

export const User = associateUser();
export const Post = associatePost();
export const Image = associateImage();
export const Tag = associateTag();
export const Group = associateGroup();
export const Follow = associateFollow();
export const Like = associateLike();
export const Reply = associateReply();
export const Profile = associateProfile();

export default sequelize;
