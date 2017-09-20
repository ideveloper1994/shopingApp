import {
  createRouter,
} from '@expo/ex-navigation';

import login from '../screen/signIn/login';
import OTP from '../screen/signIn/otp';

import welcome from '../screen/welcome';

import agentFormPersonal from '../screen/registration/agentPersonalDetail';
import agentLocation from '../screen/registration/agentLocation';
import agentDocuments from '../screen/registration/agentDocuments';
import agentBankDetail from '../screen/registration/agentBankDetail';
import agentDetail from '../screen/agencyDetail/agentDetail';
import agentFullProfile from '../screen/agencyDetail/agentFullProfile';
import changePassword from '../screen/settings/changePassword';
import forgotPassword from '../screen/signIn/forgotPassword';
import settings from '../screen/settings/settings';

export default createRouter(() => ({
  login: () => login,
  OTP: () => OTP,
  welcome: () => welcome,
  agentFormPersonal: () => agentFormPersonal,
  agentLocation: () => agentLocation,
  agentDocuments: () => agentDocuments,
  agentBankDetail: () => agentBankDetail,
  agentDetail: () => agentDetail,
  agentFullProfile: () => agentFullProfile,
  changePassword: () => changePassword,
  forgotPassword: () => forgotPassword,
  settings: () => settings
}),{ignoreSerializableWarnings: true});
