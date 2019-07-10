import { Sequelize } from 'sequelize';

import Config, { I_config_component } from '../config/config';
import { initUserModel, associateUser } from './user';
import { initPostModel, associatePost } from './post';
import { initImageModel, associateImage } from './image';
import { initTagModel, associateTag } from './tag';
import { initProfileModel, associateProfile } from './profile';
import { initGroupModel, associateGroup } from './group';

const env = 'development';

const config = Config[env] as I_config_component;

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

initUserModel();
initPostModel();
initImageModel();
initTagModel();
initGroupModel();
// const initProfile = initProfileModel();

export const User = associateUser();
export const Post = associatePost();
export const Image = associateImage();
export const Tag = associateTag();
export const Group = associateGroup();
// associateProfile(initProfile);

export default sequelize;
