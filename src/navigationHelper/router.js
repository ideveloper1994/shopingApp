import {
    createRouter,
} from '@expo/ex-navigation';

import login from '../screen/signIn/login';

import welcome from '../screen/welcome';

import agentFormPersonal from '../screen/registration/agentPersonalDetail';
import agentLocation from '../screen/registration/agentLocation';
import agentDocuments from '../screen/registration/agentDocuments';
import agentBankDetail from '../screen/registration/agentBankDetail';
import agentDetail from '../screen/agencyDetail/agentDetail';
import agentFullProfile from '../screen/agencyDetail/agentFullProfile';

export default createRouter(() => ({
    login: () => login,
    welcome: () => welcome,
    agentFormPersonal: () => agentFormPersonal,
    agentLocation: () => agentLocation,
    agentDocuments: () => agentDocuments,
    agentBankDetail: () => agentBankDetail,
    agentDetail: () => agentDetail,
    agentFullProfile: () => agentFullProfile,
}),{ignoreSerializableWarnings: true});
